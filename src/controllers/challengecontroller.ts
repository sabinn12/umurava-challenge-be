import { Request, Response } from 'express';
import ChallengeService from '../services/challengeservice';

// Create a challenge controller
export const createChallenge = async (req: Request, res: Response) => {
  try {
    const { deadline, ...rest } = req.body;

    const challenge = await ChallengeService.createChallenge({ ...rest,deadline: new Date(deadline), });
    res.status(201).json({ message: 'Challenge created successfully', challenge });

  } catch (error: any) {
    res.status(500).json({ message: 'Error creating challenge', error: error.message });
  }
};

// Get all challenges controller
export const getAllChallenges = async (req: Request, res: Response) => {
  try {
    // Destructure query parameters with defaults
    const { page = '1', limit = '3' } = req.query;
    const parsedPage = parseInt(page as string);
    const parsedLimit = parseInt(limit as string);

    // Calculate offset for pagination
    const offset = (parsedPage - 1) * parsedLimit;

    // Fetch paginated challenges and total count
    const { challenges, total } = await ChallengeService.getAllChallenges(offset, parsedLimit);

    // Calculate total pages
    const totalPages = Math.ceil(total / parsedLimit);

    res.status(200).json({
      message: 'Challenges retrieved successfully',
      challenges,
      pagination: {
        page: parsedPage,
        limit: parsedLimit,
        total,
        totalPages,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error retrieving challenges', error: error.message });
  }
};

// Get a challenge by ID controller
export const getChallengeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const challenge = (req as any).challenge;

    if (!challenge) {
      res.status(404).json({ message: 'Challenge not found' });
    } else {
      res.status(200).json({ message: 'Challenge retrieved successfully', challenge });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Error retrieving challenge', error: error.message });
  }
};

// Update a challenge controller
export const updateChallenge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedChallenge = await ChallengeService.updateChallenge(id, updates);
    res.status(200).json({ message: 'Challenge updated successfully', updatedChallenge });
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating challenge', error: error.message });
  }
};

// Delete a challenge controller
export const deleteChallenge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await ChallengeService.deleteChallenge(id);
    res.status(200).json({ message: 'Challenge deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting challenge', error: error.message });
  }
};