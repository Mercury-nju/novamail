const express = require('express');
const { body, validationResult } = require('express-validator');
const OpenAI = require('openai');
const auth = require('../middleware/auth');

const router = express.Router();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// @route   POST /api/ai/generate-email
// @desc    Generate email content using AI
// @access  Private
router.post('/generate-email', [
  auth,
  body('goal').trim().notEmpty().withMessage('Email goal is required'),
  body('style').optional().isIn(['formal', 'casual', 'promotional']).withMessage('Invalid style'),
  body('targetAudience').optional().trim(),
  body('companyName').optional().trim(),
  body('tone').optional().trim()
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

    const { goal, style = 'casual', targetAudience, companyName, tone } = req.body;

    // Build the prompt
    let prompt = `Generate an email campaign for the following goal: "${goal}"\n\n`;
    
    if (targetAudience) {
      prompt += `Target audience: ${targetAudience}\n`;
    }
    
    if (companyName) {
      prompt += `Company name: ${companyName}\n`;
    }
    
    prompt += `Style: ${style}\n`;
    
    if (tone) {
      prompt += `Tone: ${tone}\n`;
    }
    
    prompt += `\nPlease generate 3 different email options with the following structure:
1. Subject line (compelling and relevant)
2. Email body (well-structured with clear call-to-action)
3. Style description

Each option should be different in approach but all should be professional and engaging. Include appropriate emojis where suitable for the ${style} style.

Format the response as JSON with this structure:
{
  "options": [
    {
      "subject": "Subject line here",
      "body": "Email body here",
      "style": "style description",
      "approach": "brief description of the approach"
    }
  ]
}`;

    // Generate content using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert email marketing copywriter. Create compelling, engaging email content that drives action. Always include a clear call-to-action and maintain the specified tone and style."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.7
    });

    const response = completion.choices[0].message.content;
    
    // Parse the JSON response
    let generatedContent;
    try {
      generatedContent = JSON.parse(response);
    } catch (parseError) {
      // If JSON parsing fails, create a fallback response
      generatedContent = {
        options: [
          {
            subject: `🎯 ${goal} - Don't Miss Out!`,
            body: `Hi there!\n\nWe're excited to share something special with you regarding ${goal.toLowerCase()}.\n\n${goal} is now available, and we think you'll love it. Here's what makes it special:\n\n✨ Key benefits and features\n✨ Why it matters to you\n✨ How to get started\n\nReady to experience the difference? Click below to learn more.\n\nBest regards,\nThe Team\n\n---\nYou received this email because you're subscribed to our updates. Unsubscribe here.`,
            style: style,
            approach: "Direct and benefit-focused"
          },
          {
            subject: `Update: ${goal}`,
            body: `Hello,\n\nI hope this email finds you well. I wanted to reach out to share some important information about ${goal.toLowerCase()}.\n\nWe've been working hard to bring you something valuable, and I'm pleased to announce that ${goal} is now ready.\n\nHere's what you need to know:\n• What it is and why it matters\n• How it can benefit you\n• Next steps to get involved\n\nI believe this will be of great value to you. Please let me know if you have any questions.\n\nWarm regards,\nThe Team\n\n---\nYou can unsubscribe from these emails at any time.`,
            style: style,
            approach: "Professional and informative"
          },
          {
            subject: `Hey! Check out ${goal}`,
            body: `Hi!\n\nHope you're doing great! 👋\n\nI wanted to drop you a quick note about ${goal.toLowerCase()}. We just launched something pretty cool that I think you'd be interested in.\n\nHere's the deal:\n• It's awesome (obviously!)\n• It's designed with people like you in mind\n• It's easy to get started\n\nWant to check it out? Just click the link below.\n\nThanks for being awesome!\nThe Team\n\nP.S. If this isn't your thing, no worries at all. Just let us know and we'll stop sending these updates.\n\n---\nUnsubscribe | Update preferences`,
            style: style,
            approach: "Friendly and conversational"
          }
        ]
      };
    }

    res.json({
      success: true,
      message: 'Email content generated successfully',
      data: generatedContent
    });

  } catch (error) {
    console.error('AI generation error:', error);
    
    // Handle OpenAI API errors
    if (error.code === 'insufficient_quota') {
      return res.status(402).json({
        success: false,
        message: 'AI service quota exceeded. Please try again later.'
      });
    }
    
    if (error.code === 'invalid_api_key') {
      return res.status(500).json({
        success: false,
        message: 'AI service configuration error'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to generate email content. Please try again.'
    });
  }
});

// @route   POST /api/ai/improve-email
// @desc    Improve existing email content
// @access  Private
router.post('/improve-email', [
  auth,
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('body').trim().notEmpty().withMessage('Email body is required'),
  body('improvementType').optional().isIn(['clarity', 'engagement', 'conversion', 'length']).withMessage('Invalid improvement type')
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

    const { subject, body, improvementType = 'engagement' } = req.body;

    let improvementPrompt = `Please improve the following email for better ${improvementType}:\n\n`;
    improvementPrompt += `Subject: ${subject}\n\n`;
    improvementPrompt += `Body:\n${body}\n\n`;
    
    switch (improvementType) {
      case 'clarity':
        improvementPrompt += 'Focus on making the message clearer and easier to understand.';
        break;
      case 'engagement':
        improvementPrompt += 'Focus on making the email more engaging and interesting to read.';
        break;
      case 'conversion':
        improvementPrompt += 'Focus on improving the call-to-action and conversion potential.';
        break;
      case 'length':
        improvementPrompt += 'Focus on optimizing the length - make it more concise while keeping the key message.';
        break;
    }

    improvementPrompt += '\n\nProvide the improved version in the same format.';

    // Generate improved content
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert email marketing copywriter. Improve the given email content while maintaining its core message and purpose."
        },
        {
          role: "user",
          content: improvementPrompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    });

    const improvedContent = completion.choices[0].message.content;

    res.json({
      success: true,
      message: 'Email content improved successfully',
      data: {
        improvedContent,
        improvementType
      }
    });

  } catch (error) {
    console.error('AI improvement error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to improve email content. Please try again.'
    });
  }
});

// @route   POST /api/ai/suggest-subject
// @desc    Generate subject line suggestions
// @access  Private
router.post('/suggest-subject', [
  auth,
  body('emailBody').trim().notEmpty().withMessage('Email body is required'),
  body('style').optional().isIn(['formal', 'casual', 'promotional']).withMessage('Invalid style'),
  body('count').optional().isInt({ min: 1, max: 10 }).withMessage('Count must be between 1 and 10')
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

    const { emailBody, style = 'casual', count = 5 } = req.body;

    const prompt = `Generate ${count} compelling email subject lines for the following email content. Style: ${style}\n\nEmail content:\n${emailBody}\n\nProvide the subjects as a JSON array of strings.`;

    // Generate subject suggestions
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert email marketing copywriter. Create compelling, click-worthy subject lines that match the email content and style."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.8
    });

    const response = completion.choices[0].message.content;
    
    // Parse the JSON response
    let subjects;
    try {
      subjects = JSON.parse(response);
    } catch (parseError) {
      // Fallback subjects
      subjects = [
        "Don't miss out on this opportunity!",
        "Important update for you",
        "Something special just for you",
        "You'll want to see this",
        "Limited time offer"
      ];
    }

    res.json({
      success: true,
      message: 'Subject line suggestions generated successfully',
      data: {
        subjects: Array.isArray(subjects) ? subjects : [subjects],
        style
      }
    });

  } catch (error) {
    console.error('AI subject suggestion error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate subject suggestions. Please try again.'
    });
  }
});

module.exports = router;
