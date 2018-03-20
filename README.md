# :globe_with_meridians: riot-i18nlet

[![GitHub license](https://img.shields.io/github/license/fkei/riot-i18nlet.svg)](https://github.com/fkei/riot-i18nlet/blob/develop/LICENSE)
![Github All Releases](https://img.shields.io/github/downloads/fkei/riot-i18nlet/total.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/fkei/riot-i18nlet.svg)
![Travis CI](https://img.shields.io/travis/fkei/riot-i18nlet/develop.svg)

[![NPM](https://nodei.co/npm/riot-i18nlet.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/riot-i18nlet/)

Internationalization library for riotjs

<br />
<br />

## :musical_note: Features

- `<riot-i18n>` custom tag
- Shortcut access within tag using riot.mixin
- window.riotI18nlet direct access


## :book: Documentation

## :rocket: Install

### brower: script tag

Direct Download / CDN

```js
<script src="https://unpkg.com/riot-i18nlet/dist/iife.riot-i18nlet.js"></script>
```

### other release files

- [amd.riot-i18nlet.js](https://unpkg.com/riot-i18nlet/dist/amd.riot-i18nlet.js)
- [amd.riot-i18nlet.js.map](https://unpkg.com/riot-i18nlet/dist/amd.riot-riot-i18nlet.js.map)
- [amd.riot-i18nlet.min.js](https://unpkg.com/riot-i18nlet/dist/amd.i18nlet.min.js)
- [cjs.riot-i18nlet.js](https://unpkg.com/riot-i18nlet/dist/cjs.riot-i18nlet.js)
- [es.riot-i18nlet.js](https://unpkg.com/riot-i18nlet/dist/es.riot-i18nlet.js)
- [iife.riot-i18nlet.js](https://unpkg.com/riot-i18nlet/dist/iife.riot-i18nlet.js)
- [iife.riot-i18nlet.js.map](https://unpkg.com/riot-i18nlet/dist/iife.riot-i18nlet.js.map)
- [iife.riot-i18nlet.min.js](https://unpkg.com/riot-i18nlet/dist/iife.riot-i18nlet.min.js)

### NPM

```sh
npm install --save riot-i18nlet
```

### bower

```sh
bower install riot-i18nlet
```

### Custom Build

You will have to clone directly from GitHub and build riot-i18nlet yourself if you want to use the latest dev build.

```sh
git clone https://github.com/fkei/riot-i18nlet.git
npm install
npm run release

---

出力ファイル
├── dist
      ├── amd.riot-i18nlet.js
      ├── amd.riot-i18nlet.js.map
      ├── amd.riot-i18nlet.min.js
      ├── cjs.riot-i18nlet.js
      ├── es.riot-i18nlet.js
      ├── iife.riot-i18nlet.js
      ├── iife.riot-i18nlet.js.map
      └── iife.riot-i18nlet.min.js
```

## :checkered_flag: Getting started

### Custom tag `<riot-i18nlet>`

```html
<script src="https://unpkg.com/riot/riot"></script>
<script src="https://unpkg.com/riot-i18nlet/dist/iife.riot-i18nlet.js"></script>

<!-- HTML -->
<spec>
  <riot-i18nlet context="hello" vals="{ {name: 'fkei'} }" />
</spec>

<!-- Javascript -->
<script>
  var message = {
    ja: {
      'emoji.happy': ':)',
      hello: 'こんにちは {{name}} {{emoji.happy}}',
    },
    en: {
      'emoji.happy': ':)',
      hello: 'Hello {{name}} {{emoji.happy}}',
    },
  };
  var riotI18nlet = window.riotI18nlet.init();
  riotI18nlet.loads(message);

  // use custom tag for riot.js
  riot.mount('spec')[0];
</script>
```

### Javascript acccess

```js
var message = {
  ja: {
    'emoji.happy': ':)',
    hello: 'こんにちは {{name}} {{emoji.happy}}',
  },
  en: {
    'emoji.happy': ':)',
    hello: 'Hello {{name}} {{emoji.happy}}',
  },
};
var riotI18nlet = window.riotI18nlet.init();
riotI18nlet.loads(message);

// access
var message = riotI18nlet.i('hello', { name: 'fkei' });
console.log(message); // console panel > 'Hello fkei :)'
```


<br />
<br />

## Configuration

code : `window.riotI18nlet.init(settings)`

see [i18nlet init](https://github.com/fkei/i18nlet#i18nlet-init)

## :scroll: Releases

----

Detailed changes for each release are documented in the [releases](https://github.com/fkei/riot-i18nlet/releases).

<br />
<br />

## Develop

### eslint

```sh
npm run lint
```

### test (build, mocha and karma)

```sh
npm test
```

### build

```sh
# build
npm run build

# build and uglify
npm run release
```

### debug

```sh
# mocha
npm run mocha-dev

# karma
npm run karma-dev
```

<br />
<br />

## :copyright: License

[MIT](LICENSE)
