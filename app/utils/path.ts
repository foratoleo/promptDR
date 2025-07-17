// Browser-compatible path utilities
import type { ParsedPath } from 'path';
import { path as pathPolyfill } from './path-polyfill';

/**
 * A browser-compatible path utility that mimics Node's path module
 * Using custom polyfill for consistent behavior in browser environments
 */
export const path = {
  join: (...paths: string[]): string => pathPolyfill.join(...paths),
  dirname: (path: string): string => pathPolyfill.dirname(path),
  basename: (path: string, ext?: string): string => pathPolyfill.basename(path, ext),
  extname: (path: string): string => pathPolyfill.extname(path),
  relative: (from: string, to: string): string => pathPolyfill.relative(from, to),
  isAbsolute: (path: string): boolean => pathPolyfill.isAbsolute(path),
  normalize: (path: string): string => pathPolyfill.normalize(path),
  parse: (path: string): ParsedPath => {
    const ext = pathPolyfill.extname(path);
    const base = pathPolyfill.basename(path);
    const name = pathPolyfill.basename(path, ext);
    const dir = pathPolyfill.dirname(path);
    const root = pathPolyfill.isAbsolute(path) ? '/' : '';

    return { root, dir, base, ext, name };
  },
  format: (pathObject: ParsedPath): string => {
    const { dir, base, name, ext } = pathObject;

    if (base) {
      return dir ? pathPolyfill.join(dir, base) : base;
    }

    return dir ? pathPolyfill.join(dir, name + ext) : name + ext;
  },
} as const;
