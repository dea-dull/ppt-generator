import { hymnService } from './hymn.service.js';
import { bibleService } from './bible.service.js';
import { logger } from '../utils/logger.js';
import { ServiceJson, ServiceMetadata, ParsedHymn, ParsedBibleReference, SectionTitle } from '../types/index.js';

export class ServiceBuilder {
  async build(
    metadata: ServiceMetadata,
    hymns: ParsedHymn[],
    bibleReferences: ParsedBibleReference[],
    sections: SectionTitle[]
  ): Promise<ServiceJson> {
    logger.info('Building service.json');

    const serviceJson: ServiceJson = {
      metadata,
      sections: [],
    };

    // Fetch all hymns from database
    logger.info(`Fetching ${hymns.length} hymns from database`);
    for (const hymn of hymns) {
      const hymnData = await hymnService.getHymn(hymn.chsNumber, hymn.title);
      if (hymnData) {
        serviceJson.sections.push(hymnData);
      }
    }

    // Fetch all Bible passages
    logger.info(`Fetching ${bibleReferences.length} Bible passages`);
    const references = bibleReferences.map(ref => ref.reference);
    const passages = await bibleService.getMultiplePassages(references);

    if (passages.length > 0) {
      serviceJson.sections.push({
        type: 'bible_reading',
        title: 'Bible Reading',
        passages,
      });
    }

    // Add section titles
    for (const section of sections) {
      serviceJson.sections.push(section);
    }

    logger.info(`Service built with ${serviceJson.sections.length} sections`);
    return serviceJson;
  }
}

export const serviceBuilder = new ServiceBuilder();