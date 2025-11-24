<div align="center">
	<h1>Samwaad</h1>
	<p><strong>Real‑time chat platform with OTP verified onboarding, one-to-one and group messaging, presence, typing indicators, and media sharing.</strong></p>
	<p>
		<a href="#getting-started">Getting Started</a> ·
		<a href="#features">Features</a> ·
		<a href="#project-structure">Structure</a> ·
		<a href="#api-overview">API</a> ·
		<a href="#contributing">Contributing</a>
	</p>
</div>

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Architecture](#architecture)
5. [Project Structure](#project-structure)
6. [Data Models](#data-models)
7. [API Overview](#api-overview)
8. [Realtime Events](#realtime-events)
9. [Authentication & Security](#authentication--security)
10. [Getting Started](#getting-started)
11. [Environment Variables](#environment-variables)
12. [Development Scripts](#development-scripts)
13. [Contribution Guide](#contributing)
14. [Roadmap](#roadmap)
15. [License](#license)

## Overview
Samwaad is a modern real‑time chat application built for extensibility. It supports secure OTP‑gated registration, cookie‑based JWT authentication with refresh token rotation, direct and group conversations, image/file sharing, online presence, and typing indicators. The frontend is a React 19 + Vite SPA; the backend is an Express + Socket.IO server backed by MongoDB via Mongoose.

## Features
- OTP‑verified user onboarding (email delivery via SMTP)
- Secure login with short‑lived access & long‑lived refresh tokens
- One‑to‑one chats and group chats with group images & admin role
- Live messaging with Socket.IO (room based per `chatId`)
- Image/file upload and inline media rendering
- Latest message preview and timestamp formatting (IST localization)
- Online presence broadcasting & typing indicators
- Automatic access token refresh on 401 via Axios interceptor
- Responsive layout (mobile friendly adaptive sidebar)

## Tech Stack
| Layer        | Technology |
|--------------|------------|
| Frontend     | React 19, React Router, Context API, Axios, Socket.IO Client, Tailwind CSS |
| Backend      | Node.js, Express 5, Socket.IO 4, Mongoose 8 |
| Auth / Crypto| JWT, bcrypt |
| Email / OTP  | Nodemailer (SMTP Gmail) |
| File Upload  | Multer |
| State Mgmt   | React Contexts (`UserContext`, `ChatContext`, `AllChatContext`) |
| Persistence  | MongoDB |

## Architecture
The platform uses a hybrid model:
1. REST API for CRUD operations (auth, chat creation, message history, file upload, profile updates).
2. WebSocket (Socket.IO) for realtime updates: message delivery, presence, typing notifications, latest message updates, chat list updates.

Backend maintains an in‑memory `Map` of online users (improvement target: external store like Redis for horizontal scaling). Each chat uses a Socket.IO room keyed by its MongoDB `_id`.

## Project Structure
```
Samwaad/
├─ client/
│  ├─ package.json
│  ├─ src/
│  │  ├─ App.jsx                # Context providers + routing
│  │  ├─ main.jsx               # React entry
│  │  ├─ index.css              # Global styles (Tailwind)
│  │  ├─ components/
│  │  │  ├─ Chat.jsx            # Message list, typing, send box
│  │  │  ├─ Users.jsx           # Chat list + latest messages
│  │  │  ├─ UserChat.jsx        # Single chat preview card
│  │  │  ├─ Navbar*.jsx         # Navigation variants
│  │  │  ├─ OTPInput.jsx        # OTP digit capture
│  │  │  ├─ Timer.jsx           # OTP countdown
│  │  ├─ contexts/              # React Context definitions
│  │  ├─ pages/                 # Route screens
│  │  │  ├─ UserAuth.jsx        # Login/Register + OTP flow
│  │  │  ├─ ChatPage.jsx        # Main chat workspace
│  │  │  ├─ CreateGroup.jsx     # Group creation UI
│  │  │  ├─ GroupDetails.jsx    # Group metadata view
│  │  │  ├─ UserProfle.jsx      # Profile (typo; should be UserProfile)
│  │  │  ├─ SettingsPage.jsx    # User settings placeholder
│  │  │  ├─ ViewImage.jsx       # Fullscreen media viewer
│  │  ├─ utils/
│  │  │  ├─ axios.js            # Axios base config + interceptor
│  │  │  ├─ socket.jsx          # Socket.IO client instance
│  └─ public/Images/            # Static assets
│
├─ server/
│  ├─ package.json
│  ├─ index.js                  # Express & Socket.IO setup
│  ├─ config/connection.js      # Mongo connection
│  ├─ middleware/
│  │  ├─ authMiddleware.js      # Access token validation
│  │  ├─ multerMiddleware.js    # File upload config (not shown above)
│  ├─ models/
│  │  ├─ user.js
│  │  ├─ chatModel.js
│  │  ├─ messageModel.js
│  │  ├─ tempUser.js            # OTP pre-verification
│  ├─ controllers/
│  │  ├─ userControllers.js
│  │  ├─ chatControllers.js
│  │  ├─ messageControllers.js
│  │  ├─ tempUserController.js
│  ├─ routes/
│  │  ├─ userRoutes.js
│  │  ├─ chatRoutes.js
│  │  ├─ messageRoutes.js
│  │  ├─ tempUserRoutes.js
│  ├─ public/Images/{uploads,profile,group} # Served static paths
└─ README.md
```

## Data Models
### User
```
userName (unique, trimmed)
userEmail (unique, lowercase)
userPassword (hashed)
refreshToken
userImage (default placeholder)
```
### Chat
```
chatName (for groups or derived other user name)
latestMessage (ref Message)
users [ref User]
isGroupChat (boolean)
groupAdmin (ref User)
groupImage (string URL)
```
### Message
```
sender (ref User)
chatId (ref Chat)
content (text, optional if image)
imageUrl (string or null)
timestamps
```
### TempUser
```
email
hashedOTP
otpExpiresAt
isVerified
timestamps
```

## API Overview
Base URL: `http://localhost:3000/api`

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST   | `/otp` | Request OTP for email verification |
| POST   | `/otp/verify` | Verify submitted OTP |
| POST   | `/user/register` | Register verified user |
| POST   | `/user/login` | Authenticate + set cookies |
| POST   | `/user/refresh` | Rotate access token via refresh cookie |
| POST   | `/user/logout` | Invalidate cookies |
| GET    | `/user/currentUser` | Return current user id from token |
| POST   | `/user/search` | Search user by name/email |
| POST   | `/user/profile` | Upload profile image / set avatar |
| GET    | `/user/:userId` | Get public user details |
| GET    | `/chat` | List all chats for current user |
| POST   | `/chat` | Create or fetch one-to-one chat |
| POST   | `/chat/group` | Create group chat (multipart) |
| GET    | `/message/:chatId` | Fetch all messages in chat |
| POST   | `/message` | Send text message |
| POST   | `/message/uploads` | Upload file/image message |

> Some exact route filenames may vary slightly (review `routes/` for authoritative names). Add versioning (e.g., `/api/v1`) for production readiness.

## Realtime Events
| Event Emitted | Payload | Description |
|---------------|---------|-------------|
| `joinChat` | `chatId` | Join Socket.IO room for a chat |
| `leaveChat` | `chatId` | Leave room |
| `newMessage` | `message` | Broadcast new message to room peers |
| `messageReceived` | `message` | Received by listeners; append to UI |
| `updateLatestMessage` | `message` | Update preview/latest message list |
| `typing` | `{chatId,user}` | Show typing indicator for user |
| `stopTyping` | `{chatId,user}` | Remove typing indicator |
| `UserOnline` | `userId` | Register user presence |
| `UpdateUserOnlineStatus` | `userId[]` | Broadcast online user ids |
| `newChat` | `(chat,receiverId)` | Notify target user of new chat |
| `updateChat` | `chat` | Add chat to list if not present |

## Authentication & Security
- **Access Token**: 15m expiry; stored as httpOnly cookie `accessToken`.
- **Refresh Token**: 60d expiry; stored in DB & `refreshToken` cookie.
- **Rotation**: Access token refreshed automatically on 401 via Axios interceptor.
- **Middleware**: `authenticateUser` validates access token, attaches `req.user.id`.
- **Improvements (Planned)**: Token rotation hardening, rate limiting for OTP and login, Redis for presence, stricter file type validation.

## Getting Started
### Prerequisites
- Node.js >= 18
- MongoDB running locally (`mongodb://127.0.0.1:27017/Samwaad` by default)

### Clone Repository
```bash
git clone https://github.com/Vivek-Bisht7/Samwaad.git
cd Samwaad
```

### Install Dependencies
```bash
cd server && npm install
cd ../client && npm install
```

### Environment Variables
Create `server/.env` (or root `.env` loaded before start):
```
PORT=3000
ACCESS_SECRET=replace_with_strong_random_string
REFRESH_SECRET=replace_with_strong_random_string
EMAIL=your_smtp_email@example.com
PASSWORD=your_smtp_app_password
NODE_ENV=development
```

### Run Development
Start backend:
```bash
cd server
node index.js
```
Start frontend (Vite default port 5173):
```bash
cd client
npm run dev
```
Open: `http://localhost:5173`

## Development Scripts
Frontend:
```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Lint codebase
```
Backend: (Add scripts to `server/package.json` if desired)
```bash
node index.js     # Start server
```

## Environment Variables
| Variable | Purpose |
|----------|---------|
| `PORT` | Express & Socket.IO server port |
| `ACCESS_SECRET` | JWT signing secret (short‑lived) |
| `REFRESH_SECRET` | JWT signing secret (long‑lived) |
| `EMAIL` | SMTP sender account |
| `PASSWORD` | SMTP app password / token |
| `NODE_ENV` | `development` or `production` for cookie security |

## Contributing
We welcome contributions! Follow these guidelines for a smooth review process.

### Branching Model
- `main`: Stable branch.
- Feature branches: `feat/<short-description>`
- Bug fixes: `fix/<issue-id-or-description>`
- Docs: `docs/<topic>`

### Workflow
1. Fork & clone repository.
2. Create feature branch from `main`.
3. Write focused commits (avoid unrelated changes).
4. Add/update documentation & tests where relevant.
5. Run lint/format locally.
6. Open Pull Request (PR) with a clear description and screenshots for UI changes.

### Commit Message Convention
```
<type>: <concise summary>

Types: feat | fix | docs | refactor | perf | test | chore
```
Example: `feat: add typing indicator debounce`

### PR Checklist
- [ ] Branch up to date with `main`
- [ ] Lints passing
- [ ] No console noise / debug leftovers
- [ ] Added/updated docs if needed
- [ ] Sensitive data not committed

### Coding Standards
- Use meaningful variable names (avoid single letters).
- Keep controller logic lean; move heavy logic to service layer (future enhancement).
- Avoid duplicating socket event handlers.

## Roadmap
- Implement Redis for presence & scaling
- Add message read receipts
- Add user search with debounce + global indexing
- File type & size validation + virus scan stub
- Rich text / emoji picker enablement
- Rate limiting & CAPTCHA for OTP endpoints
- Unit/integration test suite (Jest / Supertest)
- Dark mode & accessibility improvements

## License
No explicit license currently. Consider adding MIT or Apache-2.0 for open collaboration.

## Acknowledgements
- Socket.IO for realtime transport
- Nodemailer for OTP workflow
- Tailwind CSS for rapid UI styling

---
Feel free to open issues for bugs, feature requests, or questions.

> "Samwaad" — facilitating meaningful conversations.
