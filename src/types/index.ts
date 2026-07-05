/**
 * Core type definitions for the PowerPoint generator
 */

export interface ServiceMetadata {
  date: string; // YYYY-MM-DD
  theme?: string;
}

export interface HymnSection {
  type: 'hymn';
  hymnNumber: string; // Database hymn ID
  chsNumber: number; // Church hymn number
  title: string;
  verses: string[];
  chorus?: string | false;
  slides: string[]; // Pre-formatted slide content
}

export interface BiblePassage {
  reference: string;
  text: string;
  slides: string[]; // Pre-formatted slide content (max 7 lines each)
}

export interface BibleReadingSection {
  type: 'bible_reading';
  title: string;
  passages: BiblePassage[];
}

export interface SectionTitleSlide {
  type: 'section_title';
  title: string;
}

export type ServiceSection = SectionTitleSlide | HymnSection | BibleReadingSection;

export interface ServiceJSON {
  metadata: ServiceMetadata;
  sections: ServiceSection[];
}

/**
 * Hymn database structure
 */
export interface Hymn {
  number: string;
  title: string;
  titleWithHymnNumber: string;
  chorus: string | false;
  verses: string[];
  sound?: string;
  category: string;
}

export interface HymnDatabase {
  hymns: Record<string, Hymn>;
}

/**
 * Bible API response
 */
export interface BibleVerseResponse {
  reference: string;
  verses: Array<{
    book_name: string;
    chapter: number;
    verse: number;
    text: string;
  }>;
  text: string;
  translation: {
    name: string;
    abbreviation: string;
  };
}
