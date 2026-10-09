import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// В сборку попадает только index.html. sandbox.html живёт лишь в dev-сервере.
export default defineConfig({
	plugins: [react()],
	server: { port: 5180 },
});
