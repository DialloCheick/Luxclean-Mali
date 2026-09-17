import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function imagePersistencePlugin(): Plugin {
  const SLOT_TO_FILE: Record<string, string> = {
    brand_logo: 'luxclean-logo.jpg',
    hero_main: 'hero-action.png',
    ba_canape_before: 'sofa-before-clean.jpg',
    ba_canape_after: 'sofa-after-clean.jpg',
    ba_tapis_before: 'tapis-before.jpg',
    ba_tapis_after: 'tapis-after.jpg',
    ba_mosquee_before: 'mosquee-before.jpg',
    ba_mosquee_after: 'mosquee-after.jpg',
    ba_bureau_before: 'bureau-before.jpg',
    ba_bureau_after: 'bureau-after.jpg',
    service_tapis: 'tapis-after.jpg',
    service_mosquee: 'mosquee-after.jpg',
    service_bureau: 'bureau-after.jpg',
    service_canapes: 'sofa-after-clean.jpg',
    service_matelas: 'matelas-clean.jpg',
    service_auto: 'interieur-auto.png',
    tiktok_1: 'tiktok-video-thumbnail.jpg',
    tiktok_2: 'tiktok-video-thumbnail-2.jpg',
    tiktok_3: 'tiktok-video-thumbnail-3.jpg',
    tiktok_4: 'tiktok-video-thumbnail-4.jpg',
  };

  return {
    name: 'vite-image-persistence',
    configureServer(server) {
      server.middlewares.use('/api/save-site-image', (req, res, next) => {
        if (req.method !== 'POST') {
          return next();
        }

        const chunks: Buffer[] = [];
        req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        req.on('end', () => {
          try {
            const rawBody = Buffer.concat(chunks).toString('utf-8');
            const { slotId, dataUrl } = JSON.parse(rawBody);

            if (!slotId || !dataUrl) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Missing slotId or dataUrl' }));
              return;
            }

            const fileName = SLOT_TO_FILE[slotId];
            if (!fileName) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: `Unknown slotId: ${slotId}` }));
              return;
            }

            const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');

            const publicDir = path.resolve(process.cwd(), 'public');
            if (!fs.existsSync(publicDir)) {
              fs.mkdirSync(publicDir, { recursive: true });
            }

            const publicFilePath = path.join(publicDir, fileName);
            fs.writeFileSync(publicFilePath, buffer);

            // Also keep companion files synchronized
            if (slotId === 'hero_main') {
              const altPath = path.join(publicDir, 'regenerated_image_1789578624366.png');
              fs.writeFileSync(altPath, buffer);
              const assetHeroPath = path.resolve(process.cwd(), 'src/assets/images/regenerated_image_1789578624366.png');
              if (fs.existsSync(path.dirname(assetHeroPath))) {
                fs.writeFileSync(assetHeroPath, buffer);
              }
            } else if (slotId === 'ba_canape_after' || slotId === 'service_canapes') {
              const assetSofaPath = path.resolve(process.cwd(), 'src/assets/images/sofa-after-clean.jpg');
              if (fs.existsSync(path.dirname(assetSofaPath))) {
                fs.writeFileSync(assetSofaPath, buffer);
              }
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, path: `/${fileName}` }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message || 'Internal server error' }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), imagePersistencePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
