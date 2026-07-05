import { readFile } from '../utils/file.js';
import { logger } from '../utils/logger.js';
import { ServiceMetadata, ParsedHymn, ParsedBibleReference, SectionTitle } from '../types/index.js';

const SECTION_KEYWORDS = [
  'opening prayer',
  'praise and worship',
  'testimonies',
  'announcements',
  'bible reading',
  'intercessory prayer',
  'offering',
  'choir ministration',
  'sermon',
  'sunday message',
  'singspiration',
  'youth presentation',
  'interactive sunday school',
  'closing prayer',
  'benediction',
];

export interface ParseResult {
  metadata: ServiceMetadata;
  hymns: ParsedHymn[];
  bibleReferences: ParsedBibleReference[];
  sections: SectionTitle[];
}

export async function parseServiceFile(filePath: string): Promise<ParseResult> {
  logger.info(`Parsing service file: ${filePath}`);
  const content = await readFile(filePath);
  const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  const result: ParseResult = {
    metadata: { date: '', theme: '' },
    hymns: [],
    bibleReferences: [],
    sections: [],
  };

  for (const line of lines) {
    const dateMatch = line.match(/DATE[:\s]+([0-9]{4}-[0-9]{2}-[0-9]{2})/i);
    if (dateMatch) {
      result.metadata.date = dateMatch[1];
      logger.debug(`Found date: ${result.metadata.date}`);
    }

    const themeMatch = line.match(/THEME[:\s]+(.+)/i);
    if (themeMatch) {
      result.metadata.theme = themeMatch[1].trim();
      logger.debug(`Found theme: ${result.metadata.theme}`);
    }

    const hymnMatch = line.match(/HYMN[\s\-:]+CHS\s+(\d+)(?:[\s\-:]+(.*?))?$/i);
    if (hymnMatch) {
      const chsNumber = parseInt(hymnMatch[1], 10);
      const title = hymnMatch[2]?.trim() || '';
      result.hymns.push({ chsNumber, title });
      logger.debug(`Found hymn: CHS ${chsNumber} - ${title}`);
    }

    const bibleMatch = line.match(/(?:BIBLE[:\s]+)?([A-Za-z\s]+\s+\d+[:\d\-,\s]+)/i);
    if (bibleMatch && !line.toLowerCase().includes('hymn')) {
      const reference = bibleMatch[1].trim();
      if (/[A-Za-z]+\s+\d+/.test(reference)) {
        result.bibleReferences.push({ reference });
        logger.debug(`Found Bible reference: ${reference}`);
      }
    }

    for (const keyword of SECTION_KEYWORDS) {
      if (line.toLowerCase().includes(keyword)) {
        const sectionMatch = line.match(new RegExp(`\\b(${keyword}[^\n]*)`, 'i'));
        if (sectionMatch) {
          const title = sectionMatch[1].trim();
          result.sections.push({ title });
          logger.debug(`Found section: ${title}`);
          break;
        }
      }
    }
  }

  logger.info(`Parse complete. Found ${result.hymns.length} hymns, ${result.bibleReferences.length} Bible references, ${result.sections.length} sections`);
  return result;
}