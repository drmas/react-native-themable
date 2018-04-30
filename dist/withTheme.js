'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _themeProvider = require('./themeProvider');

var _themeProvider2 = _interopRequireDefault(_themeProvider);

var _utils = require('./utils');

var _styleFinder = require('./styleFinder');

var _styleFinder2 = _interopRequireDefault(_styleFinder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = withTheme = function withTheme(WrappedComponent) {
  var ThemedComponent = function (_React$Component) {
    _inherits(ThemedComponent, _React$Component);

    function ThemedComponent() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, ThemedComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ThemedComponent.__proto__ || Object.getPrototypeOf(ThemedComponent)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
        _this.unsubscribe = _themeProvider2.default.observe(_this.update);
      }, _this.update = function () {
        _this.forceUpdate();
      }, _this.componentWillUnmount = function () {
        _this.unsubscribe();
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ThemedComponent, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var styleFinder = new _styleFinder2.default(_themeProvider2.default.getCurrentTheme());
        var _props = styleFinder.findStyleForComponent(WrappedComponent);

        return _react2.default.createElement(
          WrappedComponent,
          _extends({}, this.props, _props, {
            style: [this.props.style, _props.style]
          }),
          _react2.default.Children.map(this.props.children, function (child, index) {
            var _props = styleFinder.findStyleForComponent(child, _this2, index);
            return _react2.default.cloneElement(child, _extends({}, _props, {
              style: [child.props.style, _props.style]
            }));
          })
        );
      }
    }]);

    return ThemedComponent;
  }(_react2.default.Component);

  ThemedComponent.displayName = (0, _utils.getDisplayName)(WrappedComponent);
  return ThemedComponent;
};