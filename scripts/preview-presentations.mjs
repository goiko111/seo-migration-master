import { preview } from 'vite';

const server = await preview({
  preview: {
    host: '127.0.0.1', port: 4194, strictPort: true,
    headers: {
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; frame-src 'none'; form-action 'none'; base-uri 'self'; object-src 'none'",
    },
  },
});
server.printUrls();
console.log('Local presentation review. No external tracking, forms or backend connections.');
