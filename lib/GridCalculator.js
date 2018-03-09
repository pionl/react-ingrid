"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 * @param displayWidth
 * @param itemWidth
 * @returns {number}
 */
var calculateItemsPerRow = exports.calculateItemsPerRow = function calculateItemsPerRow(displayWidth, itemWidth) {
  var paddingLeft = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return Math.floor((displayWidth - paddingLeft) / itemWidth) || 1;
};

/**
 *
 * @param scrollTop
 * @param itemHeight
 * @param itemsPerRow
 * @returns {number}
 */
var calculateMinVisibleIndex = exports.calculateMinVisibleIndex = function calculateMinVisibleIndex(scrollTop, itemHeight, itemsPerRow, paddingTop) {
  return scrollTop >= paddingTop && itemHeight ? Math.floor((scrollTop - paddingTop) / itemHeight) * itemsPerRow : 0;
};

/**
 *
 * @param displayHeight
 * @param itemHeight
 * @param itemsPerRow
 * @param minVisibleIndex
 * @param buffer
 * @returns {number}
 */
var calculateMaxVisibleIndex = exports.calculateMaxVisibleIndex = function calculateMaxVisibleIndex(displayHeight, itemHeight, itemsPerRow, minVisibleIndex, buffer) {
  return itemHeight && displayHeight ? minVisibleIndex + Math.ceil(displayHeight / itemHeight) * itemsPerRow + buffer * itemsPerRow + itemsPerRow - 1 : minVisibleIndex;
};

/**
 *
 * @param minVisibleIndex
 * @param itemsPerRow
 * @param itemHeight
 */
var calculateOffsetTop = exports.calculateOffsetTop = function calculateOffsetTop(minVisibleIndex, itemsPerRow, itemHeight, paddingTop) {
  return minVisibleIndex / itemsPerRow * itemHeight + paddingTop;
};

/**
 *
 * @param total
 * @param itemsPerRow
 * @param itemHeight
 */
var calculateHeight = exports.calculateHeight = function calculateHeight(total, itemsPerRow, itemHeight) {
  return Math.ceil(total / itemsPerRow) * itemHeight;
};

var GridCalculator = function () {
  /**
   *
   * @param displayWidth
   * @param displayHeight
   * @param itemWidth
   * @param itemHeight
   * @param scrollTop
   * @param buffer
   * @param itemsPerRow
   * @param minVisibleIndex
   * @param maxVisibleIndex
   */
  function GridCalculator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$displayWidth = _ref.displayWidth,
        displayWidth = _ref$displayWidth === undefined ? 0 : _ref$displayWidth,
        _ref$displayHeight = _ref.displayHeight,
        displayHeight = _ref$displayHeight === undefined ? 0 : _ref$displayHeight,
        _ref$itemWidth = _ref.itemWidth,
        itemWidth = _ref$itemWidth === undefined ? 0 : _ref$itemWidth,
        _ref$itemHeight = _ref.itemHeight,
        itemHeight = _ref$itemHeight === undefined ? 0 : _ref$itemHeight,
        _ref$offsetTop = _ref.offsetTop,
        offsetTop = _ref$offsetTop === undefined ? 0 : _ref$offsetTop,
        _ref$scrollTop = _ref.scrollTop,
        scrollTop = _ref$scrollTop === undefined ? 0 : _ref$scrollTop,
        _ref$buffer = _ref.buffer,
        buffer = _ref$buffer === undefined ? 0 : _ref$buffer,
        _ref$itemsPerRow = _ref.itemsPerRow,
        itemsPerRow = _ref$itemsPerRow === undefined ? 0 : _ref$itemsPerRow,
        _ref$minVisibleIndex = _ref.minVisibleIndex,
        minVisibleIndex = _ref$minVisibleIndex === undefined ? 0 : _ref$minVisibleIndex,
        _ref$maxVisibleIndex = _ref.maxVisibleIndex,
        maxVisibleIndex = _ref$maxVisibleIndex === undefined ? 0 : _ref$maxVisibleIndex,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 0 : _ref$height,
        _ref$total = _ref.total,
        total = _ref$total === undefined ? 0 : _ref$total,
        _ref$paddingLeft = _ref.paddingLeft,
        paddingLeft = _ref$paddingLeft === undefined ? 0 : _ref$paddingLeft,
        _ref$paddingTop = _ref.paddingTop,
        paddingTop = _ref$paddingTop === undefined ? 0 : _ref$paddingTop;

    _classCallCheck(this, GridCalculator);

    this.displayWidth = displayWidth;
    this.displayHeight = displayHeight;
    this.itemWidth = itemWidth;
    this.itemHeight = itemHeight;
    this.offsetTop = offsetTop;
    this.scrollTop = scrollTop;
    this.buffer = buffer;
    this.itemsPerRow = itemsPerRow;
    this.minVisibleIndex = minVisibleIndex;
    this.maxVisibleIndex = maxVisibleIndex;
    this.height = height;
    this.paddingLeft = paddingLeft;
    this.paddingTop = paddingTop;
    this.total = total;
  }

  /**
   *
   * @param displayWidth
   * @param displayHeight
   * @param scrollTop
   */


  _createClass(GridCalculator, [{
    key: "updateDisplaySize",
    value: function updateDisplaySize(displayWidth, displayHeight, scrollTop) {
      this.displayWidth = displayWidth;
      this.displayHeight = displayHeight;
      this.scrollTop = scrollTop;

      this.itemsPerRow = calculateItemsPerRow(displayWidth, this.itemWidth, this.paddingLeft);
      this.height = calculateHeight(this.total, this.itemsPerRow, this.itemHeight);
      this.minVisibleIndex = calculateMinVisibleIndex(scrollTop, this.itemHeight, this.itemsPerRow, this.paddingTop);
      this.maxVisibleIndex = calculateMaxVisibleIndex(displayHeight, this.itemHeight, this.itemsPerRow, this.minVisibleIndex, this.buffer);
      this.offsetTop = calculateOffsetTop(this.minVisibleIndex, this.itemsPerRow, this.itemHeight, this.paddingTop);
    }
  }, {
    key: "handleItemsSizeChange",
    value: function handleItemsSizeChange(itemWidth, itemHeight) {
      this.itemWidth = itemWidth;
      this.itemHeight = itemHeight;

      this.itemsPerRow = calculateItemsPerRow(this.displayWidth, this.itemWidth, this.paddingLeft);
      this.height = calculateHeight(this.total, this.itemsPerRow, this.itemHeight);
      this.minVisibleIndex = calculateMinVisibleIndex(this.scrollTop, this.itemHeight, this.itemsPerRow, this.paddingTop);
      this.maxVisibleIndex = calculateMaxVisibleIndex(this.displayHeight, this.itemHeight, this.itemsPerRow, this.minVisibleIndex, this.buffer);
      this.offsetTop = calculateOffsetTop(this.minVisibleIndex, this.itemsPerRow, this.itemHeight, this.paddingTop);
    }

    /**
     *
     * @param scrollTop
     */

  }, {
    key: "updateScrollTop",
    value: function updateScrollTop(scrollTop) {
      this.scrollTop = scrollTop;

      this.itemsPerRow = calculateItemsPerRow(this.displayWidth, this.itemWidth, this.paddingLeft);
      this.minVisibleIndex = calculateMinVisibleIndex(scrollTop, this.itemHeight, this.itemsPerRow, this.paddingTop);
      this.maxVisibleIndex = calculateMaxVisibleIndex(this.displayHeight, this.itemHeight, this.itemsPerRow, this.minVisibleIndex, this.buffer);
      this.offsetTop = calculateOffsetTop(this.minVisibleIndex, this.itemsPerRow, this.itemHeight, this.paddingTop);
    }

    /**
     *
     * @param total
     */

  }, {
    key: "updateTotal",
    value: function updateTotal(total) {
      this.total = total;
      this.height = calculateHeight(this.total, this.itemsPerRow, this.itemHeight);
    }

    /**
     *
     * @returns {{minVisibleIndex: * maxVisibleIndex: * offsetTop: *}}
     */

  }, {
    key: "getState",
    value: function getState() {
      return {
        minVisibleIndex: this.minVisibleIndex,
        maxVisibleIndex: this.maxVisibleIndex,
        offsetTop: this.offsetTop,
        height: this.height
      };
    }
  }]);

  return GridCalculator;
}();

exports["default"] = GridCalculator;