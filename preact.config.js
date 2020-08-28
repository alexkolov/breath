export default (config, env, helpers, options) => {
  const rule = {
    test: /\.mp3$/,
    loader: 'file-loader'
  }
  config.module.rules.push(rule);
}