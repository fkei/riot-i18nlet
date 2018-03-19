/*global VERSION*/

import riot from 'riot';
import I18nlet from 'i18nlet';
import './riot-i18nlet.tag';

/**
 * @class RiotI18nlet
 */
class RiotI18nlet extends I18nlet {

  init(settings) {
    super.init(settings);
    this.version = `riot-i18nlet: ${VERSION}, i18nlet: ${this.version}`;

    // register a mixin globally.
    const mixinOptions = {};
    const self = this;
    mixinOptions[this.settings.getMessageFunctionName] = function () {
      return self[self.settings.getMessageFunctionName].apply(self, arguments);
    };
    mixinOptions.riotI18nlet = this;

    riot.mixin(mixinOptions);
    return this;
  }
}

export default new RiotI18nlet();
