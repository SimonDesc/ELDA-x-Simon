import { Router } from 'express';
import { getAllSnowDepths } from '../controllers/snowDepthController.js';

const router = Router();

router.get('/', getAllSnowDepths);

export default router;
