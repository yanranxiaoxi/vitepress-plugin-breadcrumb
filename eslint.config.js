import { defineFlatConfig, imports, vue } from '@bassist/eslint-config'
import unicorn from 'eslint-plugin-unicorn'

export default defineFlatConfig([
  ...imports,
  ...vue,
  {
    name: 'vitepress-plugin-breadcrumb',
    plugins: {
      unicorn,
    },
    rules: {
      // 保持与原有配置一致的规则
      'unicorn/filename-case': ['error', { case: 'kebabCase', ignore: [] }],
      'no-param-reassign': 'off',
      'no-console': 'warn',
      'no-alert': 'error',
    },
    ignores: [
      '/dist/',
      '/node_modules/',
      '.eslintcache',
      'debug.log',
      'cache/',
    ],
  },
])
