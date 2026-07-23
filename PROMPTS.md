
---

# 9. `PROMPTS.md`

This is the **most important file to change**.

### Replace the entire current `PROMPTS.md` with this:

```md
# AI-Assisted Development Log

This document describes how AI tools were used as development assistants during the creation of the Car Dealership Inventory System.

AI assistance was used to support development, learning, debugging, testing, and code review. The final project was reviewed, tested, customized, and integrated by the developer.

---

## AI-Assisted Development Approach

AI tools were used during development for:

- Understanding project requirements
- Brainstorming application architecture
- Planning backend and frontend structure
- Explaining technical concepts
- Suggesting implementation approaches
- Generating initial code suggestions
- Debugging errors
- Suggesting test cases
- Reviewing implementation approaches
- Improving code quality and validation

The developer reviewed and integrated the implementation, ran the application and tests, investigated errors, customized the project, and verified the major application workflows.

---

## Project Requirements

The project was developed as a full-stack Car Dealership Inventory System using:

- Node.js
- Express.js
- MongoDB
- Mongoose
- React
- Tailwind CSS
- JWT authentication
- Role-Based Access Control
- Jest
- Supertest
- MongoDB Memory Server
- Vitest
- React Testing Library

---

## Development Workflow

The project was developed iteratively using the following workflow:

1. Understand the requirements
2. Plan the application structure
3. Implement a feature
4. Run the application
5. Test the feature
6. Debug errors
7. Review and improve the implementation
8. Verify the final behavior

AI tools were used as assistants during several stages of this workflow.

---

## Main Areas Where AI Assistance Was Used

### 1. Project Planning

AI assistance was used to discuss:

- Backend and frontend architecture
- REST API structure
- Database models
- Authentication flow
- Role-based access control
- Inventory business logic

### 2. Backend Development

AI assistance was used for:

- Explaining Express routing
- Discussing controller structure
- Explaining Mongoose models
- Debugging authentication issues
- Suggesting API validation approaches
- Reviewing error handling

### 3. Authentication

AI assistance helped explain and review:

- Password hashing using bcrypt
- JWT token generation
- JWT verification
- Authentication middleware
- Admin authorization
- Role-based access control

### 4. Frontend Development

AI assistance was used for:

- React component structure
- Context API concepts
- API integration
- Form handling
- UI improvements
- Debugging frontend behavior

### 5. Testing

AI assistance was used to suggest testing approaches and test cases for:

- User registration
- User login
- Authentication failures
- Role authorization
- Vehicle CRUD operations
- Vehicle searching
- Inventory purchases
- Restocking

The backend test suite was executed and verified with Jest and Supertest.

---

## Test Results

Backend tests:

- Test Suites: 3 passed
- Tests: 21 passed

Frontend tests:

- Tests were executed using Vitest and React Testing Library.

All implemented functionality was tested before finalizing the project.

---

## Developer Responsibility

The developer reviewed, tested, customized, and integrated the final implementation.

The developer is responsible for understanding the following major areas of the application:

- Full-stack application architecture
- Authentication flow
- JWT-based authentication
- Role-Based Access Control
- Vehicle CRUD operations
- Vehicle search and filtering
- Inventory purchase logic
- Inventory restocking
- Database models
- API routes
- Frontend-backend communication
- Automated testing

AI tools were used as development assistants and did not replace the need to review, test, understand, and verify the final application.

---

## AI Tool Usage History

The following is a summary of the AI-assisted development sessions used during the project.

### Session 1: Project Planning and Requirements Analysis

**AI Tool:**  GEMINI 3.6 FLASH

**Purpose:**
- Analyze the project requirements
- Identify the required technology stack
- Plan the full-stack architecture
- Define the backend and frontend modules
- Plan the testing strategy

** prompts:**
- "Help me plan a full-stack Car Dealership Inventory System."
- "Suggest a project architecture using React, Node.js, Express, MongoDB, and JWT."
- "How should I structure the backend and frontend folders?"

**Outcome:**
- Defined the project architecture
- Planned authentication, vehicle management, inventory, and testing modules

---

### Session 2: Backend Architecture and API Development

**AI Tool:**   GEMINI 3.6 FLASH

**Purpose:**
- Understand REST API design
- Plan controllers, routes, models, and middleware
- Understand the relationship between Express and MongoDB

** prompts:**
- "Explain how to structure Express controllers and routes."
- "How should I design a Mongoose Vehicle model?"
- "How can I implement vehicle CRUD operations?"

**Outcome:**
- Developed the backend structure
- Implemented API endpoints for authentication, vehicles, and inventory operations
- Reviewed API behavior and error handling

---

### Session 3: Authentication and Authorization

**AI Tool:**  GEMINI 3.6 FLASH

**Purpose:**
- Understand JWT authentication
- Understand password hashing
- Implement role-based authorization

** prompts:**
- "Explain how JWT authentication works in an Express application."
- "How should bcrypt be used to hash and compare passwords?"
- "How can I restrict certain routes to admin users?"

**Outcome:**
- Implemented registration and login functionality
- Added password hashing
- Added JWT authentication
- Added role-based access control for admin operations

---

### Session 4: Frontend Development

**AI Tool:**  GEMINI 3.6 FLASH

**Purpose:**
- Understand React component architecture
- Plan frontend state management
- Connect React to backend APIs
- Improve the user interface

** prompts:**
- "How should I structure React components for a vehicle inventory application?"
- "How can I manage authentication state in React?"
- "How can I connect the React frontend to an Express API?"

**Outcome:**
- Developed the React frontend
- Added authentication state management
- Added vehicle listing and filtering
- Added admin controls and inventory interactions

---

### Session 5: Testing and Debugging

**AI Tool:**  GEMINI 3.6 FLASH

**Purpose:**
- Understand automated testing
- Create test scenarios
- Debug failing tests and application errors

** prompts:**
- "How can I test Express APIs using Jest and Supertest?"
- "How can I test MongoDB operations using mongodb-memory-server?"
- "Why is this Jest test failing?"
- "How should I test authentication and authorization failures?"

**Outcome:**
- Implemented backend tests
- Tested authentication and authorization
- Tested vehicle CRUD operations
- Tested inventory operations
- Debugged test and implementation errors

---

### Session 6: Code Review and Security Improvements

**AI Tool:**  GEMINI 3.6 FLASH

**Purpose:**
- Review the completed application
- Identify security and reliability issues
- Improve code quality

** prompts:**
- "Audit my full-stack project for security and code quality."
- "Check for hardcoded secrets and environment variable issues."
- "How can I prevent race conditions during inventory purchases?"
- "How can I improve input validation?"

**Outcome:**
- Removed hardcoded secret fallbacks
- Improved environment variable handling
- Improved input validation
- Improved inventory purchase logic using atomic database updates
- Added recommendations for additional edge-case testing

---

## AI Assistance and Developer Contribution

AI tools were used as development assistants for planning, explanations, code suggestions, debugging, testing suggestions, and code review.

The developer was responsible for:

- Understanding the project requirements
- Reviewing AI-generated suggestions
- Integrating and modifying the implementation
- Running the application locally
- Running automated tests
- Debugging errors
- Verifying application behavior
- Making final implementation decisions

AI-generated suggestions were reviewed and adapted before being included in the final project.