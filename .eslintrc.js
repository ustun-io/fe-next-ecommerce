module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  ignorePatterns: [
    'node_modules', '.next', 'public', 'assets'
  ],
  plugins: ['simple-import-sort', 'import', 'unused-imports'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        'groups': [
          // Packages `react` and next related packages come first.
          ['^(react)(/.*|$)'],
          ['^(next)(/.*|$)'],
          // Internal packages.
          ['^(@|module)(/.*|$)'],
          ['^(@|shared)(/.*|$)'],
          ['^(@|store)(/.*|$)'],
          ['^(@|dto)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.?(scss|css)$']
        ]
      }
    ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'no-extra-semi': 'error'
  }
}
