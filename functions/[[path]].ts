import type { ServerBuild } from '@remix-run/cloudflare';
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';

export const onRequest: PagesFunction = async (context) => {
  let serverBuild: ServerBuild;
  
  try {
    // Importação dinâmica para evitar erro de TypeScript
    const buildModule = await import('../build/server' as any);
    serverBuild = buildModule as unknown as ServerBuild;
  } catch (error) {
    // Build não existe ainda, retorna resposta de erro
    return new Response('Server build not found. Please run `npm run build` first.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }

  const handler = createPagesFunctionHandler({
    build: serverBuild,
  });

  return handler(context);
};
