/**
 * Configuration constants
 */

export const CONFIG = {
  // Bible rendering
  BIBLE_MAX_LINES_PER_SLIDE: 7,
  BIBLE_FONT_SIZE: '36-38',

  // Hymn rendering
  HYMN_TITLE_FONT_SIZE: '46-48',
  HYMN_NUMBER_FONT_SIZE: '44-48',
  HYMN_LYRICS_FONT_SIZE: '40-48',

  // Section titles
  SECTION_TITLE_FONT_SIZE: '44-48',

  // Bible API
  BIBLE_API_BASE_URL: 'https://bible-api.com',
  BIBLE_TRANSLATION: 'kjv',

  // Input/output files
  SERVICE_TXT_PATH: './data/service.txt',
  HYMN_DB_PATH: './data/db.json',
  SERVICE_JSON_PATH: './data/service.json',
  TEMPLATE_PATH: './data/template.pptx',
  OUTPUT_PATH: './output',

  // Known section keywords for parsing
  KNOWN_SECTIONS: [
    'Opening Prayer, Praise and Worship',
    'Testimonies & Announcements',
    'Bible Reading',
    'Intercessory Prayer',
    'Offering',
    'Choir Ministration',
    'Sermon',
    'Singspiration',
    'Youth Presentations',
    'Interactive Sunday School',
    'Closing Prayer, Benediction',
  ],
};
