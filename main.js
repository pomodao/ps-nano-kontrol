(function() {
  "use strict";

  var _generator = null,
    _currentDocumentId = null,
    _config = null;

  var nanoKONTROL = require('korg-nano-kontrol'),
    actions = require('./actions.js'),
    appConfig = require('./app-config.json');

  var dlog = appConfig.debug ? (msg) => console.log(msg) : (msg) => null;

  /*********** INIT ***********/

  function init(generator, config) {
    _generator = generator;
    _config = config;

    dlog("initializing generator with config %j", _config);

    process.nextTick(connectKontrol);
  }

  /*********** EVENTS ***********/

  function connectKontrol() {
    var changedValues = {};

    nanoKONTROL.connect()
      .then(function(device) {
        dlog('connected! ' + device.name);

        // initial scripts
        sendJavascript([
          'app.foregroundColor = new HSBColor()',
          'app.backgroundColor = new HSBColor()',
        ].join(';'));

        // assign actions to the sliders
        if (appConfig.debug) {
          device.on('*:*', function(v) {
            dlog(this.event + ': ' + v);
          });
          device.on('*:*:*', function(v) {
            dlog(this.event + ': ' + v);
          });
        }
        for (let key of Object.keys(appConfig.mapping)) {
          device.on(key, function(rawValue) {
            // dlog(this.event + ': ' + rawValue);
            var action = actions[appConfig.mapping[key]];
            if (action.onChange) {
              var value = action.onChange(rawValue);
              if (typeof value === 'string') {
                sendJavascript(value);
              } else if (typeof value === 'number') {
                changedValues[key] = value;
              }
            }
          });
        }

        function onTimer() {
          var js = Object.keys(changedValues).map(function(key) {
            var action = actions[appConfig.mapping[key]];
            return action.onInterval ? action.onInterval(changedValues[key]) : '';
          }).join(';');
          if (js) {
            dlog(js);
            sendJavascript(js);
          }
          changedValues = {};
          setTimeout(onTimer, appConfig.interval);
        }

        onTimer();
      })
      .catch(function(err) {
        console.error(err);
      });
  }

  /*********** HELPERS ***********/

  function sendJavascript(str) {
    _generator.evaluateJSXString(str).then(
      function(result) {
        dlog(result);
      },
      function(err) {
        dlog(err);
      });
  }

  exports.init = init;

  // Unit test function exports
  exports._setConfig = function(config) {
    _config = config;
  };

}());
