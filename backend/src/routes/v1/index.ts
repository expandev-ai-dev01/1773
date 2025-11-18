import { Router } from 'express';
import internalRoutes from './internalRoutes';
import externalRoutes from './externalRoutes';

const router = Router();

// Routes that require authentication
router.use('/internal', internalRoutes);

// Publicly accessible routes
router.use('/external', externalRoutes);

export default router;
