// vite.config.js
import legacy from '@vitejs/plugin-legacy'

export default {
  plugins: [
    legacy({
      targets: ['defaults', 'IE 11'],
      // polyfills: ['es.promise.finally', 'es/map', 'es/set'],
      // modernPolyfills: ['es.promise.finally'],
    }),
  ],
}