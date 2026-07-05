import PptxGenJS from 'pptxgenjs';
import { logger } from '../utils/logger.js';
import { ServiceJson, Hymn, BibleReading, SectionTitle } from '../types/index.js';

export class PowerPointGenerator {
  private prs: PptxGenJS;
  private templatePath?: string;
  private slideCount: number = 0;

  constructor(templatePath?: string) {
    this.prs = new PptxGenJS();
    this.templatePath = templatePath;
    this.setupPresentation();
  }

  private setupPresentation(): void {
    // Set default slide dimensions (standard 16:9)
    this.prs.defineLayout({ name: 'BLANK', width: 10, height: 7.5 });
  }

  async generate(serviceJson: ServiceJson): Promise<void> {
    logger.info('Generating PowerPoint presentation');

    for (const section of serviceJson.sections) {
      if (section.type === 'hymn') {
        this.addHymnSlides(section as Hymn);
      } else if (section.type === 'bible_reading') {
        this.addBibleReadingSlides(section as BibleReading);
      } else if (section.type === 'section_title') {
        this.addSectionTitleSlide(section as SectionTitle);
      }
    }

    logger.info(`Generated ${this.slideCount} slides`);
  }

  private addHymnSlides(hymn: Hymn): void {
    logger.debug(`Adding hymn slides for CHS ${hymn.chsNumber}`);

    for (const slide of hymn.slides) {
      const pptSlide = this.prs.addSlide();
      this.slideCount++;
      this.applyDefaultLayout(pptSlide);

      if (slide.type === 'title') {
        pptSlide.addText(`CHS ${hymn.chsNumber}`, {
          x: 0.5,
          y: 2,
          w: 9,
          h: 1,
          fontSize: 44,
          bold: true,
          align: 'center' as const,
          color: '000000',
        });
        pptSlide.addText(slide.text, {
          x: 0.5,
          y: 3.2,
          w: 9,
          h: 1.5,
          fontSize: 46,
          bold: true,
          align: 'center' as const,
          color: '000000',
        });
      } else {
        pptSlide.addText(slide.text, {
          x: 0.5,
          y: 1.5,
          w: 9,
          h: 5,
          fontSize: 40,
          align: 'center' as const,
          valign: 'middle' as const,
          color: '000000',
          wrap: true,
        });
      }
    }
  }

  private addBibleReadingSlides(bibleReading: BibleReading): void {
    logger.debug('Adding Bible reading slides');

    // Add title slide
    const titleSlide = this.prs.addSlide();
    this.slideCount++;
    this.applyDefaultLayout(titleSlide);
    titleSlide.addText(bibleReading.title, {
      x: 0.5,
      y: 3,
      w: 9,
      h: 1.5,
      fontSize: 48,
      bold: true,
      align: 'center' as const,
      color: '000000',
    });

    // Add passage slides
    for (const passage of bibleReading.passages) {
      for (const slide of passage.slides) {
        const pptSlide = this.prs.addSlide();
        this.slideCount++;
        this.applyDefaultLayout(pptSlide);

        pptSlide.addText(slide.reference, {
          x: 0.5,
          y: 0.5,
          w: 9,
          h: 0.5,
          fontSize: 14,
          italic: true,
          align: 'right' as const,
          color: '666666',
        });

        pptSlide.addText(slide.text, {
          x: 0.5,
          y: 1.2,
          w: 9,
          h: 5.8,
          fontSize: 36,
          align: 'left' as const,
          valign: 'top' as const,
          color: '000000',
          wrap: true,
          lineSpacing: 28,
        });
      }
    }
  }

  private addSectionTitleSlide(section: SectionTitle): void {
    logger.debug(`Adding section title slide: ${section.title}`);

    const slide = this.prs.addSlide();
    this.slideCount++;
    this.applyDefaultLayout(slide);

    slide.addText(section.title, {
      x: 0.5,
      y: 3,
      w: 9,
      h: 1.5,
      fontSize: 48,
      bold: true,
      align: 'center' as const,
      color: '000000',
    });
  }

  private applyDefaultLayout(slide: any): void {
    // Add background
    slide.background = { fill: 'FFFFFF' };
  }

  async save(filePath: string): Promise<void> {
    logger.info(`Saving PowerPoint to ${filePath}`);
    await this.prs.writeFile({ fileName: filePath });
    logger.info('PowerPoint saved successfully');
  }
}

export async function generatePowerPoint(
  serviceJson: ServiceJson,
  outputPath: string,
  templatePath?: string
): Promise<void> {
  const generator = new PowerPointGenerator(templatePath);
  await generator.generate(serviceJson);
  await generator.save(outputPath);
}
