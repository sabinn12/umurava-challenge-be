import { Request, Response, NextFunction } from 'express';
import { challengeValidationSchema, updateChallengeValidationSchema, statusValidationSchema } from '../schemas/challengeschema';


export const validateChallenge = (req: Request, res: Response, next: NextFunction) => {
  const { error } = challengeValidationSchema.validate(req.body);
  
  if (error) {
     res.status(400).json({ message: 'Validation Error', details: error.details.map((err) => err.message) });
        return;
  }
  
  next();
};

export const validateUpdateChallenge = (req: Request, res: Response, next: NextFunction) => {
    const { error } = updateChallengeValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
       res.status(400).json({
        message: 'Validation error',
        details: error.details.map((err) => err.message),
      });
      return;
    }
    next();
  };

  export const validateStatus = (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.body;
  
    // Validate the request body using Joi
    const { error } = statusValidationSchema.validate({ status });
    if (error) {
       res.status(400).json({ message: 'Validation Error', details: error.details.map((err) => err.message) });
      return;
    }
  
    next(); 
  };