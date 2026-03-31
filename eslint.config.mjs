import { FlatCompat } from '@eslint/eslintrc';
import tanstackQueryPlugin from '@tanstack/eslint-plugin-query';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {},
});

const eslintConfig = [
  {
    ignores: [
      // Folders
      '.vscode',
      'dist',
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'dist/**',
      '.vercel/**',
      'coverage/**',

      // Files
      '*.config.js',
      '*.config.mjs',
      '*.config.ts',
      '.env*',

      // Lock files
      'pnpm-lock.yaml',
      'yarn.lock',
      'package-lock.json',

      'public',
      'node_modules',
      'webpack.*.js',
      '**/*.scss',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      '@tanstack/query': tanstackQueryPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      '@typescript-eslint/no-unused-vars': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',

      '@tanstack/query/exhaustive-deps': 'error',
      '@tanstack/query/stable-query-client': 'error',
    },
  },
];

export default eslintConfig;
