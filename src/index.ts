/**
 * Main entry point for the PowerPoint generator
 */

import { logger } from './utils/logger.js';

async function main() {
  logger.info('Church Service PowerPoint Generator v2.0');
  logger.info('Starting generation pipeline...');

  try {
    // TODO: Implement pipeline steps
    // 1. Parse service.txt
    // 2. Retrieve Bible verses
    // 3. Retrieve hymns
    // 4. Generate PowerPoint

    logger.info('Generation complete!');
  } catch (error) {
    logger.error('Generation failed', error);
    process.exit(1);
  }
}

main();
