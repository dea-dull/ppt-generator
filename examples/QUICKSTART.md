# Quick Start Guide

## Setup

1. **Copy example files** to project root:
   ```bash
   cp examples/service.txt .
   cp examples/db.json .
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build project**:
   ```bash
   npm run build
   ```

## Run

```bash
npm run generate
```

This will:
1. Parse `service.txt`
2. Load hymns from `db.json`
3. Generate `service.json`
4. Create `output.pptx`

## Customize

### Edit Service Order

Modify `service.txt`:

```
DATE: 2026-07-05
THEME: Your Theme

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

### Add Hymns

Edit `db.json` to add hymns:

```json
{
  "hymns": [
    {
      "number": "999",
      "title": "Your Hymn Title",
      "verses": [
        "Verse 1 text here...\n",
        "Verse 2 text here...\n"
      ],
      "chorus": "Chorus text here...\n",
      "category": "Category Name"
    }
  ]
}
```

### Change Bible Translation

Edit `src/services/bible.service.ts`:

```typescript
const DEFAULT_TRANSLATION = 'web';  // or 'bbe', 'ylt'
```

## Output

Generated files:
- `service.json` - Structured service data
- `output.pptx` - PowerPoint presentation

## Troubleshooting

**Hymn not found?**
- Check CHS number in `db.json` matches `service.txt`
- Verify hymn `number` is a string: `"202"` not `202`

**Bible fetch failed?**
- Check internet connection
- Verify Bible reference format: `Romans 3:23`, `John 3:16-18`
- Check supported translations (kjv, web, bbe, ylt)

**PowerPoint won't open?**
- Check file didn't get corrupted during generation
- Try regenerating with `npm run generate`
- Check file permissions in output directory

## Next Steps

- Read [ARCHITECTURE.md](../docs/ARCHITECTURE.md) for detailed design
- Read [CONFIGURATION.md](../docs/CONFIGURATION.md) for all options
- Check [README.md](../README.md) for full documentation
