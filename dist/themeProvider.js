'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ThemeProvider = function () {
  function ThemeProvider() {
    _classCallCheck(this, ThemeProvider);

    this.currentTheme = null;
    this.observers = new Set();
  }

  _createClass(ThemeProvider, [{
    key: 'getCurrentTheme',
    value: function getCurrentTheme() {
      return this.currentTheme;
    }
  }, {
    key: 'setCurrentTheme',
    value: function setCurrentTheme(theme) {
      this.currentTheme = theme;

      this.observers.forEach(function (observer) {
        observer();
      });
    }
  }, {
    key: 'observe',
    value: function observe(observer) {
      var _this = this;

      if (!(0, _lodash.isFunction)(observer)) {
        return;
      }

      this.observers.add(observer);

      return function () {
        return _this.observers.delete(observer);
      };
    }
  }]);

  return ThemeProvider;
}();

exports.default = new ThemeProvider();