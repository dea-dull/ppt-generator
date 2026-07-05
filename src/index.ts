import { parseServiceFile } from './parser/index.js';
import { hymnService } from './services/hymn.service.js';
import { serviceBuilder } from './services/service.builder.js';
import { generatePowerPoint } from './powerpoint/generator.js';
import { writeJSON } from './utils/file.js';
import { logger } from './utils/logger.js';
import path from 'path';

const INPUT_SERVICE_FILE = 'service.txt';
const OUTPUT_SERVICE_JSON = 'service.json';
const OUTPUT_PPTX = 'output.pptx';
const HYMN_DB_FILE = 'db.json';

async function main(): Promise<void> {
  try {
    logger.info('Starting Church Service PowerPoint Generator');

    // Step 1: Parse service.txt
    logger.info('Step 1: Parsing service.txt');
    const parseResult = await parseServiceFile(INPUT_SERVICE_FILE);

    // Step 2: Initialize hymn service
    logger.info('Step 2: Initializing hymn service');
    await hymnService.initialize();

    // Step 3: Build service.json with full data
    logger.info('Step 3: Building service.json with retrieved data');
    const serviceJson = await serviceBuilder.build(
      parseResult.metadata,
      parseResult.hymns,
      parseResult.bibleReferences,
      parseResult.sections
    );

    // Step 4: Save service.json
    logger.info('Step 4: Saving service.json');
    await writeJSON(OUTPUT_SERVICE_JSON, serviceJson);

    // Step 5: Generate PowerPoint
    logger.info('Step 5: Generating PowerPoint presentation');
    await generatePowerPoint(serviceJson, OUTPUT_PPTX);

    logger.info('PowerPoint generation complete!');
  } catch (error) {
    logger.error('Fatal error:', error);
    process.exit(1);
  }
}

main();