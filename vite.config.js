import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log(`current build mode: ${mode}`);
  return {
    plugins: [react()],
  };
});
