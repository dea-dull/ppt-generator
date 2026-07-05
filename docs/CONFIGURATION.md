# Configuration Guide

## File Paths

All paths are relative to project root:

```typescript
const INPUT_SERVICE_FILE = 'service.txt';
const OUTPUT_SERVICE_JSON = 'service.json';
const OUTPUT_PPTX = 'output.pptx';
const HYMN_DB_FILE = 'db.json';
```

Modify in `src/index.ts` to change default paths.

## service.txt Format

### Supported Sections

The parser recognizes these section keywords (case-insensitive):

- `opening prayer`
- `praise and worship`
- `testimonies`
- `announcements`
- `bible reading`
- `intercessory prayer`
- `offering`
- `choir ministration`
- `sermon`
- `sunday message`
- `singspiration`
- `youth presentation`
- `interactive sunday school`
- `closing prayer`
- `benediction`

Add new keywords in `src/parser/index.ts`:

```typescript
const SECTION_KEYWORDS = [
  'opening prayer',
  'your new section',
  // ...
];
```

### Hymn Format

Recognized formats for hymn lines:

```
HYMN - CHS 202
HYMN CHS 202
HYMN: CHS 202
HYMN 202
```

Optional title after hymn number:

```
HYMN - CHS 202 Jesus Loves Me
```

### Bible Reference Format

Recognized formats:

```
BIBLE: Romans 3:23
Romans 3:23
John 3:16-18
Matthew 5:1-12
1 Corinthians 13:4-7
```

### Full Example

```
DATE: 2026-07-05
THEME: EBENEZER

OPENING PRAYER

PRAISE AND WORSHIP
HYMN - CHS 202 Jesus Loves Me
HYMN - CHS 14

BIBLE READING
Romans 3:23
John 3:16

SERMON

CLOSING PRAYER
```

## db.json Format

Hymn database structure:

```json
{
  "hymns": [
    {
      "number": "1",
      "title": "All Creatures of Our God and King",
      "verses": [
        "All creatures of our God and King,\nLift up your voice and with us sing...",
        "Thou rushing wind that art so strong...\n"
      ],
      "chorus": false,
      "sound": "audio_url_optional",
      "category": "Praise"
    },
    {
      "number": "202",
      "title": "Jesus Loves Me",
      "verses": [
        "Jesus loves me, this I know...\n",
        "Jesus loves me, He will stay...\n"
      ],
      "chorus": "Yes, Jesus loves me...\n",
      "category": "Children"
    }
  ]
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `number` | string | Yes | Hymn number (CHS) |
| `title` | string | Yes | Hymn title |
| `verses` | string[] | Yes | Array of verse texts |
| `chorus` | string\|false | Yes | Chorus text or `false` if none |
| `sound` | string | No | URL to audio file |
| `category` | string | No | Hymn category |

### Verse/Chorus Text Format

Use `\n` for line breaks:

```json
"Jesus loves me, this I know,\nFor the Bible tells me so..."
```

Will render as:
```
Jesus loves me, this I know,
For the Bible tells me so...
```

## Bible API Configuration

The tool uses the free Bible API. Configuration in `src/services/bible.service.ts`:

```typescript
const BIBLE_API_URL = 'https://bible-api.com';
const MAX_LINES_PER_SLIDE = 7;
const DEFAULT_TRANSLATION = 'kjv';
```

### Translation Options

Supported Bible translations:
- `kjv` - King James Version
- `web` - World English Bible
- `bbe` - Bible in Basic English
- `ylt` - Young's Literal Translation

Change default:

```typescript
const DEFAULT_TRANSLATION = 'web';
```

### Slide Breaking

Bible text is split into slides with max 7 lines per slide. Adjust:

```typescript
const MAX_LINES_PER_SLIDE = 10; // More text per slide
```

## PowerPoint Styling

Customize appearance in `src/powerpoint/generator.ts`:

### Font Sizes

```typescript
// Hymn title
fontSize: 44,

// Hymn text
fontSize: 40,

// Bible text
fontSize: 36,

// Section titles
fontSize: 48,
```

### Colors

```typescript
// Text color (hex)
color: '000000',  // Black
color: '666666',  // Gray (for references)

// Background
slide.background = { fill: 'FFFFFF' };  // White
```

### Alignment

```typescript
align: 'center',    // 'center' | 'left' | 'right'
valign: 'middle',   // 'top' | 'middle' | 'bottom'
```

## Environment Variables

Optionally use `.env` file:

```bash
SERVICE_FILE=service.txt
OUTPUT_JSON=service.json
OUTPUT_PPTX=output.pptx
HYMN_DB=db.json
BIBLE_TRANSLATION=kjv
LOG_LEVEL=info
```

Load in `src/index.ts` (requires `dotenv` package):

```typescript
import dotenv from 'dotenv';
dotenv.config();

const INPUT_SERVICE_FILE = process.env.SERVICE_FILE || 'service.txt';
```

## Troubleshooting

### Hymn not found

Check `db.json`:
- Verify `number` field matches CHS number
- Ensure number is a string: `"202"` not `202`

### Bible passage errors

Check reference format:
- Use standard book names: "Romans", "1 Corinthians"
- Include chapter:verse: "3:23" not "3.23"
- Supported range formats: "3:23-25" or "3:23,25"

### PowerPoint won't open

- Check file permissions
- Ensure output path exists and is writable
- Try different output filename

### Missing slides

Check logs:
- Run with `logger.setLevel('debug')`
- Look for "not found" or "failed to fetch" messages
- Verify input file format
