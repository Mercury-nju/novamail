# NovaMail - AI Email Marketing Platform

NovaMail is a modern, AI-powered email marketing platform designed for small businesses, content creators, and entrepreneurs. It simplifies the process of creating, sending, and tracking email campaigns with the help of artificial intelligence.

## 🚀 Features

### Core Features
- **AI-Powered Content Generation**: Generate compelling email content using OpenAI
- **Contact Management**: Upload CSV files, manually add contacts, and organize with tags
- **Campaign Creation**: Create and manage email campaigns with multiple templates
- **Email Sending**: Send emails to your contact lists with delivery tracking
- **Analytics Dashboard**: Track open rates, click rates, and engagement metrics
- **User Authentication**: Secure login/registration with JWT tokens

### Technical Features
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Live campaign status and analytics
- **CSV Import**: Bulk contact import with validation and deduplication
- **Email Templates**: Multiple AI-generated email styles (formal, casual, promotional)

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Heroicons** - Beautiful SVG icons
- **Recharts** - Data visualization
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **OpenAI API** - AI content generation
- **Multer** - File upload handling
- **CSV Parser** - CSV file processing

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- OpenAI API key

### 1. Clone the repository
```bash
git clone <repository-url>
cd novasend
```

### 2. Install dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Environment Setup
```bash
# Copy environment example
cp server/env.example server/.env

# Edit server/.env with your configuration
```

Required environment variables:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/novasend

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# OpenAI
OPENAI_API_KEY=your-openai-api-key-here

# Email Service (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Server
PORT=3001
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:3000
```

### 4. Start the application
```bash
# Start both frontend and backend
npm run dev:full

# Or start them separately:
# Frontend (port 3000)
npm run dev

# Backend (port 3001)
npm run server
```

## 🎯 Usage

### 1. Registration & Login
- Visit `http://localhost:3000`
- Create an account or sign in
- Complete your profile setup

### 2. Contact Management
- Go to **Contacts** in the dashboard
- **Add contacts manually** or **import CSV files**
- Organize contacts with tags and custom fields
- View contact statistics and status

### 3. Create Campaigns
- Navigate to **Campaigns** → **Create Campaign**
- **Step 1**: Enter campaign details and goals
- **Step 2**: Let AI generate email content options
- **Step 3**: Review, customize, and send

### 4. AI Content Generation
- Describe your email goal (e.g., "Black Friday sale announcement")
- Choose email style (formal, casual, promotional)
- AI generates multiple content options
- Select and customize your preferred option

### 5. Analytics & Tracking
- View campaign performance in **Analytics**
- Track open rates, click rates, and engagement
- Monitor trends over time
- Analyze top-performing content

## 📁 Project Structure

```
novasend/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Authentication pages
│   ├── register/         # Registration pages
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── server/               # Backend API
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── database.js      # Database connection
│   └── server.js        # Main server file
├── package.json         # Frontend dependencies
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/change-password` - Change password

### Contacts
- `GET /api/contacts` - Get user contacts
- `POST /api/contacts` - Create contact
- `POST /api/contacts/import` - Import CSV
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

### Campaigns
- `GET /api/campaigns` - Get user campaigns
- `POST /api/campaigns` - Create campaign
- `POST /api/campaigns/:id/send` - Send campaign
- `GET /api/campaigns/:id` - Get campaign details

### AI
- `POST /api/ai/generate-email` - Generate email content
- `POST /api/ai/improve-email` - Improve existing content
- `POST /api/ai/suggest-subject` - Generate subject lines

### Analytics
- `GET /api/analytics/overview` - Get overview stats
- `GET /api/analytics/campaigns` - Campaign performance
- `GET /api/analytics/trends` - Performance trends

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `app/globals.css` for global styles
- Customize component styles in individual files

### AI Prompts
- Edit prompts in `server/routes/ai.js`
- Adjust OpenAI model parameters
- Add custom email templates

### Database Models
- Extend models in `server/models/`
- Add new fields and validation
- Create additional indexes

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Backend (Railway/Heroku)
```bash
# Set environment variables
# Deploy using your preferred platform
```

### Database (MongoDB Atlas)
1. Create MongoDB Atlas cluster
2. Update `MONGODB_URI` in environment variables
3. Configure IP whitelist and database user

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints

## 🔮 Future Enhancements

- **Automation Workflows**: Set up automated email sequences
- **Advanced Segmentation**: AI-powered audience targeting
- **A/B Testing**: Test different email variations
- **Integration APIs**: Connect with Shopify, WordPress, etc.
- **Advanced Analytics**: Heatmaps, conversion tracking
- **Multi-language Support**: Internationalization
- **Mobile App**: React Native mobile application

---

Built with ❤️ for small businesses and creators who want to grow their email marketing without the complexity.
