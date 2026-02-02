# OptiCV.ai Backend Documentation

## Overview
OptiCV.ai is an AI-powered tool designed to help users generate optimized CVs for job applications, internships, and other contracts. The backend of the application is built using TypeScript and Express, providing a robust API for managing users, CVs, subscriptions, and payments.

## Features
- **User Management**: Handle user registration, authentication, and profile management.
- **CV Generation**: Create, update, and retrieve CVs using AI-driven methods.
- **Subscription Plans**: Manage user subscriptions with various pricing options.
- **Payment Processing**: Securely process payments using Stripe.

## Project Structure
The backend is organized into several key directories:
- **src**: Contains the main application code.
  - **controllers**: Business logic for handling requests.
  - **routes**: API endpoints for different functionalities.
  - **models**: Database schemas for users, CVs, subscriptions, and payments.
  - **services**: Contains the core logic for AI CV generation and other services.
  - **middleware**: Custom middleware for authentication and error handling.
  - **config**: Configuration files for database and environment variables.
  - **types**: TypeScript types and interfaces used throughout the application.

## Getting Started
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/OptiCV.ai.git
   ```
2. Navigate to the backend directory:
   ```
   cd OptiCV.ai/backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up environment variables in a `.env` file based on the `.env.example` provided.
5. Start the server:
   ```
   npm run start
   ```

## API Documentation
Refer to the individual controller files for detailed information on the available API endpoints and their usage.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.