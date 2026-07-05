import axios from 'axios';
import { logger } from '../utils/logger.js';
import { BiblePassage, BibleSlide } from '../types/index.js';

interface BibleApiResponse {
  text: string;
  reference: string;
  translation_id: string;
}

const BIBLE_API_URL = 'https://bible-api.com';
const MAX_LINES_PER_SLIDE = 7;
const DEFAULT_TRANSLATION = 'kjv';

export class BibleService {
  async getPassage(reference: string): Promise<BiblePassage | null> {
    try {
      logger.debug(`Fetching Bible passage: ${reference}`);
      const response = await axios.get<BibleApiResponse>(`${BIBLE_API_URL}`, {
        params: {
          query: reference,
          translation: DEFAULT_TRANSLATION,
        },
      });

      if (!response.data.text) {
        logger.warn(`No text found for Bible reference: ${reference}`);
        return null;
      }

      const slides = this.generateSlides(response.data.text, response.data.reference);

      return {
        reference: response.data.reference,
        text: response.data.text,
        slides,
      };
    } catch (error) {
      logger.error(`Failed to fetch Bible passage: ${reference}`, error);
      return null;
    }
  }

  async getMultiplePassages(references: string[]): Promise<BiblePassage[]> {
    const passages: BiblePassage[] = [];

    for (const reference of references) {
      const passage = await this.getPassage(reference);
      if (passage) {
        passages.push(passage);
      }
    }

    return passages;
  }

  private generateSlides(text: string, reference: string): BibleSlide[] {
    const slides: BibleSlide[] = [];
    const lines = text.split('\n').filter(line => line.trim().length > 0);

    let currentSlide: string[] = [];

    for (const line of lines) {
      if (currentSlide.length >= MAX_LINES_PER_SLIDE) {
        slides.push({
          text: currentSlide.join('\n'),
          reference,
        });
        currentSlide = [];
      }
      currentSlide.push(line);
    }

    if (currentSlide.length > 0) {
      slides.push({
        text: currentSlide.join('\n'),
        reference,
      });
    }

    return slides;
  }
}

export const bibleService = new BibleService();