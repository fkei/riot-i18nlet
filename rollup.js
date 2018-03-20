/* global */
/* eslint-env node, mocha */

const
  rollup = require('rollup'),
  buble = require('rollup-plugin-buble'),
  nodeResolve = require('rollup-plugin-node-resolve'),
  commonjs = require('rollup-plugin-commonjs'),
  banner = require('./rollup.vars').banner,
  banner_bundle = require('./rollup.vars').banner_bundle, // eslint-disable-line
  riot = require('rollup-plugin-riot'),
  intro = require('./rollup.vars').intro;

let namedExports = {
};

// @see https://rollupjs.org/guide/en#javascript-api

// iife/amd
async function buildIifeAmd() {
  // create a bundle
  const bundle = await rollup.rollup({
    input: 'src/index.js',
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
    ]
  });
  await bundle.write({
    format: 'iife',
    name: 'riotI18nlet',
    globals: {
      riot: 'riot'
    },
    banner: banner,
    intro: intro,
    file: 'dist/iife.riot-i18nlet+i18nlet.js',
    sourcemap: true
  });
  await bundle.write({
    format: 'amd',
    banner: banner,
    intro: intro,
    file: 'dist/amd.riot-i18nlet+i18nlet.js',
    sourcemap: true
  });
}

buildIifeAmd();

// iife/amd (i18nlet no bundle)
async function buildIifeAmdNoBundle() {
  // create a bundle
  const bundle = await rollup.rollup({
    input: 'src/index.js',
    external: ['riot', 'i18nlet'],
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
    ]
  });
  await bundle.write({
    format: 'iife',
    name: 'riotI18nlet',
    globals: {
      riot: 'riot'
    },
    banner: banner,
    intro: intro,
    file: 'dist/iife.riot-i18nlet.js',
    sourcemap: true
  });
  await bundle.write({
    format: 'amd',
    banner: banner,
    intro: intro,
    file: 'dist/amd.riot-i18nlet.js',
    sourcemap: true
  });
}

buildIifeAmdNoBundle();

// es/cjs
async function buildEsCjs() {
  // create a bundle
  const bundle = await rollup.rollup({
    input: 'src/index.js',
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
    ]
  });
  await bundle.write({
    format: 'es',
    banner: banner,
    intro: intro,
    file: 'dist/es.riot-i18nlet.js'
  });
  await bundle.write({
    format: 'cjs',
    banner: banner,
    intro: intro,
    file: 'dist/cjs.riot-i18nlet.js'
  });
}

buildEsCjs();
