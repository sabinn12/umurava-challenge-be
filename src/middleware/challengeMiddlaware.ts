import { Request, Response, NextFunction } from 'express';
import ChallengeService from '../services/challengeservice';

// Middleware to check if a challenge exists
export const checkIfChallengeExists = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const challenge = await ChallengeService.getChallengeById(id);
    if (!challenge) {
      res.status(404).json({ message: 'Challenge not found' });
      return;
    }

    
    (req as any).challenge = challenge;
    next();
  } catch (error: any) {
    res.status(500).json({ message: 'Error checking challenge', error: error.message });
  }
};