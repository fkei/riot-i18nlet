/* eslint-env node, mocha */

const
  buble = require('rollup-plugin-buble'),
  nodeResolve = require('rollup-plugin-node-resolve'),
  commonjs = require('rollup-plugin-commonjs'),
  banner = require('../../rollup.vars').banner,
  riot = require('rollup-plugin-riot'),
  intro = require('../../rollup.vars').intro;

var debug = !!process.env.DEBUG;


let namedExports = {
};


module.exports = config => {
  config.set({
    autoWatch: true,
    // client: { captureConsole: false },
    browsers: [
      'Chrome',
      //'Firefox',
      //'Safari'
    ],
    browserConsoleLogOptions: {
      level: 'error',
      format: '%b %T: %m',
      terminal: false
    },
    colors: true,
    files: [
      '../../node_modules/riot/riot.js',
      '../../src/index.js',
      '../index.js',
      'spec.js',
      'spec.tag',
    ],
    frameworks: ['mocha', 'power-assert', 'riot'],
    logLevel: config.LOG_DEBUG,
    //logLevel: config.LOG_ERROR,
    plugins: [
      //'karma-rollup-plugin',
      'karma-rollup-preprocessor',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-power-assert',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      'karma-coverage',
      'karma-riot'
    ],
    preprocessors: {
      '../../src/index.js': ['rollup', 'coverage'],
      'spec.js': ['rollup'],
      '../index.js': ['rollup'],
      'spec.tag': ['riot'],
    },
    reporters: ['mocha', 'coverage'],
    rollupPreprocessor: {
      // context: 'this',
      format: 'iife',
      moduleName: 'riotI18nlet',
      globals: {
        riot: 'riot'
      },
      banner: banner,
      intro: intro,
      external: ['riot'],
      plugins: [
        riot(),
        nodeResolve({
          jsnext: true,
          main: true,
          browser: true
        }),
        commonjs({
          include: 'node_modules/**',
          namedExports: namedExports
        }),
        buble()
      ],
      sourceMap: false // 'inline'
    },
    singleRun: !debug,
  });
};
