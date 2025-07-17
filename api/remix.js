import { createRequestHandler } from '@remix-run/vercel';

let handler;

export default async function (req, res) {
  if (!handler) {
    try {
      // Importação dinâmica do build do servidor
      const build = await import('../build/server/index.js');
      handler = createRequestHandler({
        build: build.default || build,
        mode: process.env.NODE_ENV || 'production',
      });
    } catch (error) {
      console.error('Error loading Remix build:', error);
      return res.status(500).json({ 
        error: 'Server build not found',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }

  return handler(req, res);
}