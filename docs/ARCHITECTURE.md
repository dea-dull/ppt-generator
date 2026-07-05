# Architecture

## Data Flow

```
service.txt
    ↓
  Parser (src/parser/index.ts)
    ↓
ParseResult
    ├── metadata
    ├── hymns[]
    ├── bibleReferences[]
    └── sections[]
    ↓
ServiceBuilder (src/services/service.builder.ts)
    ├── HymnService (retrieves hymn data)
    ├── BibleService (fetches Bible passages)
    └── Processes sections
    ↓
ServiceJson (service.json)
    ├── metadata
    └── sections[]
        ├── Hymn (with slides)
        ├── BibleReading (with passages and slides)
        └── SectionTitle
    ↓
PowerPointGenerator (src/powerpoint/generator.ts)
    ↓
output.pptx
```

## Core Services

### Parser (src/parser/index.ts)

**Responsibilities:**
- Read and parse `service.txt`
- Extract metadata (date, theme)
- Identify hymns (CHS numbers)
- Extract Bible references
- Identify section titles

**Output:** `ParseResult`

### HymnService (src/services/hymn.service.ts)

**Responsibilities:**
- Load hymn database from `db.json`
- Look up hymns by CHS number
- Generate slides from hymn data
  - Title slide with hymn number
  - One slide per verse
  - Chorus slide (if present)

**Output:** `Hymn` with slides

### BibleService (src/services/bible.service.ts)

**Responsibilities:**
- Fetch Bible passages from Bible API
- Split text into readable slides (max 7 lines per slide)
- Add Bible references to each slide

**Output:** `BiblePassage` with slides

### ServiceBuilder (src/services/service.builder.ts)

**Responsibilities:**
- Orchestrate hymn and Bible service calls
- Assemble complete `ServiceJson`
- Combine all sections in order

**Output:** `ServiceJson`

### PowerPointGenerator (src/powerpoint/generator.ts)

**Responsibilities:**
- Create PowerPoint presentation
- Process each section type:
  - Hymn: Generate slides for each verse/chorus
  - BibleReading: Generate slides for each passage
  - SectionTitle: Generate section header slides
- Apply consistent formatting and styling
- Save to file

**Output:** PowerPoint file (`.pptx`)

## Types

All core types are defined in `src/types/index.ts`:

```typescript
// Metadata
ServiceMetadata { date, theme }

// Slide components
HymnSlide { text, type: 'title'|'verse'|'chorus' }
BibleSlide { text, reference }

// Section types
Hymn { type, hymnNumber, chsNumber, title, verses, chorus, slides }
BibleReading { type, title, passages }
SectionTitle { type, title }

// Service document
ServiceJson { metadata, sections[] }
```

## Error Handling

- **Missing hymn**: Logged as warning, skipped in output
- **Failed Bible fetch**: Logged as error, skipped in output
- **Missing input file**: Exits with error
- **Invalid date format**: Logged as debug, continues

All errors are logged with context for debugging.

## Logging

Logger utility (`src/utils/logger.ts`) provides:
- `info()` - General information
- `debug()` - Detailed debugging info
- `warn()` - Non-critical issues
- `error()` - Critical failures

Configure level with `logger.setLevel(level)`.

## Extensibility

### Adding New Section Types

1. **Define type** in `src/types/index.ts`
2. **Add parsing** in `src/parser/index.ts`
3. **Process in builder** (if needs external data fetch)
4. **Add slide generation** in `src/powerpoint/generator.ts`

Example: Adding "Announcements" section:

```typescript
// types/index.ts
export interface Announcement {
  type: 'announcement';
  title: string;
  items: string[];
}

// parser/index.ts
if (line.toLowerCase().includes('announcements')) {
  result.announcements.push(line);
}

// powerpoint/generator.ts
else if (section.type === 'announcement') {
  this.addAnnouncementSlides(section as Announcement);
}
```

## Performance Considerations

- **Bible API calls**: Each unique reference fetches separately. Consider caching for repeated references.
- **Large hymn database**: Currently loads entire database into memory. Consider pagination for very large datasets.
- **Slide generation**: Processes sequentially. Consider parallelization for many sections.

## Testing Strategy

Test structure mirrors source structure:

```
test/
├── parser.test.ts
├── services/
│   ├── hymn.service.test.ts
│   ├── bible.service.test.ts
│   └── service.builder.test.ts
└── powerpoint/
    └── generator.test.ts
```

Use fixtures for:
- Sample `service.txt` files
- Mock hymn database
- Mock Bible API responses
