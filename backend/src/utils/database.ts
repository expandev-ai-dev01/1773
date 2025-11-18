import sql from 'mssql';
import { config } from '@/config';

const dbConfig: sql.config = {
  server: config.database.server,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  options: {
    encrypt: config.database.options.encrypt,
    trustServerCertificate: config.database.options.trustServerCertificate,
    enableArithAbort: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool: sql.ConnectionPool;

/**
 * @summary
 * Establishes a connection pool to the database if one doesn't already exist.
 * Returns the existing pool if it's already connected.
 */
export const getPool = async (): Promise<sql.ConnectionPool> => {
  if (pool && pool.connected) {
    return pool;
  }
  try {
    pool = await new sql.ConnectionPool(dbConfig).connect();
    console.log('Database connection pool established.');
    pool.on('error', (err) => {
      console.error('Database pool error:', err);
    });
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
};
