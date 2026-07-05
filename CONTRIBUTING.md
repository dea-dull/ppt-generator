# Contributing

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Build: `npm run build`
4. Test: `npm test`

## Development

### Running in Development Mode

```bash
npm run dev
```

This uses `ts-node` to run TypeScript directly without compilation.

### Building

```bash
npm run build
```

Compiles TypeScript to JavaScript in `dist/` directory.

### Testing

```bash
npm test
```

Run all tests in the `test/` directory.

```bash
npm run test:watch
```

Run tests in watch mode for development.

## Code Style

- Use TypeScript strict mode (enforced by `tsconfig.json`)
- Follow existing code patterns
- Use meaningful variable names
- Add comments for complex logic
- Keep functions focused and small

## Project Structure

```
src/
├── types/           # TypeScript interfaces
├── parser/          # Service order parsing
├── services/        # Business logic
├── powerpoint/      # Presentation generation
├── utils/           # Utilities
└── index.ts         # Entry point

test/               # Test files
docs/               # Documentation
examples/          # Example files
```

## Adding Features

1. **New section type**: Add type to `src/types/index.ts`, parsing to `src/parser/index.ts`, and generation to `src/powerpoint/generator.ts`
2. **New service**: Create in `src/services/`, export from `services/index.ts`
3. **New utility**: Create in `src/utils/`, keep focused on single responsibility

## Submitting Changes

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Write tests for new functionality
4. Ensure all tests pass: `npm test`
5. Build successfully: `npm run build`
6. Submit a pull request with clear description

## Testing Guidelines

- Write tests for new features
- Maintain test coverage above 70%
- Use descriptive test names
- Mock external services (Bible API, file I/O)
- Test error cases

## Debugging

Enable debug logging:

```typescript
import { logger } from './utils/logger';
logger.setLevel('debug');
```

## Performance

- Minimize API calls (consider caching)
- Optimize slide generation for large services
- Profile with large hymn databases

## Documentation

- Update README.md for user-facing changes
- Update ARCHITECTURE.md for structural changes
- Update CONFIGURATION.md for config changes
- Add comments to complex code sections
