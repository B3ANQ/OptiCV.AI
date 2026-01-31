import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array()
    });
    return;
  }
  
  next();
};

export const validateCV = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').optional().isMobilePhone('any').withMessage('Valid phone number required'),
  body('skills').isArray().withMessage('Skills must be an array'),
  body('technicalStack').optional().isArray().withMessage('Technical stack must be an array'),
  body('languages').optional().isArray().withMessage('Languages must be an array'),
  body('experiences').isArray().withMessage('Experiences must be an array'),
  body('education').isArray().withMessage('Education must be an array'),
  body('projects').optional().isArray().withMessage('Projects must be an array'),
  body('about').optional().isString().withMessage('About must be a string'),
  body('drivingLicenses').optional().isArray().withMessage('Driving licenses must be an array'),
  body('jobTitle').notEmpty().withMessage('Job title is required'),
  body('cvStyle').optional().isIn(['modern', 'classic', 'creative', 'minimalist', 'professional']).withMessage('Invalid CV style'),
  validateRequest
];

export const validateUser = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  validateRequest
];

export const validateSubscription = [
  body('planType').isIn(['free', 'premium_monthly', 'premium_annual']).withMessage('Invalid plan type'),
  validateRequest
];