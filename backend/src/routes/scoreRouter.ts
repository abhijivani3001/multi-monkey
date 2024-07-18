import express from 'express';
import { protect } from '../controllers/authController';
import { getScores, postScore } from '../controllers/scoreController';

const router = express.Router();

router.use(protect);

router.get('/:id', getScores);
router.post('/', postScore);

export default router;
