'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DefaultPreloader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultScrollHelperStyle = {
    display: 'block',
    position: 'relative',
    width: '100%',
    height: 0
};

var defaultItemStyle = {
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'bottom',
    width: 0,
    height: 0
};

function createItemStyle(context) {
    var itemWidth = context.itemWidth,
        itemHeight = context.itemHeight;


    return _extends({}, defaultItemStyle, {
        width: itemWidth,
        height: itemHeight
    });
}

var DefaultPreloader = exports.DefaultPreloader = function (_Component) {
    _inherits(DefaultPreloader, _Component);

    function DefaultPreloader() {
        _classCallCheck(this, DefaultPreloader);

        return _possibleConstructorReturn(this, (DefaultPreloader.__proto__ || Object.getPrototypeOf(DefaultPreloader)).apply(this, arguments));
    }

    _createClass(DefaultPreloader, [{
        key: 'render',
        value: function render() {
            var style = {
                color: '#000',
                fontSize: '20px',
                fontFamily: 'sans-serif',
                marginLeft: '-70px',
                marginBottom: '35px',
                letterSpacing: '1.5px'
            };
            return _react2.default.createElement(
                'div',
                { style: style },
                'Loading...'
            );
        }
    }]);

    return DefaultPreloader;
}(_react.Component);

var Grid = function (_Component2) {
    _inherits(Grid, _Component2);

    function Grid() {
        _classCallCheck(this, Grid);

        return _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).apply(this, arguments));
    }

    _createClass(Grid, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                _props$offsetTop = _props.offsetTop,
                offsetTop = _props$offsetTop === undefined ? 0 : _props$offsetTop,
                _props$minVisibleInde = _props.minVisibleIndex,
                minVisibleIndex = _props$minVisibleInde === undefined ? 0 : _props$minVisibleInde,
                _props$maxVisibleInde = _props.maxVisibleIndex,
                maxVisibleIndex = _props$maxVisibleInde === undefined ? 0 : _props$maxVisibleInde,
                _props$height = _props.height,
                height = _props$height === undefined ? 0 : _props$height;


            var defaultpreloaderHeight = 200;

            var _context = this.context,
                _context$items = _context.items,
                items = _context$items === undefined ? [] : _context$items,
                loading = _context.loading,
                _context$paddingTop = _context.paddingTop,
                paddingTop = _context$paddingTop === undefined ? 0 : _context$paddingTop,
                _context$PreloaderCom = _context.PreloaderComponent,
                PreloaderComponent = _context$PreloaderCom === undefined ? DefaultPreloader : _context$PreloaderCom,
                _context$preloaderHei = _context.preloaderHeight,
                preloaderHeight = _context$preloaderHei === undefined ? defaultpreloaderHeight : _context$preloaderHei,
                _context$isShowingPre = _context.isShowingPreloader,
                isShowingPreloader = _context$isShowingPre === undefined ? true : _context$isShowingPre,
                itemProps = _context.itemProps,
                ItemComponent = _context.ItemComponent,
                getItemKey = _context.getItemKey;


            var contentStyle = {
                position: 'relative',
                height: isShowingPreloader && loading ? preloaderHeight + height : height
            };

            var scrollHelperStyle = _extends({}, defaultScrollHelperStyle, {
                height: offsetTop + paddingTop
            });

            var preloaderStyle = {
                bottom: 0,
                left: '50%',
                position: 'absolute'
            };

            return _react2.default.createElement(
                'div',
                { style: contentStyle },
                _react2.default.createElement('div', { style: scrollHelperStyle }),
                items.slice(minVisibleIndex, maxVisibleIndex + 1).map(function (item, index) {
                    var key = getItemKey(item);
                    var style = createItemStyle(_this3.context);
                    return _react2.default.createElement(ItemComponent, _extends({ style: style, index: index, data: item, key: key }, itemProps));
                }),
                isShowingPreloader && loading ? _react2.default.createElement(
                    'div',
                    { style: preloaderStyle },
                    _react2.default.createElement(PreloaderComponent, null)
                ) : ''
            );
        }
    }]);

    return Grid;
}(_react.Component);

Grid.contextTypes = {
    items: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]),
    loading: _react.PropTypes.bool,
    PreloaderComponent: _react.PropTypes.func,
    preloaderHeight: _react.PropTypes.number,
    isShowingPreloader: _react.PropTypes.bool,
    ItemComponent: _react.PropTypes.func.isRequired,
    itemHeight: _react.PropTypes.number.isRequired,
    itemWidth: _react.PropTypes.number.isRequired,
    itemProps: _react.PropTypes.any,
    getItemKey: _react.PropTypes.func.isRequired
};

exports.default = Grid;