// @ts-check
/// <reference types="@prettier/plugin-pug/src/prettier" />

/**@type {import("prettier").Options} */
export default {
  semi: false,
  tabWidth: 2,
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  arrowParens: 'avoid',
  htmlWhitespaceSensitivity: 'ignore',

  plugins: ['@prettier/plugin-pug'],
}
