export interface ServiceMetadata {
  date: string;
  theme?: string;
}

export interface HymnSlide {
  text: string;
  type: 'title' | 'verse' | 'chorus';
}

export interface Hymn {
  type: 'hymn';
  hymnNumber: string;
  chsNumber: number;
  title: string;
  verses: string[];
  chorus?: string | false;
  slides: HymnSlide[];
}

export interface BiblePassage {
  reference: string;
  text: string;
  slides: BibleSlide[];
}

export interface BibleSlide {
  text: string;
  reference: string;
}

export interface BibleReading {
  type: 'bible_reading';
  title: string;
  passages: BiblePassage[];
}

export interface SectionTitle {
  type: 'section_title';
  title: string;
}

export type ServiceSection = Hymn | BibleReading | SectionTitle;

export interface ServiceJson {
  metadata: ServiceMetadata;
  sections: ServiceSection[];
}

export interface ParsedHymn {
  chsNumber: number;
  title: string;
}

export interface ParsedBibleReference {
  reference: string;
}