[English](#) | [简体中文](./README.zh-Hans.md)

# Vitepress Plugin Breadcrumb

Add Breadcrumb navigation to your Vitepress

🔗 [GitLab (Homepage)](https://gitlab.soraharu.com/XiaoXi/vitepress-plugin-breadcrumb) | 🔗 [GitHub](https://github.com/yanranxiaoxi/vitepress-plugin-breadcrumb)

## Installing

```shell
npm install vitepress-plugin-breadcrumb
```

## Add the plugin

In `.vitepress/theme/index.ts` file:

```typescript
import Breadcrumb from 'vitepress-plugin-breadcrumb';
import DefaultTheme from 'vitepress/theme';

export default {
	extends: DefaultTheme,

	Layout() {
		return h(DefaultTheme.Layout, null, {
			'doc-before': () => h(Breadcrumb, { breadcrumb: true }),
		});
	},
} satisfies Theme;
```

Vitepress's `doc-before` slot is used here to embed the Breadcrumb component at the top of the document.

## Options

### Global:

```typescript
type BreadcrumbOptions = {
	breadcrumb:
		| boolean
		| {
				homeLink: string;
				homeText?: string;
		  };
};
```

You can pass a Boolean value to the `breadcrumb` property, which indicates that breadcrumb navigation is enabled or disabled globally. Like:

```typescript
() => h(Breadcrumb, { breadcrumb: true }); // Enabled globally
```

Or specify a custom home page node in front of the breadcrumb:

```typescript
() => h(Breadcrumb, { breadcrumb: { homeLink: '/en/', homeText: 'Home' } }); // Add a link 'Home' to '/en/'
```

### Frontmatter:

For more information, see the description above:

```yaml
breadcrumb: true
```

```yaml
breadcrumb:
    homeLink: /en/
    homeText: Home
```

When Breadcrumb is enabled globally, you can disable it on a specific page:

```yaml
breadcrumb: false
```
