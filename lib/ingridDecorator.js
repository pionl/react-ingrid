'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Ingrid = require('./Ingrid');

var _Ingrid2 = _interopRequireDefault(_Ingrid);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ingrid = function ingrid() {
    var mapProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
        return {};
    };
    return function (ItemComponent) {
        return function (props) {
            return _react2.default.createElement(_Ingrid2.default, _extends({}, mapProps(props), { ItemComponent: ItemComponent }));
        };
    };
};

exports.default = ingrid;