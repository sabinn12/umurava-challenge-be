import { Request, Response } from 'express';
import { createChallengeService, getAllChallengesService, getChallengeByIdService, updateChallengeService, deleteChallengeService } from '../services/challengeservice';

// create a challenge controller
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

// get all challenges controller

export const getAllChallenges = async (req: Request, res: Response) => {
  try {
    // Fetch all challenges using the service
    const challenges = await getAllChallengesService();

    res.status(200).json({ message: 'Challenges retrieved successfully', challenges });
  } catch (error: any) {
    res.status(500).json({ message: 'Error retrieving challenges', error: error.message });
  }
};

// get a challenge controller with id

export const getChallengeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Fetch challenge by ID
    const challenge = await getChallengeByIdService(id);

    if (!challenge) {
       res.status(404).json({ message: 'Challenge not found' });
       return;
    }

    res.status(200).json({ message: 'Challenge retrieved successfully', challenge });
  } catch (error: any) {
    res.status(500).json({ message: 'Error retrieving challenge', error: error.message });
  }
};


// update a challenge controller with id
export const updateChallenge = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      // Check if challenge exists
      const existingChallenge = await getChallengeByIdService(id);
      if (!existingChallenge) {
         res.status(404).json({ message: 'Challenge not found' });
         return;
      }
  
      // Update challenge
      const updatedChallenge = await updateChallengeService(id, updates);
      res.status(200).json({ message: 'Challenge updated successfully', updatedChallenge });
    } catch (error: any) {
      res.status(500).json({ message: 'Error updating challenge', error: error.message });
    }
  };

  // delete a challenge controller with id

  export const deleteChallenge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if the challenge exists
    const existingChallenge = await getChallengeByIdService(id);
    if (!existingChallenge) {
       res.status(404).json({ message: 'Challenge not found' });
       return;
    }

    // Delete the challenge
    await deleteChallengeService(id);

    res.status(200).json({ message: 'Challenge deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting challenge', error: error.message });
  }
};

  