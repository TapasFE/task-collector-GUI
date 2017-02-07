var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}
  function generateLoaders (loaders) {
    loaders = loaders.map(loader => {
      if (typeof loader === 'string') {
        loader = { loader };
      } else {
        loader = Object.assign({}, loader);
      }
      if (options.sourceMap) {
        loader.options = Object.assign({}, loader.options, {
          sourceMap: true,
        });
      }
      return loader;
    });
    if (options.extract) {
      return ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: loaders,
      })
    } else {
      return [
        'style-loader',
        ...loaders,
      ]
    }
  }

  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  return {
    css: generateLoaders(['css-loader']),
    postcss: generateLoaders(['css-loader']),
    less: generateLoaders(['css-loader', 'less-loader']),
    sass: generateLoaders([
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          indentedSyntax: true,
        },
      },
    ]),
    scss: generateLoaders(['css-loader', 'sass-loader']),
    stylus: generateLoaders(['css-loader', 'stylus-loader']),
    styl: generateLoaders(['css-loader', 'stylus-loader'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var use = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use,
    })
  }
  return output
}
