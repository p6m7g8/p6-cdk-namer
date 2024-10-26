import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '*.md',
    '.vscode/',
    '.github/',
    '.mergify.yml',
    'assets/',
    'cdk.json',
    'tsconfig.json',
    'tsconfig.dev.json',
    'package.json',
  ],
  plugins: {
  },
  languageOptions: {
  },
  rules: {
    'no-new': 'off',
    'no-console': 'off',
  },
  settings: {
  },
})
