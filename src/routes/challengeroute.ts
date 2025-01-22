import express from 'express';
import { createChallenge } from '../controllers/challengecontroller';
import { validateChallenge } from '../middleware/validatechallenge';

const router = express.Router();

// POST route to create a challenge
router.post('/create', validateChallenge, createChallenge);

export default router;
