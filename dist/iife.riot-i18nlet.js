/* riot-i18nlet version 0.2.5 */
var riotI18nlet = (function (riot,I18nlet) {
  'use strict';

  var VERSION = "0.2.5";

  riot = riot && riot.hasOwnProperty('default') ? riot['default'] : riot;
  I18nlet = I18nlet && I18nlet.hasOwnProperty('default') ? I18nlet['default'] : I18nlet;

  riot.tag2('riot-i18nlet', '<span>{message}</span>', '', 'class="{opts.class}" riot-style="{opts.style}"', function(opts) {
      this.message = this[this.riotI18nlet.settings.getMessageFunctionName](opts.context, opts.vals, opts.options);

      this.on('update', function () {
        this.message = this[this.riotI18nlet.settings.getMessageFunctionName](opts.context, opts.vals, opts.options);
      });
  });

  /*global VERSION*/

  /**
   * @class RiotI18nlet
   */
  var RiotI18nlet = (function (I18nlet$$1) {
    function RiotI18nlet () {
      I18nlet$$1.apply(this, arguments);
    }

    if ( I18nlet$$1 ) RiotI18nlet.__proto__ = I18nlet$$1;
    RiotI18nlet.prototype = Object.create( I18nlet$$1 && I18nlet$$1.prototype );
    RiotI18nlet.prototype.constructor = RiotI18nlet;

    RiotI18nlet.prototype.init = function init (settings) {
      I18nlet$$1.prototype.init.call(this, settings);
      this.version = "riot-i18nlet: " + VERSION + ", i18nlet: " + (this.version);

      // register a mixin globally.
      var mixinOptions = {};
      var self = this;
      mixinOptions[this.settings.getMessageFunctionName] = function () {
        return self[self.settings.getMessageFunctionName].apply(self, arguments);
      };
      mixinOptions.riotI18nlet = this;

      riot.mixin(mixinOptions);
      return this;
    };

    return RiotI18nlet;
  }(I18nlet));

  var index = new RiotI18nlet();

  return index;

}(riot,I18nlet));
//# sourceMappingURL=iife.riot-i18nlet.js.map
