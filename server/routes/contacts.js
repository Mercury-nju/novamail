const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure multer for CSV uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'), false);
    }
  }
});

// @route   GET /api/contacts
// @desc    Get user's contacts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      status,
      tags,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filters = {
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      status,
      tags: tags ? tags.split(',') : undefined,
      search
    };

    const contacts = await Contact.getUserContacts(req.userId, filters);
    const totalContacts = await Contact.countDocuments({ userId: req.userId });

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalContacts / parseInt(limit)),
          totalContacts,
          hasNext: parseInt(page) * parseInt(limit) < totalContacts,
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
});

// @route   GET /api/contacts/stats
// @desc    Get contact statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const stats = await Contact.getContactStats(req.userId);
    const totalContacts = await Contact.countDocuments({ userId: req.userId });

    // Format stats
    const formattedStats = {
      total: totalContacts,
      active: 0,
      unsubscribed: 0,
      bounced: 0,
      complained: 0
    };

    stats.forEach(stat => {
      formattedStats[stat._id] = stat.count;
    });

    res.json({
      success: true,
      data: formattedStats
    });
  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact statistics'
    });
  }
});

// @route   POST /api/contacts
// @desc    Create a new contact
// @access  Private
router.post('/', [
  auth,
  body('name').trim().notEmpty().withMessage('Contact name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('customFields').optional().isObject().withMessage('Custom fields must be an object')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, tags = [], customFields = {} } = req.body;

    // Check if contact already exists
    const existingContact = await Contact.findByUserAndEmail(req.userId, email);
    if (existingContact) {
      return res.status(400).json({
        success: false,
        message: 'Contact already exists with this email'
      });
    }

    // Create new contact
    const contact = new Contact({
      userId: req.userId,
      name,
      email,
      tags,
      customFields,
      source: 'manual'
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      data: { contact }
    });
  } catch (error) {
    console.error('Create contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create contact'
    });
  }
});

// @route   POST /api/contacts/import
// @desc    Import contacts from CSV
// @access  Private
router.post('/import', auth, upload.single('csvFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'CSV file is required'
      });
    }

    const contacts = [];
    const errors = [];
    const buffer = req.file.buffer.toString('utf8');

    // Parse CSV
    await new Promise((resolve, reject) => {
      const stream = require('stream').Readable.from([buffer]);
      stream
        .pipe(csv())
        .on('data', (row) => {
          // Validate required fields
          if (!row.email || !row.name) {
            errors.push({
              row: row,
              error: 'Missing required fields (name, email)'
            });
            return;
          }

          // Validate email format
          const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
          if (!emailRegex.test(row.email)) {
            errors.push({
              row: row,
              error: 'Invalid email format'
            });
            return;
          }

          contacts.push({
            name: row.name.trim(),
            email: row.email.toLowerCase().trim(),
            tags: row.tags ? row.tags.split(',').map(tag => tag.trim()) : [],
            customFields: Object.keys(row)
              .filter(key => !['name', 'email', 'tags'].includes(key))
              .reduce((obj, key) => {
                obj[key] = row[key];
                return obj;
              }, {})
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    if (contacts.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid contacts found in CSV file',
        errors
      });
    }

    // Check for existing contacts
    const existingEmails = await Contact.find({
      userId: req.userId,
      email: { $in: contacts.map(c => c.email) }
    }).select('email');

    const existingEmailSet = new Set(existingEmails.map(c => c.email));
    const newContacts = contacts.filter(c => !existingEmailSet.has(c.email));
    const duplicateContacts = contacts.filter(c => existingEmailSet.has(c.email));

    // Create new contacts
    const createdContacts = [];
    for (const contactData of newContacts) {
      try {
        const contact = new Contact({
          userId: req.userId,
          ...contactData,
          source: 'csv_import'
        });
        await contact.save();
        createdContacts.push(contact);
      } catch (error) {
        errors.push({
          contact: contactData,
          error: error.message
        });
      }
    }

    res.json({
      success: true,
      message: 'CSV import completed',
      data: {
        totalProcessed: contacts.length,
        created: createdContacts.length,
        duplicates: duplicateContacts.length,
        errors: errors.length,
        contacts: createdContacts,
        duplicateEmails: duplicateContacts.map(c => c.email),
        importErrors: errors
      }
    });
  } catch (error) {
    console.error('CSV import error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to import contacts from CSV'
    });
  }
});

// @route   GET /api/contacts/:id
// @desc    Get a specific contact
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: { contact }
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact'
    });
  }
});

// @route   PUT /api/contacts/:id
// @desc    Update a contact
// @access  Private
router.put('/:id', [
  auth,
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('customFields').optional().isObject().withMessage('Custom fields must be an object')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, tags, customFields } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (tags) updateData.tags = tags;
    if (customFields) updateData.customFields = customFields;

    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: { contact }
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact'
    });
  }
});

// @route   DELETE /api/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact'
    });
  }
});

// @route   DELETE /api/contacts
// @desc    Delete multiple contacts
// @access  Private
router.delete('/', [
  auth,
  body('contactIds').isArray().withMessage('Contact IDs must be an array'),
  body('contactIds.*').isMongoId().withMessage('Invalid contact ID format')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { contactIds } = req.body;

    const result = await Contact.deleteMany({
      _id: { $in: contactIds },
      userId: req.userId
    });

    res.json({
      success: true,
      message: `${result.deletedCount} contacts deleted successfully`,
      data: { deletedCount: result.deletedCount }
    });
  } catch (error) {
    console.error('Delete contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contacts'
    });
  }
});

// @route   POST /api/contacts/:id/tags
// @desc    Add tag to contact
// @access  Private
router.post('/:id/tags', [
  auth,
  body('tag').trim().notEmpty().withMessage('Tag is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { tag } = req.body;

    const contact = await Contact.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    await contact.addTag(tag);

    res.json({
      success: true,
      message: 'Tag added successfully',
      data: { contact }
    });
  } catch (error) {
    console.error('Add tag error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add tag'
    });
  }
});

// @route   DELETE /api/contacts/:id/tags/:tag
// @desc    Remove tag from contact
// @access  Private
router.delete('/:id/tags/:tag', auth, async (req, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    await contact.removeTag(req.params.tag);

    res.json({
      success: true,
      message: 'Tag removed successfully',
      data: { contact }
    });
  } catch (error) {
    console.error('Remove tag error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove tag'
    });
  }
});

module.exports = router;
