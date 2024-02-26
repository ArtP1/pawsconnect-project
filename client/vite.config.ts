import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// This function is called by Vite to configure the project.
// mode parameter represents the current mode Vite is running in (development, production, etc.).
export default ({ mode }: { mode: string }) => {
  // Load environment variables based on the current mode.
  const env = loadEnv(mode, process.cwd(), '');

  // Use the loaded environment variables to configure Vite.
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
};
