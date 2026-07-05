# Church Service PowerPoint Generator - Redesigned

A TypeScript-based tool for generating church service PowerPoint presentations from service order data.

## Overview

This tool automates the creation of professional PowerPoint presentations for church services by:

1. **Parsing** a service order file (`service.txt`)
2. **Retrieving** hymn lyrics from a local database
3. **Fetching** Bible passages from the Bible API
4. **Generating** a structured service data file (`service.json`)
5. **Creating** a formatted PowerPoint presentation (`output.pptx`)

## Project Structure

```
src/
├── types/              # TypeScript interfaces and types
├── parser/             # Service order file parser
├── services/           # Business logic services
│   ├── hymn.service.ts        # Hymn retrieval and processing
│   ├── bible.service.ts       # Bible passage retrieval
│   └── service.builder.ts     # Service data assembly
├── powerpoint/         # PowerPoint generation
└── utils/              # Helper utilities
    ├── logger.ts       # Logging utility
    └── file.ts         # File I/O utilities
```

## Installation

```bash
npm install
```

## Dependencies

- **pptxgen**: PowerPoint file generation
- **axios**: HTTP client for Bible API
- **typescript**: Type safety and compilation
- **ts-node**: TypeScript execution in Node.js

## Usage

### Input File Format

Create a `service.txt` file in the root directory with the following format:

```
DATE: 2026-07-05
THEME: EBENEZER

OPENING PRAYER

PRAISE AND WORSHIP
HYMN - CHS 202
HYMN - CHS 14

BIBLE READING
Romans 3:23
John 3:16

SERMON

CLOSING PRAYER
```

### Generate PowerPoint

```bash
npm run build
npm run generate
```

This will create:
- `service.json` - Structured service data
- `output.pptx` - PowerPoint presentation

### Development Mode

```bash
npm run dev
```

## Configuration

### Hymn Database

The tool requires a `db.json` file containing hymn data:

```json
{
  "hymns": [
    {
      "number": "202",
      "title": "Jesus Loves Me",
      "verses": ["Verse 1 text...", "Verse 2 text..."],
      "chorus": "Chorus text..."
    }
  ]
}
```

### Bible API

The tool uses the free [Bible API](https://bible-api.com) to fetch Bible passages. No configuration required.

## Output

### service.json Structure

```json
{
  "metadata": {
    "date": "2026-07-05",
    "theme": "EBENEZER"
  },
  "sections": [
    {
      "type": "hymn",
      "chsNumber": 202,
      "title": "Jesus Loves Me",
      "slides": [...]
    },
    {
      "type": "bible_reading",
      "title": "Bible Reading",
      "passages": [...]
    }
  ]
}
```

### PowerPoint Output

The generated PowerPoint includes:
- **Hymn slides**: Title slide + one slide per verse/chorus
- **Bible slides**: Title slide + passage text split across slides
- **Section title slides**: Section headers (e.g., "SERMON", "OPENING PRAYER")

All slides have:
- White background
- Black text
- Centered alignment
- Professional sizing for display

## Development

### Building

```bash
npm run build
```

Compiles TypeScript to JavaScript in the `dist/` directory.

### Testing

```bash
npm test
```

## Extending

### Adding New Section Types

1. Define the type in `src/types/index.ts`
2. Add parsing logic in `src/parser/index.ts`
3. Add slide generation in `src/powerpoint/generator.ts`
4. Process in `src/services/service.builder.ts`

### Custom Templates

Pass a template path to `generatePowerPoint()` for branded presentations:

```typescript
await generatePowerPoint(serviceJson, 'output.pptx', 'template.pptx');
```

## License

ISC
