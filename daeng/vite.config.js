import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import imagemin from 'vite-plugin-imagemin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname 대체 코드
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// https://vite.dev/config/
export default defineConfig({
server: {
   https: {
    key: fs.readFileSync(path.resolve(__dirname, 'localhost+2-key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'localhost+2.pem')),
  },
  },
  plugins: [
    react(),
    imagemin({
      gifsicle: { optimizationLevel: 3 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 75 },
      webp: {
        quality: 75,
        lossless: false, // true: 무손실 압축 (파일 크기 클 수 있음)
      },
      pngquant: {
        quality: [0.7, 0.9], // PNG 압축 품질 범위 설정
        speed: 4,
      },
      svgo: {
        plugins: [
          { removeViewBox: false },
          { removeEmptyAttrs: false },
        ],
      },
    }),
  ],
  build: {
    assetsInlineLimit: 0, // base64 변환 방지 (모든 이미지를 파일로 유지)
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]", // 빌드 시 이미지 파일명 고유하게 유지
      },
    },
  },
})