# Daily Task Manager

A full-stack task planning and management application designed for productivity tracking across daily, weekly, and monthly timeframes. The app provides comprehensive task management with analytics, user preferences, and an intuitive UI built with modern web technologies.

## 🎯 Features

- **Multi-Level Task Management**: Create and manage tasks at daily, weekly, and monthly levels
- **Task Status Tracking**: Track tasks with statuses (Pending, Completed, Overdue)
- **Analytics Dashboard**: View task completion metrics and efficiency insights
- **User Authentication**: Secure user account management with preferences
- **Customizable Views**: Dynamic views (Daily, Weekly, Monthly) based on user preferences
- **Real-time Updates**: Instant UI updates using React Query and Zustand state management
- **Responsive Design**: Modern glass-morphism UI with Tailwind CSS and Framer Motion animations

## 🛠️ Technology Stack

### Frontend
- **React 18.3** - UI library
- **Vite 6.0** - Build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion 11.18** - Animation library
- **React Query 5.64** - Server state management
- **Zustand 5.0** - Client state management
- **PostCSS 8.4** - CSS transformations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

## 📁 Project Structure

### Root Level
```
task-planner/
├── README.md               # Project documentation
├── backend/                # Express.js server application
└── frontend/               # React.js client application
```

---

## 🗂️ Backend Structure

### `backend/` - Express.js Application

#### **Core Files**
- **`app.js`** - Express application initialization, middleware setup, and route mounting
  - Configures JSON/URL-encoded request parsing
  - Registers API routes at `/api/v1`
  - Sets up error handling and 404 handlers

- **`server.js`** - Application entry point and server startup
  - Establishes MongoDB database connection
  - Starts HTTP server on configured PORT (default 5000)
  - Handles startup errors and graceful initialization

#### **`config/` - Configuration**
- **`database.js`** - MongoDB connection configuration
  - Database URI initialization
  - Connection pooling and options setup
  - Error handling for connection failures

#### **`constants/` - Application Constants**
- **`taskConstants.js`** - Task-related enums and constants
  - Task types: DAILY, WEEKLY, MONTHLY
  - Task statuses: PENDING, COMPLETED, OVERDUE
  - Color categories and other task metadata

#### **`models/` - Mongoose Schemas**
- **`Task.js`** - Task document schema
  - Fields: userId, title, description, type, status, startDate, endDate, colorCategory, parentTaskId
  - Indexes for efficient querying
  - Timestamps for creation and updates
  - Supports task hierarchy (parent-child relationships)

- **`User.js`** - User document schema
  - Fields: name, email, passwordHash, isActive, lastLoginAt
  - User preferences (timezone, defaultView)
  - Account management fields

#### **`controllers/` - Request Handlers**
- **`taskController.js`** - Task endpoint handlers
  - `createTaskHandler` - POST handler for task creation
  - `listTasksHandler` - GET handler for task retrieval with filtering
  - `updateTaskHandler` - PUT handler for task updates
  - Delegates business logic to services

- **`analyticsController.js`** - Analytics endpoint handlers
  - Task completion metrics
  - Efficiency calculations
  - User statistics and insights

#### **`services/` - Business Logic**
- **`taskService.js`** - Task operations and query logic
  - `createTask()` - Creates new task documents
  - `getTasksForView()` - Retrieves tasks filtered by date range and type
  - `updateTask()` - Updates task status and properties
  - Date range projections for hierarchical task views

- **`analyticsService.js`** - Analytics calculations
  - Task completion rate calculations
  - Efficiency metrics computation
  - Historical data aggregation

#### **`validators/` - Input Validation**
- **`taskValidators.js`** - Task request validation schemas
  - Title, description, date range validation
  - Task type and status validation
  - Color category validation

- **`analyticsValidators.js`** - Analytics request validation
  - Date range validation
  - User ID validation
  - Filter parameter validation

#### **`middlewares/` - Middleware Functions**
- **`errorHandler.js`** - Error handling middleware
  - Global error handler for try-catch blocks
  - 404 not found handler
  - Standardized error response formatting
  - HTTP status code mapping

- **`validateRequest.js`** - Request validation middleware
  - JSON schema validation for request headers and body
  - Query parameter validation
  - Early error detection and reporting

#### **`routes/` - API Route Definitions**
- **`v1/index.js`** - Route aggregation for API v1
  - Mounts task routes at `/tasks`
  - Mounts analytics routes at `/analytics`
  - Organizes routing structure for scalability

- **`v1/taskRoutes.js`** - Task-related endpoints
  - `POST /api/v1/tasks` - Create task
  - `GET /api/v1/tasks` - List tasks with filters
  - `PUT /api/v1/tasks/:id` - Update task
  - `DELETE /api/v1/tasks/:id` - Delete task

- **`v1/analyticsRoutes.js`** - Analytics endpoints
  - `GET /api/v1/analytics/efficiency` - Get efficiency metrics
  - `GET /api/v1/analytics/completion` - Get completion stats
  - `GET /api/v1/analytics/summary` - Get overview statistics

#### **`utils/` - Utility Functions**
- **`apiResponse.js`** - Standardized API response formatting
  - `sendSuccess()` - Format successful responses with status 200/201
  - `sendError()` - Format error responses with proper HTTP status codes
  - Consistent response envelope structure

- **`dateRange.js`** - Date utility functions
  - Date range query generation
  - Task cadence projection logic
  - Timezone-aware date calculations

---

## 🗂️ Frontend Structure

### `frontend/` - React.js Application

#### **Build Configuration**
- **`package.json`** - Project metadata and dependencies
  - Scripts: `dev`, `build`, `preview`
  - Core dependencies: React, Vite, TailwindCSS, Framer Motion, React Query, Zustand

- **`vite.config.js`** - Vite build configuration
  - React plugin setup
  - Development server settings
  - Build optimization options

- **`tailwind.config.js`** - Tailwind CSS customization
  - Custom theme extensions
  - Plugin configurations
  - Utility overrides

- **`postcss.config.js`** - PostCSS configuration
  - Tailwind CSS integration
  - Autoprefixer for browser compatibility

- **`index.html`** - HTML entry point
  - Root div for React application
  - Script reference to `main.jsx`

#### **`src/` - Application Source Code**

##### **Root-Level Files**
- **`main.jsx`** - React DOM rendering entry point
  - Mounts React app to root DOM element
  - Initializes providers

- **`App.jsx`** - Root application component
  - Returns main layout/page component
  - Wraps application with providers

- **`index.css`** - Global CSS styles
  - Tailwind CSS directives
  - Global utility classes
  - Base styles

##### **`app/` - Application Providers**
- **`AppProviders.jsx`** - Context and provider wrapper component
  - Wraps application with state management providers
  - Initializes React Query client
  - Sets up global context providers

##### **`components/` - Reusable UI Components**

###### **`tasks/` - Task-Specific Components**
- **`TaskCard.jsx`** - Individual task display component
  - Renders task information (title, description, status)
  - Displays task metadata (type, dates, color)
  - Handles task interactions (edit, delete, complete)
  - Animated state transitions with Framer Motion

- **`TaskForm.jsx`** - Task creation/editing form component
  - Form fields for task input (title, description, dates, type)
  - Form validation and submission
  - Modal integration for inline editing
  - Date picker integration

###### **`ui/` - Generic UI Components**
- **`GlassCard.jsx`** - Glass-morphism card container
  - Reusable card wrapper with glassmorphic styling
  - Elevation and shadow effects
  - Responsive padding and spacing

- **`Modal.jsx`** - Modal dialog component
  - Overlay and modal content structure
  - Open/close animations
  - Customizable title, body, and footer
  - Dismissal handlers

- **`NeoButton.jsx`** - Neumorphic button component
  - Multiple button variants (primary, secondary, danger)
  - Loading and disabled states
  - Accessible keyboard navigation
  - Hover and active animations

- **`ProgressRing.jsx`** - Circular progress indicator
  - SVG-based progress visualization
  - Animated percentage fills
  - Customizable size and color
  - Task completion visualization

##### **`pages/` - Page-Level Components**
- **`DashboardPage.jsx`** - Main application page
  - Task list display with filtering
  - View switcher (Daily/Weekly/Monthly)
  - Analytics panel
  - Task creation button

##### **`hooks/` - Custom React Hooks**
- **`useTasks.js`** - Task data management hook
  - `useTasks()` - React Query hook for fetching tasks
  - `useCreateTask()` - Mutation hook for creating tasks
  - `useUpdateTask()` - Mutation hook for updating tasks
  - Automatic cache invalidation on mutations

- **`useEfficiency.js`** - Analytics data hook
  - `useEfficiency()` - Fetches user efficiency metrics
  - Calculates task completion rates
  - Aggregates performance analytics

##### **`services/` - API Integration**
- **`apiClient.js`** - Axios or Fetch-based API client
  - `createTask()` - POST request to create task
  - `getTasks()` - GET request with query filters
  - `updateTask()` - PUT request to update task
  - `deleteTask()` - DELETE request to remove task
  - `getAnalytics()` - Fetch analytics data
  - Centralized base URL and interceptor configuration

##### **`state/` - State Management**
- **`plannerStore.js`** - Zustand store for client state
  - User authentication state
  - UI state (modals, filters, view mode)
  - Temporary form data
  - Global preference settings
  - Actions for state mutations

##### **`lib/` - Utility Functions**
- **`cn.js`** - Classname utility
  - Merges Tailwind classes intelligently
  - Handles conflicting utility classes
  - Used by component styling

- **`motion.js`** - Framer Motion animation variants
  - Predefined animation templates
  - Entrance/exit animations
  - Hover effects
  - Transition configurations

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher) - Local or cloud instance
- **npm** or **yarn** package manager

### Environment Setup

#### Backend Configuration
Create a `.env` file in the `backend/` directory:

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/task-planner
# or cloud: mongodb+srv://user:password@cluster.mongodb.net/task-planner

# Server
PORT=5000
NODE_ENV=development

# Authentication (if applicable)
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
```

#### Frontend Configuration
Create a `.env` file in the `frontend/` directory (optional):

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd task-planner
```

#### 2. Backend Setup
```bash
cd backend
npm install
```

#### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### Running the Application

#### Development Mode

**Terminal 1 - Backend Server:**
```bash
cd backend
npm start
# Server starts on http://localhost:5000
```

**Terminal 2 - Frontend Dev Server:**
```bash
cd frontend
npm run dev
# Application available at http://localhost:5173 (or specified Vite port)
```

#### Production Build

**Frontend Build:**
```bash
cd frontend
npm run build
# Creates optimized build in dist/ directory
```

**Production Server:**
```bash
cd backend
NODE_ENV=production npm start
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Health Check
```
GET /health
Response: { status: "ok" }
```

### Task Endpoints

#### Create Task
```
POST /api/v1/tasks
Content-Type: application/json

Request Body:
{
  "userId": "user_id",
  "title": "Task Title",
  "description": "Task description",
  "type": "DAILY|WEEKLY|MONTHLY",
  "status": "PENDING|COMPLETED|OVERDUE",
  "startDate": "2026-02-16T00:00:00Z",
  "endDate": "2026-02-16T23:59:59Z",
  "colorCategory": "red|blue|green|yellow|purple"
}

Response (201):
{
  "success": true,
  "data": { /* created task object */ }
}
```

#### List Tasks
```
GET /api/v1/tasks?startDate=2026-02-01&endDate=2026-02-28&type=MONTHLY

Query Parameters:
- startDate (required): ISO 8601 date string
- endDate (required): ISO 8601 date string
- type (optional): DAILY, WEEKLY, or MONTHLY
- status (optional): PENDING, COMPLETED, or OVERDUE

Response (200):
{
  "success": true,
  "data": {
    "total": 10,
    "tasks": [ /* array of task objects */ ]
  }
}
```

#### Update Task
```
PUT /api/v1/tasks/:id
Content-Type: application/json

Request Body:
{
  "status": "COMPLETED",
  "title": "Updated Title",
  /* other fields to update */
}

Response (200):
{
  "success": true,
  "data": { /* updated task object */ }
}
```

#### Delete Task
```
DELETE /api/v1/tasks/:id

Response (200):
{
  "success": true,
  "message": "Task deleted successfully"
}
```

### Analytics Endpoints

#### Get Efficiency Metrics
```
GET /api/v1/analytics/efficiency?startDate=2026-02-01&endDate=2026-02-28

Response (200):
{
  "success": true,
  "data": {
    "completionRate": 75.5,
    "tasksCompleted": 15,
    "tasksTotal": 20,
    "averageCompletionTime": "2.5 days"
  }
}
```

#### Get Completion Statistics
```
GET /api/v1/analytics/completion?period=WEEKLY

Response (200):
{
  "success": true,
  "data": {
    "daily": 5,
    "weekly": 8,
    "monthly": 3
  }
}
```

#### Get Analytics Summary
```
GET /api/v1/analytics/summary

Response (200):
{
  "success": true,
  "data": {
    "totalTasks": 50,
    "completedTasks": 35,
    "pendingTasks": 10,
    "overdueTasks": 5,
    "currentStreak": 7
  }
}
```

---

## 🏗️ Architecture Overview

### Data Flow

```
User Interaction
    ↓
React Component (TaskCard, TaskForm)
    ↓
Custom Hook (useTasks, useEfficiency)
    ↓
API Client (apiClient.js)
    ↓
Express Routes (v1/taskRoutes.js)
    ↓
Controllers (taskController.js)
    ↓
Services (taskService.js) - Business Logic
    ↓
Mongoose Models (Task.js, User.js)
    ↓
MongoDB Database
```

### State Management Strategy

- **Server State**: React Query (`useQuery`, `useMutation`)
  - Task data from API
  - Analytics metrics
  - Automatic caching and invalidation

- **Client State**: Zustand (`plannerStore.js`)
  - UI modal visibility
  - View filters (daily/weekly/monthly)
  - User preferences
  - Authentication status

### Database Schema Relationships

```
User (1) ──────── (Many) Task
  ├─ id           ├─ userId (FK)
  ├─ name         ├─ title
  ├─ email        ├─ description
  ├─ preferences  ├─ type (DAILY|WEEKLY|MONTHLY)
  └─ lastLoginAt  ├─ status (PENDING|COMPLETED|OVERDUE)
                  ├─ startDate
                  ├─ endDate
                  ├─ colorCategory
                  └─ parentTaskId (for hierarchical tasks)
```

---

## 🔐 Security Considerations

- **Input Validation**: All requests validated through middleware
- **CORS**: Configure CORS in production to allow only trusted origins
- **Environment Variables**: Sensitive data (JWT secrets, DB URIs) stored in `.env`
- **Error Handling**: Sensitive error details not exposed to clients
- **Database Indexing**: Efficient queries prevent DoS attacks

---

## 📊 Performance Optimization

- **Frontend**:
  - Vite for fast development and optimized production bundles
  - React Query caching to minimize API calls
  - Code splitting and lazy loading with React
  - TailwindCSS purging for smaller CSS bundles

- **Backend**:
  - MongoDB indexes on frequently queried fields (`userId`, `type`, `status`)
  - Date range queries for efficient task filtering
  - Response pagination for large datasets
  - Connection pooling with MongoDB

---

## 🛠️ Development Guidelines

### Code Organization
- **Components**: Keep components focused on single responsibility
- **Hooks**: Extract reusable logic into custom hooks
- **Services**: Centralize external API calls in service layer
- **Validators**: Validate data at API boundaries and before mutations

### Formatting & Linting
```bash
# Automatically format code
npm run format

# Check for linting errors
npm run lint
```

### Adding New Features

1. **Backend**:
   - Create model/schema in `models/`
   - Create service logic in `services/`
   - Create controller handlers in `controllers/`
   - Define routes in `routes/v1/`
   - Add validators in `validators/`

2. **Frontend**:
   - Create components in `components/`
   - Add hooks in `hooks/` if needed
   - Integrate with state in `state/`
   - Call API through `services/apiClient.js`
   - Update page components in `pages/`

---

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error**
- Verify MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`
- Ensure correct credentials for cloud MongoDB

**Port Already in Use**
```bash
# Change PORT in .env or use
lsof -i :5000  # Find process using port
kill -9 <PID>   # Kill process
```

### Frontend Issues

**Module Not Found**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

**API Connection Error**
- Verify backend is running on `http://localhost:5000`
- Check `VITE_API_BASE_URL` configuration
- Check browser console for CORS errors

---

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 👥 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add feature description'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

---

## 📞 Support

For issues, questions, or contributions, please open an issue in the repository or contact the development team.

---

**Last Updated**: February 2026  
**Version**: 1.0.0  
**Status**: Production Ready
