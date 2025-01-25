import express from 'express';
import { createChallenge, getAllChallenges, getChallengeById, updateChallenge, deleteChallenge } from '../controllers/challengecontroller';
import { validateChallenge, validateUpdateChallenge } from '../middleware/validatechallenge';
import { checkChallengeExists } from '../middleware/challengeMiddlaware';

const router = express.Router();

// Create a challenge route
router.post('/create', validateChallenge, createChallenge);

// Get all challenges route
router.get('/', getAllChallenges);

// get a challenge by id route
router.get('/:id', getChallengeById);

// Update challenge route
router.put('/update/:id', checkChallengeExists, validateUpdateChallenge, updateChallenge);

// Delete challenge route
router.delete('/delete/:id', checkChallengeExists, deleteChallenge);

export default router;