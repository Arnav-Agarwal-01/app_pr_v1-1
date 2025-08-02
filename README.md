# College Event Management System

> A comprehensive React Native mobile application with Express.js backend for managing college events, club activities, and communications at KMIT (Keshav Memorial Institute of Technology).

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Development](#development)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [User Roles & Permissions](#user-roles--permissions)
- [Development Status](#development-status)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## 🎯 Overview

The College Event Management System is a full-stack mobile application designed to streamline event management, club activities, and communication within KMIT. The system provides different interfaces for students, club heads, and administrative staff, enabling efficient event organization and participation.

### Key Objectives
- **Centralized Event Management**: Single platform for all college events
- **Enhanced Communication**: Real-time notifications and updates
- **Club Activity Coordination**: Tools for club heads to manage activities
- **Student Engagement**: Easy event discovery and participation
- **Administrative Control**: Comprehensive oversight for college administration

## ✨ Features

### For Students
- 📅 **Event Calendar**: View upcoming events with detailed information
- 🔔 **Push Notifications**: Real-time updates about events and announcements
- 👥 **Club Membership**: Join clubs and participate in activities
- 📱 **Mobile-First Design**: Optimized for smartphone usage
- 🔍 **Event Search & Filter**: Find events by category, date, or club

### For Club Heads
- 📝 **Event Creation**: Create and manage club events
- 👨‍👩‍👧‍👦 **Member Management**: Manage club membership and roles
- 📊 **Analytics Dashboard**: Track event attendance and engagement
- 📢 **Announcements**: Send targeted messages to club members

### For Administration (PR/OC)
- 🏛️ **System Administration**: Full access to all events and clubs
- 📈 **Reporting**: Generate reports on event participation and club activities
- 🛡️ **Content Moderation**: Review and approve events and announcements
- ⚙️ **System Configuration**: Manage app settings and user permissions

## 🛠 Technology Stack

### Frontend (Mobile App)
| Technology | Purpose | Version |
|------------|---------|---------|
| **React Native** | Mobile app framework | 0.79.5 |
| **Expo SDK** | Development platform | ~53.0.20 |
| **React Navigation** | Navigation system | ^6.1.9 |
| **Axios** | HTTP client for API calls | ^1.6.0 |
| **AsyncStorage** | Local data persistence | ^1.23.1 |
| **React Native Calendars** | Calendar interface | ^1.1302.0 |
| **Expo Notifications** | Push notifications | ~0.30.1 |

### Backend (API Server)
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | JavaScript runtime | >=16.0.0 |
| **Express.js** | Web framework | ^4.18.2 |
| **MongoDB** | NoSQL database | Latest |
| **Mongoose** | MongoDB ODM | ^7.6.3 |
| **JWT** | Authentication tokens | ^9.0.2 |
| **bcrypt** | Password hashing | ^5.1.1 |
| **Helmet** | Security middleware | ^7.1.0 |
| **CORS** | Cross-origin requests | ^2.8.5 |

### Development Tools
| Tool | Purpose |
|------|---------|
| **Concurrently** | Run multiple commands |
| **Nodemon** | Auto-restart server |
| **Expo CLI** | React Native development |
| **Jest** | Testing framework |

## 📁 Project Structure

```
college-event-management/
├── 📁 backend/                    # Express.js API Server
│   ├── 📁 config/                # Configuration files
│   │   └── 📄 database.js        # MongoDB connection setup
│   ├── 📁 models/                # Mongoose data models (future)
│   ├── 📁 routes/                # API route handlers (future)
│   ├── 📁 middleware/            # Custom middleware (future)
│   ├── 📁 controllers/           # Business logic (future)
│   ├── 📁 utils/                 # Utility functions (future)
│   ├── 📄 .env                   # Environment variables (local)
│   ├── 📄 .env.example           # Environment template
│   ├── 📄 package.json           # Backend dependencies
│   └── 📄 server.js              # Main server file
├── 📁 frontend/                   # React Native Mobile App
│   ├── 📁 assets/                # Images, icons, fonts
│   ├── 📁 config/                # App configuration
│   │   └── 📄 environment.js     # Environment management
│   ├── 📁 components/            # Reusable UI components (future)
│   ├── 📁 screens/               # App screens (future)
│   ├── 📁 navigation/            # Navigation setup (future)
│   ├── 📁 services/              # API service layer (future)
│   ├── 📁 utils/                 # Utility functions (future)
│   ├── 📄 App.js                 # Main app component
│   ├── 📄 app.json               # Expo configuration
│   └── 📄 package.json           # Frontend dependencies
├── 📁 .kiro/                     # Kiro IDE specifications
│   └── 📁 specs/                 # Development specifications
├── 📄 package.json               # Root project configuration
├── 📄 test-setup.js              # Setup verification script
└── 📄 README.md                  # Project documentation
```

## 📋 Prerequisites

Before setting up the project, ensure you have the following installed:

### Required Software
- **Node.js** (v16.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v8.0.0 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

### Mobile Development
- **Expo CLI** - Install globally: `npm install -g @expo/cli`
- **Expo Go App** - Install on your mobile device for testing

### Database Options
Choose one of the following:

#### Option 1: Local MongoDB (Development)
- **MongoDB Community Server** - [Download](https://www.mongodb.com/try/download/community)
- **MongoDB Compass** (Optional GUI) - [Download](https://www.mongodb.com/products/compass)

#### Option 2: MongoDB Atlas (Cloud)
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Set up a cluster and get connection string

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/kmit/college-event-management.git
cd college-event-management
```

### 2. Install Dependencies
```bash
# Install root dependencies and all sub-project dependencies
npm run setup

# Or install manually:
npm install
npm run install:all
```

### 3. Database Setup

#### For Local MongoDB:
```bash
# Start MongoDB service (macOS with Homebrew)
brew services start mongodb/brew/mongodb-community

# Or start manually
mongod --config /usr/local/etc/mongod.conf
```

#### For MongoDB Atlas:
1. Create a cluster in MongoDB Atlas
2. Get your connection string
3. Whitelist your IP address
4. Create a database user

### 4. Environment Configuration
```bash
# Copy environment template
cp backend/.env.example backend/.env

# Edit the .env file with your configuration
nano backend/.env
```

**Required Environment Variables:**
```env
# Database (choose one)
MONGODB_URI=mongodb://localhost:27017/college-events-dev  # Local
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/college-events  # Atlas

# Security
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters

# Server
PORT=4001
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:19006
```

### 5. Verify Setup
```bash
# Run setup verification
npm run verify

# Expected output:
# ✅ Backend package.json found
# ✅ Backend dependencies installed
# ✅ Frontend package.json found
# ✅ Frontend dependencies installed
# ✅ Backend environment configuration found
# ✅ Frontend environment configuration found
# ✅ Database configuration found
```

## 💻 Development

### Start Development Servers

#### Both Frontend and Backend:
```bash
npm run dev
```
This starts:
- Backend API server at `http://localhost:4001`
- Frontend Expo server at `http://localhost:19006`

#### Individual Services:
```bash
# Backend only (API server)
npm run backend:dev

# Frontend only (React Native app)
npm run frontend:dev
```

### Development Workflow

1. **Backend Development**: 
   - Server runs with nodemon for auto-restart
   - API available at `http://localhost:4001`
   - Health check: `http://localhost:4001/health`

2. **Frontend Development**:
   - Expo development server starts
   - Scan QR code with Expo Go app
   - Or run in iOS/Android simulator

3. **Testing Changes**:
   - Backend changes auto-restart server
   - Frontend changes hot-reload in app
   - Check console for errors

## ⚙️ Configuration

### Backend Configuration (.env)

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/college-events-dev
DB_NAME=college-events-dev

# JWT Configuration
JWT_SECRET=dev-jwt-secret-key-change-in-production-2024
JWT_EXPIRES_IN=45d

# Server Configuration
PORT=4001
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:19006

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100  # 100 requests per window
```

### Frontend Configuration (config/environment.js)

The frontend automatically detects the environment and uses appropriate settings:

- **Development**: `http://localhost:4001/api`
- **Staging**: `https://staging-api.college-events.com/api`
- **Production**: `https://api.college-events.com/api`

## 📚 API Documentation

### Base URL
- **Development**: `http://localhost:4001`
- **Production**: `https://api.college-events.com`

### Current Endpoints

#### Health & Status
```http
GET /health
```
Returns server health status and environment information.

```http
GET /api
```
Returns API information and version.

```http
GET /
```
Returns basic server information.

### Future Endpoints (Implementation Planned)

#### Authentication
```http
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
POST /api/auth/logout      # User logout
GET  /api/auth/profile     # Get user profile
PUT  /api/auth/profile     # Update user profile
```

#### Events
```http
GET    /api/events         # Get all events
POST   /api/events         # Create new event
GET    /api/events/:id     # Get specific event
PUT    /api/events/:id     # Update event
DELETE /api/events/:id     # Delete event
```

#### Clubs
```http
GET    /api/clubs          # Get all clubs
POST   /api/clubs          # Create new club
GET    /api/clubs/:id      # Get specific club
PUT    /api/clubs/:id      # Update club
DELETE /api/clubs/:id      # Delete club
```

#### Users
```http
GET    /api/users          # Get all users (admin only)
GET    /api/users/:id      # Get specific user
PUT    /api/users/:id      # Update user
DELETE /api/users/:id      # Delete user
```

## 👥 User Roles & Permissions

### 1. Students
**Permissions:**
- View all public events
- Join/leave clubs
- RSVP to events
- Receive notifications
- View club activities

**Restrictions:**
- Cannot create events
- Cannot manage clubs
- Cannot access admin features

### 2. Club Heads
**Permissions:**
- All student permissions
- Create/edit club events
- Manage club membership
- Send club announcements
- View club analytics

**Restrictions:**
- Cannot manage other clubs
- Cannot access system administration

### 3. Council Members (PR/OC)
**Permissions:**
- All club head permissions
- Manage all events and clubs
- Access system administration
- Generate reports
- Moderate content

**Restrictions:**
- Limited by specific council role

### 4. System Administrators
**Permissions:**
- Full system access
- User management
- System configuration
- Database management
- Security settings

## 📊 Development Status

### ✅ Completed Tasks

#### Task 1: Project Foundation ✅
- [x] React Native Expo project initialized with JavaScript
- [x] Express.js backend configured with security middleware
- [x] MongoDB connection setup with Mongoose
- [x] Development environment configured
- [x] Basic project structure established
- [x] Environment configuration system
- [x] Development scripts and tools
- [x] Comprehensive documentation

### 🔄 Current Phase: Database Models & Authentication

#### Task 2: Database Models (Next)
- [ ] User model with role-based permissions
- [ ] Event model with club associations
- [ ] Club model with member management
- [ ] Notification model for real-time updates

#### Task 3: Authentication System (Planned)
- [ ] JWT-based authentication
- [ ] User registration and login
- [ ] Role-based access control
- [ ] Password reset functionality

#### Task 4: Frontend Authentication (Planned)
- [ ] Login/register screens
- [ ] Authentication context
- [ ] Protected route navigation
- [ ] User profile management

### 🎯 Future Milestones

- **Phase 2**: Event Management System
- **Phase 3**: Club Management Features
- **Phase 4**: Real-time Notifications
- **Phase 5**: Advanced Features & Analytics
- **Phase 6**: Testing & Deployment

## 🤝 Contributing

This project follows the **Kiro spec-driven development workflow**. All development is guided by detailed specifications in `.kiro/specs/college-event-management/`.

### Development Process
1. **Requirements**: Detailed in `requirements.md`
2. **Design**: System architecture in `design.md`
3. **Tasks**: Implementation plan in `tasks.md`

### Getting Started with Development
1. Review the specifications in `.kiro/specs/`
2. Check current task status in `tasks.md`
3. Follow the implementation guidelines
4. Test thoroughly before submitting

### Code Standards
- **JavaScript**: ES6+ features, async/await
- **React Native**: Functional components with hooks
- **Node.js**: Express.js best practices
- **Database**: Mongoose schemas with validation
- **Security**: JWT authentication, input validation

## 🔧 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Failed
```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Start MongoDB service
brew services start mongodb/brew/mongodb-community

# Check connection string in .env file
```

#### 2. Port Already in Use
```bash
# Find process using port 4001
lsof -i :4001

# Kill the process
kill -9 <PID>

# Or change port in backend/.env
PORT=4002
```

#### 3. Expo App Not Loading
```bash
# Clear Expo cache
expo start -c

# Reset Metro bundler
npx react-native start --reset-cache

# Check network connection and firewall
```

#### 4. Dependencies Issues
```bash
# Clean install all dependencies
npm run clean:install

# Or manually:
rm -rf node_modules backend/node_modules frontend/node_modules
npm run setup
```

#### 5. Environment Variables Not Loading
```bash
# Verify .env file exists and has correct format
cat backend/.env

# Check for syntax errors (no spaces around =)
# Restart server after changes
```

### Getting Help

1. **Check the logs**: Look at console output for error messages
2. **Verify setup**: Run `npm run verify` to check configuration
3. **Review documentation**: Check this README and code comments
4. **Check specifications**: Review `.kiro/specs/` for requirements

### Useful Commands

```bash
# Verify project setup
npm run verify

# Clean and reinstall everything
npm run clean:install

# Check backend health
curl http://localhost:4001/health

# View backend logs
npm run backend:dev

# Reset Expo cache
cd frontend && expo start -c
```

## 📄 License

MIT License

Copyright (c) 2024 KMIT Development Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

**KMIT Development Team** | [Website](https://kmit.edu) | [Email](mailto:dev@kmit.edu)