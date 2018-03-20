/* riot-i18nlet version 0.2.2 */
'use strict';

var VERSION = "0.2.2";

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var riot = _interopDefault(require('riot'));

/* i18nlet version 0.0.5 */
var VERSION$1 = "0.0.5";

/*global VERSION*/

var debug = false;
var defaultLangage = 'en';
var variableKeyPrefix = '{{';
var variableKeySuffix = '}}';
var defaultNoConvertVariable = null;
var defaultText = '';
var defaultGetMessageFunctionName = 'i';
var defaultReference = true;

/**
 * console output
 *
 * @param {String} type level
 * @param {*} args output messages
 */
var _output = function (type) {
  var arguments$1 = arguments;

  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) { args[ len ] = arguments$1[ len + 1 ]; }

  args.unshift(("[" + (type.toUpperCase()) + "]"));
  args.unshift('[i18nlet]');

  try {
    console.log.apply(console, args); // eslint-disable-line
  } catch (e) {
    console.log(args); // eslint-disable-line
  }
};

var defaultLoad = function (langage, terms) {
  var this$1 = this;

  if (!this.store[langage]) {
    this.store[langage] = {};
  }
  Object.keys(terms).forEach(function (context) {
    this$1.store[langage][context] = terms[context];
  });
};

var defaultLoads = function (data) {
  var this$1 = this;

  Object.keys(data).forEach(function (v) {
    this$1.load(v, data[v]);
  });
};


/**
 * @class I18nlet
 */
var I18nlet = function I18nlet () {};

I18nlet.prototype.init = function init (settings) {
    var this$1 = this;
    if ( settings === void 0 ) { settings = {}; }

  this.version = VERSION$1 || '';
  this.store = {};

  ///
  this.settings = {};
  this.settings.currentLangage = this.settings.defaultLangage = settings.defaultLangage || defaultLangage;
  this.settings.debug = settings.debug || debug;

  this.settings.variableKeyPrefix = settings.variableKeyPrefix || variableKeyPrefix;
  this.settings.variableKeySuffix = settings.variableKeySuffix || variableKeySuffix;
  this.settings.noConvertVariable = settings.noConvertVariable || defaultNoConvertVariable;

  this.settings.reference = defaultReference;
  if ((typeof settings.reference) === 'boolean') {
    this.settings.reference = settings.reference;
  }

  this.settings.defaultText = defaultText;
  if ((typeof settings.defaultText) === 'string') {
    this.settings.defaultText = settings.defaultText;
  }

  this.settings.getMessageFunctionName = settings.getMessageFunctionName || defaultGetMessageFunctionName;
  this[this.settings.getMessageFunctionName] = this._i18nlet_get_message;

  this.regexpStr = (this.settings.variableKeyPrefix) + "(.+?)" + (this.settings.variableKeySuffix);
  this.regexp = new RegExp(this.regexpStr, 'g');

  this.logger = {};
  this.logger.output = settings.output || _output;
  /**
   * console debug output
   * @param {*} args
   */
  this.logger.debug = function () {
      var arguments$1 = arguments;

      var args = [], len = arguments.length;
      while ( len-- ) { args[ len ] = arguments$1[ len ]; }

    if (!this$1.settings.debug) {
      return;
    }
    args.unshift('DEBUG');
    this$1.logger.output.apply(null, args);
  };

  /**
   * console error output
   * @param {*} message
   */
  this.logger.error = function (message) {
    var err = new Error(("[i18nlet] " + message));
    this$1.logger.output.apply(null, ['ERROR', err]);
  };

  this.hook = {
    load: defaultLoad,
    loads: defaultLoads,
  };
  if (settings.hook && settings.hook.load) {
    this.logger.debug('hook load()');
    this.hook.load = settings.hook.load;
  }
  if (settings.hook && settings.hook.loads) {
    this.logger.debug('hook loads()');
    this.hook.loads = settings.hook.loads;
  }

  ///

  return this;
};


I18nlet.prototype.load = function load (/*langage, terms*/) {
  this.hook.load.apply(this, arguments);
  return this;
};

I18nlet.prototype.loads = function loads (/*data*/) {
  this.hook.loads.apply(this, arguments);
  return this;
};

I18nlet.prototype.changeLangage = function changeLangage (langage) {
  this.settings.currentLangage = langage || this.settings.defaultLangage;
};

I18nlet.prototype.currentLangage = function currentLangage () {
  return this.settings.currentLangage;
};

I18nlet.prototype._getDefaultText = function _getDefaultText (context, text, defaultText) {
  if ((typeof text) !== 'undefined' && text !== null) {
    return text;
  }
  this.logger.debug(("context not found. context:'" + context + "'"));

  if ((typeof defaultText) === 'string') {
    return defaultText;
  }
  return this.settings.defaultText;
};

I18nlet.prototype._i18nlet_get_message = function _i18nlet_get_message (context, vals, options) {
    var this$1 = this;
 // eslint-disable-line
  vals = vals || {};
  options = options || {};

  if ((typeof options.ref) === 'boolean') {
    options.ref = !!options.ref;
  } else {
    options.ref = this.settings.reference;
  }
  options.langage = options.langage ? options.langage : this.currentLangage();

  var langageStore = this.store[options.langage];
  if (!langageStore || !langageStore[context]) {
    return this._getDefaultText(context, null, options.defaultText);
  }

  var value = langageStore[context];

  if (!value) {
    this.logger.debug(("Context not found. '" + context + "'"));
  }

  var ret = value;
  var match;
  while (match = this.regexp.exec(ret)) { // eslint-disable-line
    var val = vals[match[1].trim()];
    if (!val) {
      this$1.logger.debug(("It can not convert the variable part. '" + (match[0]) + "' for '" + ret + "'"));
      ret = (typeof this$1.settings.noConvertVariable === 'string') ? ret.replace(match[0], this$1.settings.noConvertVariable) : ret;
      continue;
    }

    ret = ret.replace(match[0], val);
    this$1.regexp.lastIndex = 0;
  }

  if (!options.ref) {
    return ret;
  }

  var matchRef;
  while (matchRef = this.regexp.exec(ret)) { // eslint-disable-line
    var ctxRef = matchRef[1].trim();
    var valRef = langageStore[ctxRef];
    if (!valRef) {
      this$1.logger.debug(("It can not convert the constant part. '" + (matchRef[0]) + "' for '" + ret + "'"));
      ret = (typeof this$1.settings.noConvertVariable === 'string') ? ret.replace(matchRef[0], this$1.settings.noConvertVariable) : ret;
      continue;
    }

    ret = ret.replace(matchRef[0], valRef);
    this$1.regexp.lastIndex = 0;

  }

  return ret;

};

riot.tag2('riot-i18nlet', '<span>{message}</span>', '', 'class="{opts.class}" riot-style="{opts.style}"', function(opts) {
    this.message = this[this.riotI18nlet.settings.getMessageFunctionName](opts.context, opts.vals, opts.options);

    this.on('update', function () {
      debugger;
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

module.exports = index;
