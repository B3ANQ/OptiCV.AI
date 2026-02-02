# OptiCV.ai Frontend Documentation

## Overview
OptiCV.ai is an AI-powered tool designed to help users generate optimized CVs for job applications, internships, and other contracts. This frontend application provides a user-friendly interface for managing user accounts, subscriptions, and CV generation.

## Features
- User authentication (login and registration)
- Dashboard for user management
- CV generation tool
- Subscription management
- Payment processing integration

## Project Structure
```
frontend
├── src
│   ├── App.tsx               # Main application component
│   ├── index.tsx             # Entry point for the frontend application
│   ├── pages                 # Contains all page components
│   │   ├── Home.tsx          # Landing page component
│   │   ├── Login.tsx         # Login page component
│   │   ├── Register.tsx      # Registration page component
│   │   ├── Dashboard.tsx      # User management dashboard
│   │   ├── CVGenerator.tsx    # CV generation page
│   │   ├── Subscription.tsx    # Subscription management page
│   │   └── Profile.tsx        # User profile page
│   ├── components            # Reusable components
│   │   ├── Header.tsx        # Header component
│   │   ├── Footer.tsx        # Footer component
│   │   ├── CVForm.tsx        # Form for CV input
│   │   ├── PricingCard.tsx    # Subscription pricing options
│   │   └── PaymentForm.tsx    # Payment processing form
│   ├── services              # API and authentication services
│   │   ├── api.ts            # API call functions
│   │   └── authService.ts    # Authentication-related API functions
│   ├── styles                # CSS styles
│   │   └── index.css         # Main stylesheet
│   └── types                 # TypeScript types and interfaces
│       └── index.ts          # Type definitions
├── package.json              # NPM configuration for frontend
└── tsconfig.json             # TypeScript configuration for frontend
```

## Getting Started
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for details.