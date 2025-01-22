import { Request, Response, NextFunction } from 'express';
import { challengeValidationSchema } from '../schemas/challengeschema';

export const validateChallenge = (req: Request, res: Response, next: NextFunction) => {
  const { error } = challengeValidationSchema.validate(req.body);
  
  if (error) {
     res.status(400).json({ message: 'Validation Error', details: error.details });
        return;
  }
  
  next();
};
