'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

var _lodash = require('lodash');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StyleFinder = function () {
  function StyleFinder(theme) {
    _classCallCheck(this, StyleFinder);

    this.theme = theme;
  }

  _createClass(StyleFinder, [{
    key: 'getStyle',
    value: function getStyle(style, component) {
      if ((0, _lodash.isFunction)(style)) {
        return style(component);
      } else {
        return style;
      }
    }

    // Text

  }, {
    key: 'getByType',
    value: function getByType(displayName) {
      return this.getStyle((0, _lodash.get)(this.theme, displayName));
    }

    // styleName

  }, {
    key: 'getByStyleName',
    value: function getByStyleName(styleName) {
      return this.getStyle((0, _lodash.get)(this.theme, styleName));
    }

    // styleName[2]

  }, {
    key: 'getByStyleNameAndIndex',
    value: function getByStyleNameAndIndex(styleName, index) {
      return this.getStyle((0, _lodash.get)(this.theme, styleName + '[' + index + ']'));
    }
  }, {
    key: 'getByParentStyleName',
    value: function getByParentStyleName(parentStyle, displayName, styleName) {
      return _extends({}, this.getStyle((0, _lodash.get)(this.theme, parentStyle + ' *')), this.getStyle((0, _lodash.get)(this.theme, parentStyle + ' ' + displayName)), this.getStyle((0, _lodash.get)(this.theme, parentStyle + ' ' + styleName)));
    }
  }, {
    key: 'getByParentStyleNameAndIndex',
    value: function getByParentStyleNameAndIndex(parentStyle, displayName, styleName, index) {
      return _extends({}, this.getStyle((0, _lodash.get)(this.theme, parentStyle + ' *[' + index + ']')), this.getStyle((0, _lodash.get)(this.theme, parentStyle + ' ' + displayName + '[' + index + ']')), this.getStyle((0, _lodash.get)(this.theme, parentStyle + ' ' + styleName + '[' + index + ']')));
    }
  }, {
    key: 'findStyleForComponent',
    value: function findStyleForComponent(component, parent, index) {
      var displayName = (0, _utils.getDisplayName)(component);
      var componentStyleName = (0, _lodash.get)(component, 'props.styleName');
      var parentStyleName = (0, _lodash.get)(parent, 'props.styleName');

      return _extends({}, this.getByType(displayName), this.getByParentStyleName(parentStyleName, displayName, componentStyleName), this.getByParentStyleNameAndIndex(parentStyleName, displayName, componentStyleName), this.getByStyleName(componentStyleName), this.getByStyleNameAndIndex(componentStyleName));
    }
  }]);

  return StyleFinder;
}();

exports.default = StyleFinder;