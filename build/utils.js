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
  options = options || {}
  const cssLoaders = [
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins() {
          return [
            require('precss'),
            require('autoprefixer'),
          ];
        },
      },
    },
  ];
  return {
    css: generateLoaders(cssLoaders),
    postcss: generateLoaders(cssLoaders),
    less: generateLoaders(cssLoaders.concat(['less-loader'])),
    sass: generateLoaders(cssLoaders.concat([
      {
        loader: 'sass-loader',
        options: {
          indentedSyntax: true,
        },
      },
    ])),
    scss: generateLoaders(cssLoaders.concat(['sass-loader'])),
    stylus: generateLoaders(cssLoaders.concat(['stylus-loader'])),
    styl: generateLoaders(cssLoaders.concat(['stylus-loader'])),
  }
}

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
