/* eslint-env browser, node */

var assert;
var riotI18nlet;

if (typeof window === 'undefined') {
  assert = require('power-assert');
  riotI18nlet = require('../dist/cjs.riot-i18nlet');
} else {
  assert = window.assert;
  riotI18nlet = window.riotI18nlet;
}

const data = {
  ja: {
    'emoji.happy': ':)',
    hello: 'こんにちは {{name}} {{emoji.happy}}',
  },
  en: {
    'emoji.happy': ':)',
    hello: 'Hello {{name}} {{emoji.happy}}',
  },
};

describe('basic test case.', () => {

  it('new', () => {
    riotI18nlet.init();
    riotI18nlet.loads(data);
    assert.ok(!!riotI18nlet.k2v['ja:hello']);
  });

  it('get message i(context, vals, {ref, langage)', () => {
    riotI18nlet.init({langage: 'ja'});
    riotI18nlet.loads(data);

    assert.equal('Hello fkei :)', riotI18nlet.i('hello', {
      name: 'fkei',
    }, {
      ref: true,
    }));

    assert.equal(data.en.hello, riotI18nlet.i('hello', null, {
      langage: 'en',
      ref: false,
    }));
  });

});

