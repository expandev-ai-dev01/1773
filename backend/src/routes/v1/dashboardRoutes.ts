import { Router } from 'express';
import * as dashboardController from '@/api/v1/internal/dashboard/controller';
import { authMiddleware } from '@/middleware/auth';

const router = Router();

/**
 * @api {get} /dashboard Get Dashboard Data
 * @apiName GetDashboardData
 * @apiGroup Dashboard
 * @apiVersion 1.0.0
 * @apiPermission authenticated
 *
 * @apiSuccess {Object} data Dashboard data.
 */
router.get('/', authMiddleware, dashboardController.getDashboardData);

export default router;
