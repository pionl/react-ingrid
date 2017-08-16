'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Display = require('./Display');

var _Display2 = _interopRequireDefault(_Display);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ingrid = function (_Component) {
    _inherits(Ingrid, _Component);

    function Ingrid() {
        _classCallCheck(this, Ingrid);

        return _possibleConstructorReturn(this, (Ingrid.__proto__ || Object.getPrototypeOf(Ingrid)).apply(this, arguments));
    }

    _createClass(Ingrid, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var _props = this.props,
                ItemComponent = _props.ItemComponent,
                itemHeight = _props.itemHeight,
                items = _props.items,
                itemWidth = _props.itemWidth,
                loading = _props.loading,
                PreloaderComponent = _props.PreloaderComponent,
                preloaderHeight = _props.preloaderHeight,
                isShowingPreloader = _props.isShowingPreloader,
                itemProps = _props.itemProps;


            return {
                ItemComponent: ItemComponent,
                itemHeight: itemHeight,
                items: items,
                itemWidth: itemWidth,
                loading: loading,
                PreloaderComponent: PreloaderComponent,
                preloaderHeight: preloaderHeight,
                isShowingPreloader: isShowingPreloader,
                itemProps: itemProps
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                buffer = _props2.buffer,
                getPaddingTop = _props2.getPaddingTop,
                itemHeight = _props2.itemHeight,
                items = _props2.items,
                itemWidth = _props2.itemWidth,
                _props2$load = _props2.load,
                load = _props2$load === undefined ? function () {
                return null;
            } : _props2$load,
                loading = _props2.loading,
                more = _props2.more,
                paddingLeft = _props2.paddingLeft,
                paddingTop = _props2.paddingTop,
                _props2$shouldPrerend = _props2.shouldPrerenderAll,
                shouldPrerenderAll = _props2$shouldPrerend === undefined ? false : _props2$shouldPrerend;


            var total = void 0;

            if (typeof items.count === 'function') {
                total = items.count();
            } else {
                total = items.length;
            }

            return _react2["default"].createElement(_Display2["default"], {
                buffer: buffer,
                getPaddingTop: getPaddingTop,
                itemHeight: itemHeight,
                items: items,
                itemWidth: itemWidth,
                load: load,
                loading: loading,
                more: more,
                shouldPrerenderAll: shouldPrerenderAll,
                paddingLeft: paddingLeft,
                paddingTop: paddingTop,
                total: total
            });
        }
    }]);

    return Ingrid;
}(_react.Component);

Ingrid.childContextTypes = {
    ItemComponent: _react.PropTypes.func,
    itemHeight: _react.PropTypes.number,
    items: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]),
    itemWidth: _react.PropTypes.number,
    loading: _react.PropTypes.bool,
    PreloaderComponent: _react.PropTypes.func,
    preloaderHeight: _react.PropTypes.number,
    isShowingPreloader: _react.PropTypes.bool,
    // Additional item props
    itemProps: _react.PropTypes.any
};

Ingrid.propTypes = {
    buffer: _react.PropTypes.number,
    getPaddingTop: _react.PropTypes.func,
    ItemComponent: _react.PropTypes.func.isRequired,
    itemHeight: _react.PropTypes.number.isRequired,
    items: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]),
    itemWidth: _react.PropTypes.number.isRequired,
    paddingTop: _react.PropTypes.number,
    preloaderHeight: _react.PropTypes.number,
    prerenderAll: _react.PropTypes.bool,
    // Additional item props
    itemProps: _react.PropTypes.any
};

exports["default"] = Ingrid;