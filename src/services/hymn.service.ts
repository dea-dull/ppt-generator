import { readJSON } from '../utils/file.js';
import { logger } from '../utils/logger.js';
import { Hymn, HymnSlide } from '../types/index.js';

interface HymnDbEntry {
  number: string;
  title: string;
  titleWithHymnNumber?: string;
  chorus: string | false;
  verses: string[];
  sound?: string;
  category?: string;
}

interface HymnDatabase {
  hymns: HymnDbEntry[];
}

export class HymnService {
  private db: HymnDatabase | null = null;
  private dbPath: string;

  constructor(dbPath: string = 'db.json') {
    this.dbPath = dbPath;
  }

  async initialize(): Promise<void> {
    logger.info(`Loading hymn database from ${this.dbPath}`);
    this.db = await readJSON<HymnDatabase>(this.dbPath);
    logger.info(`Loaded ${this.db.hymns.length} hymns from database`);
  }

  async getHymn(chsNumber: number, title?: string): Promise<Hymn | null> {
    if (!this.db) {
      await this.initialize();
    }

    logger.debug(`Looking up hymn CHS ${chsNumber}`);
    const hymnEntry = this.db!.hymns.find(h => parseInt(h.number, 10) === chsNumber);

    if (!hymnEntry) {
      logger.warn(`Hymn CHS ${chsNumber} not found in database`);
      return null;
    }

    const slides = this.generateSlides(hymnEntry);

    return {
      type: 'hymn',
      hymnNumber: hymnEntry.number,
      chsNumber,
      title: title || hymnEntry.title,
      verses: hymnEntry.verses,
      chorus: hymnEntry.chorus,
      slides,
    };
  }

  private generateSlides(hymn: HymnDbEntry): HymnSlide[] {
    const slides: HymnSlide[] = [];

    // Title slide
    slides.push({
      text: hymn.title,
      type: 'title',
    });

    // Verse slides - each verse on its own slide
    for (const verse of hymn.verses) {
      slides.push({
        text: verse,
        type: 'verse',
      });
    }

    // Chorus slide (if present)
    if (hymn.chorus && hymn.chorus !== false) {
      slides.push({
        text: hymn.chorus,
        type: 'chorus',
      });
    }

    return slides;
  }
}

export const hymnService = new HymnService();