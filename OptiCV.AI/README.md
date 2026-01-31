# OptiCV.AI

OptiCV.AI is an AI-powered tool designed to help users create optimized CVs for job applications, internships, and other contracts. The application provides features for user management, subscription plans, payment processing, and data protection.

## Features

- **User Management**: Users can register, log in, and manage their profiles.
- **CV Optimization**: Generate and optimize CVs using AI algorithms tailored to job descriptions.
- **Subscription Plans**: Various subscription options for users to choose from, allowing access to premium features.
- **Payment Processing**: Secure payment processing through Stripe for subscription management.
- **Data Protection**: Ensures user data is protected and handled securely.

## Project Structure

```
OptiCV.AI
├── src
│   ├── app.ts
│   ├── config
│   │   ├── database.ts
│   │   ├── stripe.ts
│   │   └── env.ts
│   ├── controllers
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── cv.controller.ts
│   │   ├── subscription.controller.ts
│   │   └── payment.controller.ts
│   ├── models
│   │   ├── user.model.ts
│   │   ├── cv.model.ts
│   │   ├── subscription.model.ts
│   │   └── payment.model.ts
│   ├── routes
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── cv.routes.ts
│   │   ├── subscription.routes.ts
│   │   └── payment.routes.ts
│   ├── services
│   │   ├── ai.service.ts
│   │   ├── cv-optimizer.service.ts
│   │   ├── stripe.service.ts
│   │   └── email.service.ts
│   ├── middleware
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── error.middleware.ts
│   ├── utils
│   │   ├── encryption.ts
│   │   └── logger.ts
│   └── types
│       └── index.ts
├── tests
│   ├── unit
│   └── integration
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/OptiCV.AI.git
   ```
2. Navigate to the project directory:
   ```
   cd OptiCV.AI
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Set up your environment variables by copying `.env.example` to `.env` and filling in the required values.

## Usage

To start the application, run:
```
npm start
```

Visit `http://localhost:3000` in your browser to access the application.

## License

This project is made by Victor Sanson a.k.a B3ANQ