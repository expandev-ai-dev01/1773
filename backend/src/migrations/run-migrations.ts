/**
 * Standalone migration runner script
 *
 * This script can be run independently to apply database migrations.
 * Usage: ts-node src/migrations/run-migrations.ts
 */
import 'dotenv/config';
import { runDatabaseMigrations } from './migration-runner';

async function main() {
  try {
    console.log('Starting database migration process...\n');
    await runDatabaseMigrations({ logLevel: 'verbose' });
    console.log('Migration process completed successfully!');
    process.exit(0);
  } catch (error: any) {
    console.error('\nMigration process failed:', error.message);
    process.exit(1);
  }
}

main();
