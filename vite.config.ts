import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		vue(),
		dts({
			include: ['src/**/*'],
			exclude: ['node_modules'],
			insertTypesEntry: true,
			rollupTypes: true,
			outDir: 'dist/types',
		}),
	],
	build: {
		lib: {
			entry: './src/index.ts',
			name: 'VitepressPluginBreadcrumb',
			fileName: (format) => `vitepress-plugin-breadcrumb.${format}.js`,
			formats: ['es', 'umd'],
		},
		rollupOptions: {
			external: ['vue', 'vitepress', '@localSearchIndex', '@siteData'],
			output: {
				globals: {
					vue: 'Vue',
					vitepress: 'Vitepress',
				},
				preserveModules: false,
			},
		},
		sourcemap: true,
		minify: 'terser',
	},
});
