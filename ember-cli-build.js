'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const isProduction = EmberApp.env() === 'production';

const purgeCSS = {
  module: require('@fullhuman/postcss-purgecss'),
  options: {
    content: [
      './app/index.html',
      './app/templates/**/*.hbs',
      './app/components/**/*.hbs',
    ],
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
  }
}

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    postcssOptions: {
      compile: {
        plugins: [
          require('postcss-import'),
          require('tailwindcss')('./app/tailwind/config.js'),
          // messes up code highlighting in snippets
          // ...isProduction ? [purgeCSS] : []
        ]
      }
    }
  });

  return app.toTree();
};
