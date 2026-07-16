import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Project site: https://mickaellepicier.github.io/InterviewFlashcards/
export default defineConfig({
  base: '/InterviewFlashcards/',
  plugins: [react(), tailwindcss()],
});
