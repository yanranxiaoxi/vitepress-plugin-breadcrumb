[English](./README.md) | [简体中文](#)

# Vitepress Plugin Breadcrumb

为你的 Vitepress 添加面包屑导航

🔗 [GitLab (Homepage)](https://gitlab.soraharu.com/XiaoXi/vitepress-plugin-breadcrumb) | 🔗 [GitHub](https://github.com/yanranxiaoxi/vitepress-plugin-breadcrumb)

## 安装

```shell
npm install vitepress-plugin-breadcrumb
```

## 添加插件

在 `.vitepress/theme/index.ts` 文件内

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

此处使用了 Vitepress 的 `doc-before` 插槽将 Breadcrumb 组件嵌入到文档的顶端。

## 选项

### 全局：

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

您可以将布尔值传递给 `breadcrumb` 属性，这表示全局启用或禁用面包屑导航。例如：

```typescript
() => h(Breadcrumb, { breadcrumb: true }); // 全局启用
```

你还可以在面包屑导航前面指定一个自定义主页节点：

```typescript
() => h(Breadcrumb, { breadcrumb: { homeLink: '/en/', homeText: 'Home' } }); // 添加一个指向 '/en/' 的名为 'Home' 的节点
```

### Frontmatter：

更多的配置描述请参考上方内容：

```yaml
breadcrumb: true
```

```yaml
breadcrumb:
    homeLink: /en/
    homeText: Home
```

当 Breadcrumb 全局启用时，您可以在特定页面上禁用它：

```yaml
breadcrumb: false
```
