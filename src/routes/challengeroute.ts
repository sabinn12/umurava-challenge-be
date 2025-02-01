import express from 'express';
import { createChallenge, getAllChallenges, getChallengeById, getChallengeAnalytics,  updateChallenge, updateChallengeStatus, deleteChallenge } from '../controllers/challengecontroller';
import { validateChallenge,  validateUpdateChallenge, validateStatus } from '../middleware/validatechallenge';
import { checkIfChallengeExists} from '../middleware/challengeMiddlaware';

const router = express.Router();

// Create a challenge route
router.post('/create', validateChallenge, createChallenge);

// Get all challenges route
router.get('/', getAllChallenges);

// Get challenge analytics
router.get('/analytics', getChallengeAnalytics);

// get a challenge by id route
router.get('/:id',checkIfChallengeExists, getChallengeById);

// Update challenge route
router.put('/update/:id', checkIfChallengeExists, validateUpdateChallenge, updateChallenge);

// Update challenge status route
router.put('/:id/status', checkIfChallengeExists, validateStatus, updateChallengeStatus);

// Delete challenge route
router.delete('/delete/:id', checkIfChallengeExists, deleteChallenge);

export default router;