import { Request, Response, NextFunction } from 'express';
import ChallengeService from '../services/challengeservice';

// Middleware to check if a challenge exists
export const checkChallengeExists = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const challenge = await ChallengeService.getChallengeById(id);
    if (!challenge) {
      res.status(404).json({ message: 'Challenge not found' });
      return;
    }

    // Attach the challenge to the request object for use in the controller
    (req as any).challenge = challenge;
    next();
  } catch (error: any) {
    res.status(500).json({ message: 'Error checking challenge', error: error.message });
  }
};