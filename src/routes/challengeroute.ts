import express from 'express';
import { createChallenge, getAllChallenges, getChallengeById, updateChallenge, deleteChallenge } from '../controllers/challengecontroller';
import { validateChallenge, validateUpdateChallenge } from '../middleware/validatechallenge';

const router = express.Router();

// Create a challenge route
router.post('/create', validateChallenge, createChallenge);

// Get all challenges route
router.get('/', getAllChallenges);

// get a challenge by id route
router.get('/:id', getChallengeById);

// Update challenge route
router.put('/:id', validateUpdateChallenge, updateChallenge);

// Delete challenge route
router.delete('/:id', deleteChallenge);

export default router;
