import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import 'dotenv/config';

import { config } from '@/config';
import { errorMiddleware } from '@/middleware/error';
import { notFoundMiddleware } from '@/middleware/notFound';
import apiRoutes from '@/routes';
import { runDatabaseMigrations } from '@/migrations/migration-runner';

const app: Application = express();

// Core Middleware
app.use(helmet());
app.use(cors(config.api.cors));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Health Check Endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api', apiRoutes);

// Error Handling Middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

let server: any;

async function startApplication() {
  try {
    // Run database migrations before starting the server
    console.log('Initializing application...');
    await runDatabaseMigrations({
      skipIfNoNewMigrations: true,
      logLevel: 'minimal',
    });
    console.log('✓ Database migrations checked successfully.\n');

    server = app.listen(config.api.port, () => {
      console.log(`🚀 Server is running on port ${config.api.port} in ${config.nodeEnv} mode`);
      console.log(
        `   API available at http://localhost:${config.api.port}/api/${config.api.version}`
      );
    });
  } catch (error: any) {
    console.error('❌ Failed to start application:', error.message);
    process.exit(1);
  }
}

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully...');
  if (server) {
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  }
});

startApplication();

export default app;
