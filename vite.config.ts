import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	plugins: [
		vue(),
		viteStaticCopy({
			targets: [
				{
					src: 'src/Breadcrumb.vue',
					dest: './',
				},
			],
		}),
		dts({
			include: ['src/**/*'],
			insertTypesEntry: true,
			rollupTypes: true,
			outDir: 'dist/types',
		}),
	],
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'VitepressPluginBreadcrumb',
			fileName: (format: string) =>
				format === 'es' ? `vitepress-plugin-breadcrumb.${format}.mjs` : `vitepress-plugin-breadcrumb.${format}.js`,
			formats: ['es', 'umd'],
		},
		rollupOptions: {
			external: ['vue', 'vitepress', 'vitepress/client', 'vitepress/theme', '@localSearchIndex', '@siteData'],
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
