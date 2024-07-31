import preset_env from 'postcss-preset-env'

// postcss-preset-env 包含 autoprefixer

/**@type {import("postcss-load-config").Config} */
export default {
  plugins: [preset_env()],
}
