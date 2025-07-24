# Recognition Platform

A proof-of-concept employee recognition system designed for enterprise environments. This full-stack application enables employees to recognize their colleagues' contributions through structured feedback aligned with organizational values.

## Overview

The Enterprise Recognition Platform facilitates peer-to-peer recognition within organizations by providing a streamlined workflow for acknowledging employee excellence. The system supports role-based access, enabling managers to oversee team recognition activities while maintaining a user-friendly interface for all participants.

## Architecture

### Technology Stack

**Backend**
- **Framework**: NestJS with TypeScript
- **Database**: MySQL with TypeORM
- **Authentication**: JWT with HTTP-only cookies
- **API**: RESTful endpoints with role-based access control

**Frontend**
- **Framework**: Next.js 13 with React 18
- **State Management**: TanStack React Query
- **Styling**: Emotion CSS-in-JS
- **Forms**: React Hook Form with validation
- **UI Components**: Custom components with React Modal

### System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Database     │
│   (Next.js)     │◄──►│   (NestJS)      │◄──►│    (MySQL)      │
│   Port: 3000    │    │   Port: 4000    │    │   Port: 3306    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Features

### Core Functionality
- **User Authentication**: Secure JWT-based login with automatic token refresh
- **Recognition Workflow**: 4-step process for submitting employee recognitions
- **Value-Based Recognition**: 8 predefined organizational values for structured feedback
- **Role-Based Access**: Manager-specific views for team oversight
- **Real-time Updates**: Automatic UI updates using React Query

### Recognition Values
- LEADER
- PERFORMER  
- TEAM_PLAYER
- EASY_GOING
- LISTENER
- LEARNER
- POSITIVE
- CONSTRUCTIVE

### User Roles
- **Employee**: Submit recognitions, view sent/received recognitions
- **Manager**: All employee features plus team recognition oversight

## Project Structure

```
recognition-platform/
├── backend/                 # NestJS API server
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── user/           # User management
│   │   ├── recognitions/   # Recognition business logic
│   │   ├── typeorm/        # Database entities
│   │   └── utils/          # Shared utilities
│   └── package.json
├── frontend/               # Next.js client application
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/          # Client libraries (axios, cookies)
│   │   └── types/        # TypeScript definitions
│   └── package.json
└── README.md
```

## Database Schema

### Entities

**User**
- `id`: Primary key
- `username`: Unique identifier
- `password`: Plain text (POC only)
- `managerId`: Foreign key to User (self-referential)
- `profileId`: Foreign key to Profile

**Profile**
- `id`: Primary key
- `firstname`, `lastname`: User names
- `department`, `location`: Organizational data
- `email`, `phone`: Contact information
- `description`: User bio

**Recognition**
- `id`: Primary key
- `senderId`: Foreign key to User
- `receiverId`: Foreign key to User

**RecognitionValue**
- `id`: Primary key
- `value`: Recognition type (enum)
- `detail`: Descriptive feedback
- `recognitionId`: Foreign key to Recognition

### Entity Relationships
- User ↔ Profile (1:1)
- User ↔ User (1:Many, manager relationship)
- User ↔ Recognition (1:Many, as sender)
- User ↔ Recognition (1:Many, as receiver)
- Recognition ↔ RecognitionValue (1:Many)

## Getting Started

### Prerequisites
- Node.js 18+
- Yarn package manager
- MySQL 8.0+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd recognition-platform
   ```

2. **Set up the database**
   ```sql
   CREATE DATABASE recognition_platform;
   ```

3. **Configure backend environment**
   ```bash
   cd backend
   yarn install
   ```
   
   Update database credentials in `src/app.module.ts`:
   ```typescript
   TypeOrmModule.forRoot({
     type: 'mysql',
     host: 'localhost',
     port: 3306,
     username: 'root',
     password: 'admin',
     database: 'recognition_platform',
     // ...
   })
   ```

4. **Configure frontend environment**
   ```bash
   cd ../frontend
   yarn install
   ```
   
   Create `.env.local`:
   ```
   NEXT_PUBLIC_API_TARGET=http://localhost:4000
   ```

### Running the Application

**Backend (Terminal 1)**
```bash
cd backend
yarn dev
```
Server starts on http://localhost:4000

**Frontend (Terminal 2)**
```bash
cd frontend
yarn dev
```
Client starts on http://localhost:3000

## API Documentation

### Authentication Endpoints

**POST /auth/login**
```json
{
  "username": "string",
  "password": "string"
}
```
Returns JWT access token

**POST /auth/logout**
Clears authentication cookies

**GET /auth/me**
Returns authenticated user profile

### User Endpoints

**GET /user**
Returns all users except current user

**POST /user/update-user**
Populates user profiles (development endpoint)

**POST /user/update-manager**
Links user-manager relationships (development endpoint)

### Recognition Endpoints

**POST /recognitions**
```json
{
  "senderId": "number",
  "receiverId": "number", 
  "recognitionList": {
    "LEADER": "Description text",
    "PERFORMER": "Description text"
  }
}
```

**GET /recognitions**
Returns recognitions sent by current user

**GET /recognitions/received**
Returns recognitions received by current user

**GET /recognitions/team**
Returns team recognitions (managers only)

## Authentication Flow

1. **Login**: User submits credentials to `/auth/login`
2. **Token Storage**: JWT stored in HTTP-only cookie
3. **Request Authorization**: Frontend includes token in Authorization header
4. **Route Protection**: Next.js middleware redirects unauthenticated users
5. **Token Validation**: NestJS AuthGuard validates all protected routes
6. **Automatic Logout**: 401 responses trigger automatic token removal

## Recognition Workflow

1. **Employee Selection**: Choose colleague from employee list
2. **Value Selection**: Select applicable recognition values
3. **Detail Entry**: Provide specific feedback for each selected value
4. **Submission**: Submit recognition with automatic notifications

## Development Notes

### Backend Architecture
- Global AuthGuard with public route decorators
- TypeORM entities with automatic synchronization
- JWT secret: "Some random secret to generate JWT"

### Frontend Architecture
- App Router with middleware-based authentication
- React Query for server state management
- Emotion for component styling
- Context-based modal state management

### Security Considerations
- Passwords stored in plain text (POC limitation)
- CORS enabled for development
- JWT secret hardcoded (POC limitation)

## Future Enhancements

- Password encryption and validation
- Email notifications for recognitions
- Recognition analytics and reporting
- Advanced search and filtering
- File attachment support
- Mobile-responsive design improvements

---

**Note**: This is a proof-of-concept implementation for demonstration purposes. Production deployment would require additional security measures, environment configuration, and scalability considerations.