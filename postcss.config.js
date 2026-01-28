module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 3,
      browsers: 'last 2 versions'
    }),
    require('autoprefixer'),
    require('cssnano')({ preset: 'default' })
  ]
}
