<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme';
import type { PropType, Ref } from 'vue';
import { onContentUpdated, useData, withBase } from 'vitepress/client';
import { useLayout } from 'vitepress/theme';
import { computed, ref } from 'vue';

const props = defineProps({
	breadcrumb: {
		type: [Boolean, Object] as PropType<boolean | { homeText?: string; homeLink: string }>,
		default: false,
		validator: (value: unknown) => {
			// 类型验证
			if (typeof value === 'boolean')
				return true;
			return typeof value === 'object' && value !== null && 'homeLink' in value;
		},
	},
});

// 客户端检查，避免在 SSR 期间调用 VitePress API
const isClient = typeof window !== 'undefined';

const vpData = computed(() => {
	if (!isClient)
		return { frontmatter: { value: {} }, page: { value: { filePath: '' } } };
	return useData();
});

const vpLayout = computed(() => {
	if (!isClient)
		return { sidebar: { value: [] } };
	return useLayout();
});

const { frontmatter, page } = vpData.value;
const { sidebar } = vpLayout.value;
const breadcrumbHtml: Ref<string> = ref('');
const gtSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><polygon points="79.093,0 48.907,30.187 146.72,128 48.907,225.813 79.093,256 207.093,128" /></svg>`;

const breadcrumb = (frontmatter.value as any).breadcrumb !== undefined ? (frontmatter.value as any).breadcrumb : props.breadcrumb;
const breadcrumbHomeLink = typeof breadcrumb === 'object' ? breadcrumb.homeLink : undefined;
const breadcrumbHomeText = typeof breadcrumb === 'object' ? breadcrumb.homeText : undefined;

if (breadcrumb === true || typeof breadcrumbHomeLink === 'string') {
	function isExternalLink(link: string): boolean {
		return /^[a-z]+:/i.test(link) || link.startsWith('//');
	}

	function normalizeContentPath(filePath: string): string {
		if (isExternalLink(filePath) || filePath.startsWith('#')) {
			return filePath;
		}

		const [pathname] = filePath.split(/[?#]/, 1);
		filePath = pathname;

		if (!filePath.startsWith('/')) {
			filePath = `/${filePath}`;
		}
		if (filePath.endsWith('.md')) {
			filePath = filePath.slice(0, filePath.length - 3);
		}
		if (filePath.endsWith('/index')) {
			filePath = filePath.slice(0, filePath.length - 5);
		}
		return filePath;
	}

	function resolveBreadcrumbHref(link: string): string {
		if (isExternalLink(link) || link.startsWith('#')) {
			return link;
		}

		return withBase(link) + (link.endsWith('/') ? '' : '.html');
	}

	let breadcrumbItems: Array<{ text?: string; link?: string }> = [];
	function resolveMatchedLink(filePath: string, items: Array<DefaultTheme.SidebarItem>): true | undefined {
		for (const item of items) {
			const normalizedLink = item.link ? normalizeContentPath(item.link) : undefined;
			breadcrumbItems.push({ text: item.text, link: normalizedLink });
			if (normalizedLink === filePath) {
				return true;
			}
			else if (item.items && item.items.length >= 1) {
				if (resolveMatchedLink(filePath, item.items)) {
					return true;
				}
			}
			breadcrumbItems = breadcrumbItems.slice(0, breadcrumbItems.length - 1);
		}
		return undefined;
	}

	const generateBreadcrumb = (): void => {
		const filePath = normalizeContentPath(page.value.filePath);
		breadcrumbItems = [];
		if (typeof breadcrumb === 'object' && typeof breadcrumbHomeLink === 'string') {
			breadcrumbItems.push({ text: breadcrumbHomeText || '🏠', link: normalizeContentPath(breadcrumbHomeLink) });
		}
		resolveMatchedLink(filePath, sidebar.value);
		let breadcrumbHtmlStr = '';
		if (breadcrumbItems.length >= 2) {
			for (const [index, breadcrumbItem] of breadcrumbItems.entries()) {
				if (breadcrumbItem.link && index < breadcrumbItems.length - 1) {
					breadcrumbHtmlStr += `<div class="breadcrumb-item"><span><a href="${resolveBreadcrumbHref(breadcrumbItem.link)}">${breadcrumbItem.text}</a></span></div>`;
				}
				else if (index === breadcrumbItems.length - 1) {
					breadcrumbHtmlStr += `<div class="breadcrumb-item breadcrumb-item-current"><span>${breadcrumbItem.text}</span></div>`;
				}
				else {
					breadcrumbHtmlStr += `<div class="breadcrumb-item"><span>${breadcrumbItem.text}</span></div>`;
				}
				if (index < breadcrumbItems.length - 1) {
					breadcrumbHtmlStr += `<div class="breadcrumb-symbol">${gtSvg}</div>`;
				}
			}
		}
		breadcrumbHtml.value = breadcrumbHtmlStr;
	};
	generateBreadcrumb();

	if (isClient) {
		onContentUpdated(generateBreadcrumb);
	}
}
else {
	breadcrumbHtml.value = '';
}
</script>

<template>
	<div v-if="breadcrumb === true || typeof breadcrumbHomeLink === 'string'" class="breadcrumb" v-html="breadcrumbHtml" />
</template>

<style>
.breadcrumb {
	margin-bottom: 20px;
	display: block;
}

.breadcrumb .breadcrumb-item {
	display: inline-block;
	align-content: center;
	font-size: small; /* 13px */
	padding-top: 3px;
	padding-bottom: 3px;
	padding-left: 12px;
	padding-right: 12px;
	border-radius: 20px;
}

.breadcrumb .breadcrumb-item:has(a):hover {
	background-color: var(--vp-custom-block-info-bg);
	color: var(--vp-c-brand-1);
}

.breadcrumb .breadcrumb-item span a {
	font-weight: 500;
	transition:
		color 0.25s,
		opacity 0.25s;
	touch-action: manipulation;
}

.breadcrumb .breadcrumb-item-current {
	background-color: var(--vp-custom-block-info-bg);
}

.breadcrumb .breadcrumb-item-current span {
	color: var(--vp-c-brand-1);
}

.breadcrumb .breadcrumb-symbol {
	display: inline-block;
	padding-left: 7px;
	padding-right: 7px;
	opacity: 0.5;
	height: 9px;
	width: 22px;
	fill: var(--vp-c-text-2);
}

@media (max-width: 640px) {
	.breadcrumb {
		display: none;
	}
}
</style>
