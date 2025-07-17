// Simple path polyfill for browser environment
export const path = {
  join: (...args: string[]): string => {
    return (
      args
        .filter((arg) => arg && typeof arg === 'string')
        .join('/')
        .replace(/\/+/g, '/')
        .replace(/\/$/, '') || '/'
    );
  },

  resolve: (...args: string[]): string => {
    let resolvedPath = '';
    let resolvedAbsolute = false;

    for (let i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      const path = i >= 0 ? args[i] : '/';

      if (!path) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charAt(0) === '/';
    }

    resolvedPath = resolvedPath.replace(/\/+/g, '/').replace(/\/$/, '') || '/';

    return resolvedAbsolute ? resolvedPath : '/' + resolvedPath;
  },

  dirname: (path: string): string => {
    const parts = path.split('/');
    parts.pop();

    return parts.join('/') || '/';
  },

  basename: (path: string, ext?: string): string => {
    const base = path.split('/').pop() || '';

    if (ext && base.endsWith(ext)) {
      return base.slice(0, -ext.length);
    }

    return base;
  },

  extname: (path: string): string => {
    const base = path.split('/').pop() || '';
    const dotIndex = base.lastIndexOf('.');

    return dotIndex > 0 ? base.slice(dotIndex) : '';
  },

  isAbsolute: (path: string): boolean => {
    return path.charAt(0) === '/';
  },

  relative: (from: string, to: string): string => {
    const fromParts = from.split('/').filter(Boolean);
    const toParts = to.split('/').filter(Boolean);

    let i = 0;

    while (i < fromParts.length && i < toParts.length && fromParts[i] === toParts[i]) {
      i++;
    }

    const upLevels = fromParts.length - i;
    const downParts = toParts.slice(i);

    return Array(upLevels).fill('..').concat(downParts).join('/') || '.';
  },

  normalize: (path: string): string => {
    const parts = path.split('/');
    const normalized: string[] = [];

    for (const part of parts) {
      if (part === '..') {
        normalized.pop();
      } else if (part && part !== '.') {
        normalized.push(part);
      }
    }

    return normalized.join('/') || '/';
  },

  sep: '/',
  delimiter: ':',
  posix: {} as any,
  win32: {} as any,
};

// Set posix and win32 to reference the same object for compatibility
path.posix = path;
path.win32 = path;

// Export individual functions for compatibility with libraries that import them directly
export const join = path.join;
export const dirname = path.dirname;
export const basename = path.basename;
export const extname = path.extname;
export const isAbsolute = path.isAbsolute;
export const relative = path.relative;
export const normalize = path.normalize;
export const resolve = path.resolve;
export const sep = path.sep;
export const delimiter = path.delimiter;
export const posix = path.posix;
export const win32 = path.win32;

export default path;
