# Poligono Auth Server

A modular Express.js server for Google OAuth authentication with JWT session management.

## 🏗️ Project Structure

```
server/
│── node_modules/
│── src/
│   ├── config/          # Configuration files
│   │   └── index.js     # Environment variables, CORS, JWT config
│   │
│   ├── middlewares/     # Middleware functions
│   │   └── auth.js      # Authentication middleware
│   │
│   ├── routes/          # Route definitions
│   │   ├── authRoutes.js    # Authentication routes
│   │   └── userRoutes.js    # User management routes
│   │
│   ├── controllers/     # Business logic 
│   │   ├── authController.js # Auth operations
│   │   └── userController.js # User operations
│   │
│   ├── services/        # External API calls
│   │   └── googleAuthService.js # Google OAuth service
│   │
│   ├── utils/           # Utility functions
│   │   └── token.js     # JWT token utilities
│   │
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
│
│── .env                 # Environment variables
│── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google OAuth credentials

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Server Configuration
   SERVER_PORT=8080
   CLIENT_URL=http://localhost:3000
   NODE_ENV=development
   JWT_SECRET=your-jwt-secret-key
   
   # Google OAuth Configuration
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NEXT_PUBLIC_SERVER_URL=http://localhost:8080
   ```

3. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Health check | No |
| GET | `/login` | Initiate Google OAuth | No |
| GET | `/callback` | Google OAuth callback | No |
| GET | `/me` | Get current user | Yes |
| POST | `/logout` | Logout user | No |

### User Routes (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/profile` | Get user profile | Yes |

## 🔧 Configuration

### Environment Variables

- `SERVER_PORT`: Server port (default: 8080)
- `CLIENT_URL`: Frontend URL for CORS
- `NODE_ENV`: Environment (development/production)
- `JWT_SECRET`: Secret key for JWT tokens
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `NEXT_PUBLIC_SERVER_URL`: Server URL for OAuth redirect

## 🔐 Authentication Flow

1. **Login Initiation**: Client calls `/api/auth/login`
2. **Google OAuth**: User redirected to Google for authentication
3. **Callback**: Google redirects to `/api/auth/callback` with auth code
4. **Token Exchange**: Server exchanges code for Google access token
5. **User Info**: Server fetches user info from Google
6. **JWT Creation**: Server creates JWT session token
7. **Cookie Set**: JWT stored in HTTP-only cookie
8. **Redirect**: User redirected to dashboard

## 🛡️ Security Features

- **HTTP-only cookies**: JWT tokens stored securely
- **CORS protection**: Configured for specific origins
- **JWT verification**: All protected routes verify tokens
- **Environment-based security**: Different settings for dev/prod

## 📝 Development

### Adding New Routes

1. Create controller in `src/controllers/`
2. Create route file in `src/routes/`
3. Import and use in `src/app.js`

### Adding New Middleware

1. Create middleware in `src/middlewares/`
2. Import and use in `src/app.js` or specific routes

### Adding New Services

1. Create service in `src/services/`
2. Import and use in controllers

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test
```

## 📦 Production Deployment

1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Configure proper CORS origins
4. Use HTTPS in production
5. Set secure cookie options

## 🤝 Contributing

1. Follow the modular structure
2. Add proper error handling
3. Include logging for debugging
4. Update documentation

## 📄 License

MIT License
