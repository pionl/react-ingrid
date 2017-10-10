'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _GridCalculator = require('./GridCalculator');

var _GridCalculator2 = _interopRequireDefault(_GridCalculator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultDisplayStyle = {
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'relative',
    boxSizing: 'border-box',
    width: '100%'
};

var contentStyle = {};

var getDisplaySize = function getDisplaySize(inst) {
    var _inst$getDisplayBound = inst.getDisplayBoundingClientRect(),
        displayTop = _inst$getDisplayBound.top,
        width = _inst$getDisplayBound.width,
        height = _inst$getDisplayBound.height;

    var _inst$getContentBound = inst.getContentBoundingClientRect(),
        contentTop = _inst$getContentBound.top;

    var scrollTop = displayTop - contentTop;

    return {
        scrollTop: scrollTop,
        width: width,
        height: height
    };
};

var createScrollListener = function createScrollListener(inst) {
    return function () {
        var _getDisplaySize = getDisplaySize(inst),
            scrollTop = _getDisplaySize.scrollTop;

        inst.calculator.updateScrollTop(scrollTop);

        inst.setState(inst.calculator.getState());
    };
};

var createWindowResizeListener = function createWindowResizeListener(inst) {
    inst.windowResizeListener = function () {
        var _getDisplaySize2 = getDisplaySize(inst),
            scrollTop = _getDisplaySize2.scrollTop,
            width = _getDisplaySize2.width,
            height = _getDisplaySize2.height;

        inst.calculator.updateDisplaySize(width, height, scrollTop);
        inst.setState(inst.calculator.getState());
    };

    return inst.windowResizeListener;
};

var Display = function (_Component) {
    _inherits(Display, _Component);

    function Display(props) {
        _classCallCheck(this, Display);

        var _this = _possibleConstructorReturn(this, (Display.__proto__ || Object.getPrototypeOf(Display)).call(this));

        var itemWidth = props.itemWidth,
            itemHeight = props.itemHeight,
            total = props.total,
            buffer = props.buffer,
            paddingLeft = props.paddingLeft,
            paddingTop = props.paddingTop,
            shouldPrerenderAll = props.shouldPrerenderAll;

        _this.calculator = new _GridCalculator2.default({
            itemWidth: itemWidth,
            itemHeight: itemHeight,
            total: total,
            buffer: buffer,
            paddingLeft: paddingLeft,
            paddingTop: paddingTop,
            maxVisibleIndex: shouldPrerenderAll ? total : 0
        });

        _this.state = _this.calculator.getState();
        return _this;
    }

    _createClass(Display, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _getDisplaySize3 = getDisplaySize(this),
                scrollTop = _getDisplaySize3.scrollTop,
                width = _getDisplaySize3.width,
                height = _getDisplaySize3.height;

            this.calculator.updateDisplaySize(width, height, scrollTop);
            this.setState(this.calculator.getState());

            this.display.addEventListener('scroll', createScrollListener(this));
            window.addEventListener('resize', createWindowResizeListener(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('resize', this.windowResizeListener);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.total !== this.props.total) {
                this.calculator.updateTotal(nextProps.total);
                this.setState(this.calculator.getState());
            }
            if (nextProps.itemWidth !== this.props.itemWidth || nextProps.itemHeight !== this.props.itemHeight) {
                var itemWidth = nextProps.itemWidth,
                    itemHeight = nextProps.itemHeight;

                this.calculator.handleItemsSizeChange(itemWidth, itemHeight);
                this.setState(this.calculator.getState());
            }
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            var total = nextProps.total,
                load = nextProps.load,
                loading = nextProps.loading,
                more = nextProps.more,
                getPaddingTop = nextProps.getPaddingTop,
                paddingTop = nextProps.paddingTop;
            var maxVisibleIndex = nextState.maxVisibleIndex,
                offsetTop = nextState.offsetTop;


            if (more && !loading && maxVisibleIndex > total) {
                load();
            }

            if (typeof getPaddingTop === 'function') {
                getPaddingTop(offsetTop + paddingTop);
            }
        }
    }, {
        key: 'getDisplayBoundingClientRect',
        value: function getDisplayBoundingClientRect() {
            return this.display.getBoundingClientRect();
        }
    }, {
        key: 'getContentBoundingClientRect',
        value: function getContentBoundingClientRect() {
            return this.content.getBoundingClientRect();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                total = _props.total,
                paddingLeft = _props.paddingLeft;


            var displayStyle = _extends({}, defaultDisplayStyle, {
                paddingLeft: paddingLeft
            });

            return _react2.default.createElement(
                'div',
                { ref: function ref(display) {
                        _this2.display = display;
                    },
                    style: displayStyle
                },
                _react2.default.createElement(
                    'div',
                    { ref: function ref(content) {
                            _this2.content = content;
                        }, style: contentStyle
                    },
                    _react2.default.createElement(_Grid2.default, _extends({ total: total }, this.state))
                )
            );
        }
    }]);

    return Display;
}(_react.Component);

exports.default = Display;