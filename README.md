## Payment API Demo

This project includes a demo integration with a 3rd-party payment API, featuring:

- `src/pages/PaymentDemo.jsx`: Responsive demo page with Material UI layout, title, and description.
- `src/components/PaymentForm.jsx`: Material UI form for processing payments, checking status, and requesting refunds.
- `src/hooks/usePaymentApi.js`: React hook for managing payment API calls and state.
- `src/services/paymentService.js`: Service for interacting with the payment API using a reusable Axios client.
- `src/api/httpClient.js`: Configured Axios client with interceptors and retry logic.
- `src/utils/ApiError.js`: Standardized error handling for API/network failures.

### Features

- Make payments, check payment status, and request refunds.
- Success and error messages are displayed in a Material UI Card layout.
- All API calls are handled with robust error management and loading indicators.

### Usage

Import and use `PaymentDemo` in your React app to showcase payment API integration with a clean, modern UI.

## Authentication & Authorization Error Classes

Located in `src/authErrors.js`, these custom error classes are used for clean exception handling in authentication and authorization flows:

- `AuthError` (401): Generic authentication required error.
- `InvalidCredentialsError` (401): Invalid username or password.
- `TokenInvalidError` (401): Token is invalid or revoked.
- `TokenExpiredError` (401): Token has expired.
- `ForbiddenError` (403): User lacks required roles/permissions.

Each class extends the native Error object, sets its `name`, a default message, and an HTTP `status` property. All are exported for use across authentication services.

# User Login API & React App

This project provides a full-stack solution for a User Login entity, featuring a Node.js (Express) RESTful API and a React frontend.

## Features

- **Express REST API** with CRUD endpoints for users
- **Password hashing** with bcrypt
- **Input validation** and error handling
- **React User Login screen** with CRUD operations
- **Axios** for API calls
- **Configurable API URL** via `.env`
- **In-memory sample data** for demonstration

## Backend (Express)

- Entry point: `src/server.js`
- Endpoints:
  - `GET /users` - Fetch all users
  - `GET /users/:id` - Fetch user by ID
  - `POST /users` - Create/login user
  - `PUT /users/:id` - Update user
  - `DELETE /users/:id` - Delete user
- Error handling and input validation included

### Start Backend

```powershell
npm start
```

## Frontend (React)

- Main component: `src/UserLogin.js`
- Simple login form with CRUD buttons
- API calls via Axios
- Responses and errors displayed to user

### Start Frontend

```powershell
npm run react-start
```

## Environment Variables

- Set API URL in `.env`:
  ```env
  REACT_APP_API_URL=http://localhost:3000/users
  ```

## Project Structure

```
src/
	server.js           # Express backend entry
	app.js              # React frontend entry
	UserLogin.js        # React login component
	UserLogin.css       # CSS for login screen
	routes/userRoutes.js
	controllers/userController.js
	services/userService.js
	middleware/validateUser.js
	middleware/errorHandler.js
```

## Sample Data

- The backend uses an in-memory array for demonstration. No database setup required.


