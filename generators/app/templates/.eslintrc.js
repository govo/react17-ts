const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'prettier',
    'standard',
    'plugin:react/recommended',
    'plugin:promise/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react', 'react-hooks', 'unicorn', 'promise', '@typescript-eslint'
  ],
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/extensions': [
      ERROR,
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        json: 'never',
        js: 'never'
      }
    ],
    'unicorn/prefer-query-selector': OFF,
    'unicorn/filename-case': [
      ERROR,
      {
        cases: {
          // 中划线
          kebabCase: false,
          // 小驼峰
          camelCase: true,
          // 下划线
          snakeCase: false,
          // 大驼峰
          pascalCase: true
        }
      }
    ],
    'comma-dangle': [ERROR, 'never'],
    '@typescript-eslint/ban-ts-ignore': OFF,
    '@typescript-eslint/no-explicit-any': ERROR,
    'no-use-before-define': OFF,
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    'react/react-in-jsx-scope': OFF, // for tsconfig.json jsx=react-jsx
    'react/jsx-uses-react': OFF
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': [WARN, {
          allowTypedFunctionExpressions: true
        }]
      }
    }
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.ts', '.js', '.json']
      }
    },
    react: {
      pragma: 'React',
      version: 'detect'
    }
  }
}
