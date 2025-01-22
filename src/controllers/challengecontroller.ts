import { Request, Response } from 'express';
import { createChallengeService } from '../services/challengeservice';

export const createChallenge = async (req: Request, res: Response) => {
  try {
    const { title, deadline, duration, moneyPrize, contactEmail, description, brief, tasks } = req.body;

    // Call service to create a challenge
    const challenge = await createChallengeService({
      title,
      deadline: new Date(deadline),
      duration,
      moneyPrize,
      contactEmail,
      description,
      brief,
      tasks,
    });

    res.status(201).json({ message: 'Challenge created successfully', challenge });
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating challenge', error: error.message });
  }
};
