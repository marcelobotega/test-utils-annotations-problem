# @nuxt/test-utils - Vitest Environment Annotations Issue Reproduction

This repository is a minimal reproduction demonstrating that `@vitest-environment` annotations are ignored in `@nuxt/test-utils@3.19.0+`, causing tests to run in both jsdom and nuxt environments simultaneously.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Tests (Demonstrates the Bug)

```bash
npm test
```

**You will see:**
```
✓ |nuxt| test/simple-nuxt.spec.ts (3 tests)
✓ |jsdom| test/simple-nuxt.spec.ts (3 tests)   ← Should NOT appear!
✓ |jsdom| test/app.spec.ts (1 test)
✓ |nuxt| test/app.spec.ts (1 test)             ← Should NOT appear!

Test Files  4 passed (6)  ← Should be (3), not (6)!
```

**What's wrong:** Tests run in BOTH environments instead of respecting the `@vitest-environment` annotation.

### 3. Compare with Working Version

```bash
npm install @nuxt/test-utils@3.18.0
npm test
```

**You will see (correct behavior):**
```
✓ test/without-annotation.spec.ts (3 tests)  ← jsdom only
✓ test/simple-nuxt.spec.ts (3 tests)    ← nuxt only
✓ test/app.spec.ts (1 test)             ← nuxt only

Test Files  3 passed (3)  ← Correct!
```

## Repository Structure

```
test/
├── without-annotation.spec.ts      # No annotation → should run in jsdom only
├── simple-nuxt.spec.ts        # @vitest-environment nuxt → should run in nuxt only
└── app.spec.ts                # @vitest-environment nuxt → should run in nuxt only

vitest.config.ts               # Minimal configuration
```

## Key Files

### Test Files

**`test/without-annotation.spec.ts`** - No annotation, should use default jsdom:
```typescript
import { describe, expect, it } from 'vitest';

describe('Simple jsdom test', () => {
  it('should have window object', () => {
    expect(window).toBeDefined();
  });
});
```

**`test/simple-nuxt.spec.ts`** - With annotation, should run in nuxt only:
```typescript
/**
 * @vitest-environment nuxt
 */
import { describe, expect, it } from 'vitest';

describe('Nuxt environment test', () => {
  it('should have Nuxt runtime', () => {
    expect(useAppConfig()).toBeDefined();
  });
});
```

### Configuration

**`vitest.config.ts`**:
```typescript
import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    environment: 'jsdom',
    environmentOptions: {
      nuxt: {
        domEnvironment: 'jsdom',
        rootDir: fileURLToPath(new URL('.', import.meta.url)),
      },
    },
  },
});
```
