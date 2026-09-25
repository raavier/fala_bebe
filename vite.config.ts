/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // Caminhos relativos: o app funciona em raavier.github.io/fala_bebe/ e em qualquer outra pasta.
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Fala, bebê!',
        short_name: 'Fala, bebê!',
        description: 'Guia interativo para estimular a fala do bebê dentro da rotina.',
        lang: 'pt-BR',
        start_url: './',
        scope: './',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#FBF5EC',
        theme_color: '#FBF5EC',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        // Só as fontes com os caracteres do português entram no cache offline
        globIgnores: ['**/*cyrillic*', '**/*vietnamese*', '**/*greek*']
      }
    })
  ],
  test: {
    include: ['src/**/*.test.ts']
  }
});
