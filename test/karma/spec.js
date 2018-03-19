/* global  assert, riot */
/* eslint-env browser, node */

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

let tag;

describe('browser-side specs', () => {

  before(() => {
    let html = document.createElement('spec');
    document.body.appendChild(html);

    const riotI18nlet = window.riotI18nlet.init({debug: true});
    riotI18nlet.loads(data);

    tag = riot.mount('spec')[0];
  });

  it('mount spec.tag', () => {
    assert.equal('riot-i18nlet program output', document.querySelectorAll('h1')[0].textContent);

    assert.equal('function', typeof tag.i);
    assert.equal(2, document.querySelectorAll('riot-i18nlet').length);
    assert.equal('object', typeof tag.riotI18nlet);

    assert('Hello {{name}} {{emoji.happy}}', tag.i('hello'));
    assert('Hello fkei {{emoji.happy}}', tag.i('hello', {name: 'fkei'}));
    assert('Hello fkei :)', tag.i('hello', {name: 'fkei'}, {ref: true}));

  });
});
