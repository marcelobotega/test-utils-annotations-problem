import { defineVitestConfig } from '@nuxt/test-utils/config';
import { fileURLToPath } from 'node:url';

export default defineVitestConfig({
  test: {
    // Default environment for tests WITHOUT @vitest-environment annotation
    environment: 'jsdom',
    // Configure the nuxt environment for tests WITH @vitest-environment nuxt
    environmentOptions: {
      nuxt: {
        domEnvironment: 'jsdom',
        rootDir: fileURLToPath(new URL('.', import.meta.url)),
      },
    },
      include: [
      'test/**/*.{test,spec}.ts',
    ],
  },
});
