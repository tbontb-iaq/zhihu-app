// @ts-check

const env = process.env.NODE_ENV,
  rule_level = env === 'production' ? 'warn' : 'off'

/**@type {import("eslint").ESLint.ConfigData} */
module.exports = {
  root: true,
  env: { node: true },
  parserOptions: { ecmaVersion: 2020 },
  extends: [
    './.eslintrc-auto-import.json',
    'plugin:vue/vue3-recommended',
    'plugin:vue-pug/vue3-recommended',

    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/eslint-config-typescript',
  ],
  rules: {
    'no-console': rule_level,
    'no-debugger': rule_level,
    'vue/no-deprecated-slot-attribute': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    'no-extra-semi': 'off',
    'vue/html-quotes': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': [
      'warn',
      { singleline: { max: 5 }, multiline: { max: 5 } },
    ],
  },
}
