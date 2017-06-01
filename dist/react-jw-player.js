'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createEventHandlers = require('./create-event-handlers');

var _createEventHandlers2 = _interopRequireDefault(_createEventHandlers);

var _getCurriedOnLoad = require('./helpers/get-curried-on-load');

var _getCurriedOnLoad2 = _interopRequireDefault(_getCurriedOnLoad);

var _getPlayerOpts = require('./helpers/get-player-opts');

var _getPlayerOpts2 = _interopRequireDefault(_getPlayerOpts);

var _initialize2 = require('./helpers/initialize');

var _initialize3 = _interopRequireDefault(_initialize2);

var _installPlayerScript = require('./helpers/install-player-script');

var _installPlayerScript2 = _interopRequireDefault(_installPlayerScript);

var _defaultProps = require('./default-props');

var _defaultProps2 = _interopRequireDefault(_defaultProps);

var _propTypes = require('./prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var displayName = 'ReactJWPlayer';

var ReactJWPlayer = function (_Component) {
  _inherits(ReactJWPlayer, _Component);

  function ReactJWPlayer(props) {
    _classCallCheck(this, ReactJWPlayer);

    var _this = _possibleConstructorReturn(this, (ReactJWPlayer.__proto__ || Object.getPrototypeOf(ReactJWPlayer)).call(this, props));

    _this.state = {
      adHasPlayed: false,
      hasPlayed: false,
      hasFired: {}
    };
    _this.eventHandlers = (0, _createEventHandlers2.default)(_this);
    _this.uniqueScriptId = 'jw-player-script';
    _this._initialize = _this._initialize.bind(_this);
    return _this;
  }

  _createClass(ReactJWPlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var isJWPlayerScriptLoaded = !!window.jwplayer;
      if (isJWPlayerScriptLoaded) {
        this._initialize();
        return;
      }

      var existingScript = document.getElementById(this.uniqueScriptId);

      if (!existingScript) {
        (0, _installPlayerScript2.default)({
          context: document,
          onLoadCallback: this._initialize,
          scriptSrc: this.props.playerScript,
          uniqueScriptId: this.uniqueScriptId
        });
      } else {
        existingScript.onload = (0, _getCurriedOnLoad2.default)(existingScript, this._initialize);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.playlist !== this.props.playlist || prevProps.file !== this.props.file) {
        this._initialize();
      }
    }
  }, {
    key: '_initialize',
    value: function _initialize() {
      var component = this;
      var player = window.jwplayer(this.props.playerId);
      var playerOpts = (0, _getPlayerOpts2.default)(this.props);

      (0, _initialize3.default)({ component: component, player: player, playerOpts: playerOpts });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', {
        className: this.props.className,
        dangerouslySetInnerHTML: {
          __html: '<div id="' + this.props.playerId + '"></div>'
        }
      });
    }
  }]);

  return ReactJWPlayer;
}(_react.Component);

ReactJWPlayer.defaultProps = _defaultProps2.default;
ReactJWPlayer.displayName = displayName;
ReactJWPlayer.propTypes = _propTypes2.default;
exports.default = ReactJWPlayer;