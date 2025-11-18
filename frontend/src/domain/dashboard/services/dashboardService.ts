import { authenticatedClient } from '@/core/lib/api';
import { DashboardData } from '../types';

/**
 * @service dashboardService
 * @summary Service for fetching dashboard data.
 * @domain dashboard
 * @type api-service
 */
export const dashboardService = {
  /**
   * @endpoint GET /dashboard
   * @summary Fetches all data for the user dashboard.
   */
  async getDashboardData(): Promise<DashboardData> {
    const response = await authenticatedClient.get<{ data: DashboardData }>('/dashboard');
    return response.data.data;
  },
};
