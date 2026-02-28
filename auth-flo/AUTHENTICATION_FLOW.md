# Authentication Flow Implementation

## Overview
This project implements a complete authentication flow with Login, Registration, and Account Setup pages using React and React Hook Form for validation.

## Features

### 1. **Login Page** (`src/pages/Login.js`)
- Email input with validation
  - Required field
  - Valid email format validation
- Password input with validation
  - Required field
  - Minimum 6 characters
- Link to register page for new users
- Form validation using React Hook Form

### 2. **Registration Page** (`src/pages/Register.js`)
- Email input with validation
  - Required field
  - Valid email format validation
- Password input with validation
  - Required field
  - Minimum 6 characters
- Confirm Password input
  - Required field
  - Must match password field
- Link to login page for existing users
- Form validation using React Hook Form

### 3. **Account Setup Page** (`src/pages/SetupAccount.js`)
- Profile Photo upload
  - File input with image preview
  - Required field
- First Name input
  - Required field
  - Minimum 2 characters
  - Letters and spaces only
- Last Name input
  - Required field
  - Minimum 2 characters
  - Letters and spaces only
- Redirects to Homepage after completion

### 4. **Homepage** (`src/pages/Home.js`)
- Welcome message
- Logout button
- Redirects to login page on logout

## File Structure
```
src/
├── pages/
│   ├── Login.js
│   ├── Register.js
│   ├── SetupAccount.js
│   └── Home.js
├── styles/
│   ├── AuthForms.css
│   └── Home.css
├── App.js
└── index.js
```

## Routing
- `/` → Redirects to `/login`
- `/login` → Login page
- `/register` → Registration page
- `/setup-account` → Account setup page (after registration)
- `/home` → Homepage (after login or setup completion)

## Validation Rules

### Email Fields
- Required
- Must be a valid email format

### Password Fields (Login)
- Required
- Minimum 6 characters

### Password Fields (Registration)
- Required
- Minimum 6 characters
- Confirm Password must match Password field

### First Name / Last Name (Setup)
- Required
- Minimum 2 characters
- Only letters and spaces allowed

### Profile Photo (Setup)
- Required
- Must be an image file

## Technologies Used
- **React 19.2.4** - UI library
- **React Router DOM** - Client-side routing
- **React Hook Form** - Form validation and state management
- **CSS3** - Styling with gradients and animations

## How to Run

1. Install dependencies (already done):
```bash
npm install react-hook-form react-router-dom
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## User Flow

1. **New User**: 
   - Land on Login page → Click "Register here" link
   - Fill registration form → Submit
   - Redirected to Account Setup page
   - Complete profile information → Submit
   - Redirected to Homepage

2. **Existing User**:
   - Land on Login page
   - Fill login form → Submit
   - Redirected to Homepage

3. **From Homepage**:
   - Click "Logout" button
   - Redirected back to Login page

## Styling
- Modern gradient background (purple to pink)
- Smooth animations and transitions
- Responsive design for mobile devices
- Professional card-based UI design
- Error messages in red with clear validation feedback

## Notes
- Data is not persisted (localStorage is only used for temporary flow management)
- Form data is logged to browser console on submission
- All validation happens client-side using React Hook Form
- File uploads are converted to data URLs for preview purposes
