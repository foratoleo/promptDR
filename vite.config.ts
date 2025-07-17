import { cloudflareDevProxyVitePlugin as remixCloudflareDevProxy, vitePlugin as remixVitePlugin } from '@remix-run/dev';
import { vercelPreset } from '@vercel/remix/vite';
import UnoCSS from 'unocss/vite';
import { defineConfig, type ViteDevServer } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig((config) => {
  const isProduction = config.mode === 'production';
  const buildTime = process.env.VITE_BUILD_TIME || Date.now().toString();
  const buildId = process.env.VITE_BUILD_ID || `build-${buildTime}`;
  
  return {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BUILD_TIME': JSON.stringify(buildTime),
      'process.env.BUILD_ID': JSON.stringify(buildId),
      global: 'globalThis',
    },
    build: {
      target: 'esnext',
      sourcemap: false,
      minify: isProduction ? 'terser' : false,
      rollupOptions: {
        external: ['@webcontainer/api'],
        output: {
          sourcemap: false,
          sourcemapExcludeSources: false,
          format: 'esm',
          inlineDynamicImports: false,
        },
      },
    },
    optimizeDeps: {
      exclude: ['@webcontainer/api', 'istextorbinary'],
      include: ['path-browserify'],
    },
    resolve: {
      alias: {
        path: 'path-browserify',
      },
      fallback: {
        path: 'path-browserify',
      },
    },
    ssr: {
      noExternal: ['istextorbinary', '@radix-ui/react-collapsible', '@radix-ui/react-scroll-area'],
    },
    plugins: [
      nodePolyfills({
        include: ['buffer', 'process', 'util', 'stream'],
        globals: {
          Buffer: true,
          process: true,
          global: true,
        },
        protocolImports: true,
        exclude: ['child_process', 'fs', 'path'],
      }),
      {
        name: 'buffer-polyfill',
        transform(code, id) {
          if (id.includes('env.mjs')) {
            return {
              code: `import { Buffer } from 'buffer';\n${code}`,
              map: null,
            };
          }

          return null;
        },
      },
      {
        name: 'disable-sourcemap-warnings',
        configResolved(resolvedConfig) {
          // Force disable sourcemaps completely
          resolvedConfig.build.sourcemap = false;
          
          // Disable for rollup options
          if (resolvedConfig.build.rollupOptions) {
            if (!resolvedConfig.build.rollupOptions.output) {
              resolvedConfig.build.rollupOptions.output = {};
            }
            
            if (Array.isArray(resolvedConfig.build.rollupOptions.output)) {
              resolvedConfig.build.rollupOptions.output.forEach(output => {
                output.sourcemap = false;
              });
            } else {
              resolvedConfig.build.rollupOptions.output.sourcemap = false;
            }
          }
        },
        generateBundle(_options, bundle) {
          // Remove any sourcemap files that might have been generated
          for (const fileName in bundle) {
            if (fileName.endsWith('.map')) {
              delete bundle[fileName];
            }
          }
        },
        writeBundle(_options, bundle) {
          // Additional cleanup - ensure no sourcemap files are written
          for (const fileName in bundle) {
            if (fileName.endsWith('.map')) {
              delete bundle[fileName];
            }
          }
        },
      },
      config.command === 'serve' && config.mode !== 'test' && !process.env.VERCEL && remixCloudflareDevProxy(),
      remixVitePlugin({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
          v3_lazyRouteDiscovery: true,
        },
        presets: [vercelPreset()],
      }),
      UnoCSS(),
      tsconfigPaths(),
      chrome129IssuePlugin(),
      config.mode === 'production' && optimizeCssModules({ apply: 'build' }),
    ],
    envPrefix: [
      'VITE_',
      'OPENAI_LIKE_API_BASE_URL',
      'OLLAMA_API_BASE_URL',
      'LMSTUDIO_API_BASE_URL',
      'TOGETHER_API_BASE_URL',
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  };
});

function chrome129IssuePlugin() {
  return {
    name: 'chrome129IssuePlugin',
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req, res, next) => {
        const raw = req.headers['user-agent']?.match(/Chrom(e|ium)\/([0-9]+)\./);

        if (raw) {
          const version = parseInt(raw[2], 10);

          if (version === 129) {
            res.setHeader('content-type', 'text/html');
            res.end(
              '<body><h1>Please use Chrome Canary for testing.</h1><p>Chrome 129 has an issue with JavaScript modules & Vite local development, see <a href="https://github.com/stackblitz/bolt.new/issues/86#issuecomment-2395519258">for more information.</a></p><p><b>Note:</b> This only impacts <u>local development</u>. `pnpm run build` and `pnpm run start` will work fine in this browser.</p></body>',
            );

            return;
          }
        }

        next();
      });
    },
  };
}