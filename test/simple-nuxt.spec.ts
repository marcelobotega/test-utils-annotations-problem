/**
 * @vitest-environment nuxt
 *
 * This test should run ONLY in nuxt environment (slower, full runtime)
 * WITH @vitest-environment nuxt annotation = should use Nuxt environment
 */
import { describe, expect, it } from 'vitest';

describe('Simple Nuxt environment test (with annotation)', () => {
  it('should have Nuxt runtime available', () => {
    // These composables should work in Nuxt environment
    expect(useAppConfig).toBeDefined();
    expect(useRuntimeConfig).toBeDefined();
  });

  it('should be able to call useAppConfig', () => {
    const appConfig = useAppConfig();
    expect(appConfig).toBeDefined();
    expect(appConfig).toHaveProperty('nuxt');
  });

  it('should have Nuxt app context', () => {
    const nuxtApp = useNuxtApp();
    expect(nuxtApp).toBeDefined();
  });
});
