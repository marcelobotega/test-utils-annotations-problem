/**
 * This test should run ONLY in jsdom environment (fast, lightweight)
 */
import { describe, expect, it } from 'vitest';

describe('Simple jsdom test (no annotation)', () => {
  it('should have window object', () => {
    expect(window).toBeDefined();
    expect(document).toBeDefined();
  });

  it('should have document object', () => {
    expect(document.body).toBeDefined();
    expect(document.createElement).toBeDefined();
  });

  it('performs basic DOM operations', () => {
    const div = document.createElement('div');
    div.textContent = 'Hello from jsdom';
    document.body.appendChild(div);
    expect(div.textContent).toBe('Hello from jsdom');
    expect(document.body.contains(div)).toBe(true);
  });
});
