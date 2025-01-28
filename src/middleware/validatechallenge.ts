import { Request, Response, NextFunction } from 'express';
import { challengeValidationSchema, updateChallengeValidationSchema } from '../schemas/challengeschema';


export const validateChallenge = (req: Request, res: Response, next: NextFunction) => {
  const { error } = challengeValidationSchema.validate(req.body);
  
  if (error) {
     res.status(400).json({ message: 'Validation Error', details: error.details });
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