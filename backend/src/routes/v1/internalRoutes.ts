import { Router } from 'express';
import libraryRoutes from './libraryRoutes';
import readingGoalRoutes from './readingGoalRoutes';
import dashboardRoutes from './dashboardRoutes';

const router = Router();

// FEATURE INTEGRATION POINT
// Add internal (authenticated) routes here.
router.use('/library', libraryRoutes);
router.use('/reading-goal', readingGoalRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
