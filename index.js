'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _urlJoin = require('url-join');

var _urlJoin2 = _interopRequireDefault(_urlJoin);

var BlogPost = (function (_React$Component) {
  _inherits(BlogPost, _React$Component);

  function BlogPost() {
    _classCallCheck(this, BlogPost);

    _React$Component.apply(this, arguments);
  }

  BlogPost.prototype.render = function render() {
    var content = [];
    if (this.props.flyTitle) {
      content.push(_react2['default'].createElement(
        'h2',
        {
          className: 'blog-post__flytitle',
          itemProp: 'alternativeHeadline',
          key: 'blog-post__flytitle'
        },
        this.props.flyTitle
      ));
    }
    if (this.props.title) {
      content.push(_react2['default'].createElement(
        'h1',
        {
          className: 'blog-post__title',
          itemProp: 'headline',
          key: 'blog-post__title'
        },
        this.props.title
      ));
    }
    if (this.props.rubric) {
      content.push(_react2['default'].createElement(
        'p',
        {
          className: 'blog-post__rubric',
          itemProp: 'description',
          key: 'blog-post__rubric'
        },
        this.props.rubric
      ));
    }
    if (this.props.image && this.props.image.src) {
      var caption = null;
      if (this.props.image.caption) {
        caption = _react2['default'].createElement(
          'figcaption',
          { className: 'blog-post__image-caption' },
          this.props.image.caption
        );
      }
      content.push(_react2['default'].createElement(
        'figure',
        { className: 'blog-post__image',
          key: 'blogimg'
        },
        _react2['default'].createElement('img', _extends({}, this.props.image, {
          itemProp: 'image',
          className: 'blog-post__image-block'
        })),
        caption
      ));
    }
    var asideableContent = [];
    if (this.props.section) {
      var sectionUrl = this.props.sectionUrl;

      if (sectionUrl) {
        if (!/^(\w+:)?\/\//.test(sectionUrl)) {
          sectionUrl = _urlJoin2['default']('/', sectionUrl);
        }
      }
      var section = sectionUrl ? _react2['default'].createElement(
        'a',
        {
          href: sectionUrl,
          className: 'blog-post__section-link'
        },
        this.props.section
      ) : this.props.section;
      asideableContent.push(_react2['default'].createElement(
        'h3',
        {
          className: 'blog-post__section',
          itemProp: 'articleSection',
          key: 'blog-post__section'
        },
        section
      ));
    }
    if (this.props.dateTime) {
      asideableContent.push(_react2['default'].createElement(
        'time',
        {
          className: 'blog-post__datetime',
          itemProp: 'dateCreated',
          dateTime: this.props.dateTime,
          key: 'blog-post__datetime'
        },
        this.props.dateFormat(this.props.dateTime)
      ));
    }
    if (this.props.dateString && this.props.timestampISO) {
      asideableContent.push(_react2['default'].createElement(
        'time',
        {
          className: 'blog-post__datetime',
          itemProp: 'dateCreated',
          dateTime: this.props.timestampISO,
          key: 'blog-post__datetime'
        },
        this.props.dateString
      ));
    }
    if (this.props.byline) {
      asideableContent.push(_react2['default'].createElement(
        'p',
        { className: 'blog-post__byline-container', key: 'blog-post__byline-container' },
        "by ",
        _react2['default'].createElement(
          'span',
          {
            className: 'blog-post__byline',
            itemProp: 'author'
          },
          this.props.byline
        )
      ));
    }
    if (asideableContent.length) {
      content.push(_react2['default'].createElement(
        'div',
        { className: 'blog-post__asideable-content blog-post__asideable-content--meta', key: 'asideable-content' },
        asideableContent
      ));
    }
    if (this.props.author) {
      content.push(_react2['default'].createElement(
        'div',
        {
          className: 'blog-post__author',
          itemProp: 'author',
          key: 'blog-post__author'
        },
        this.props.author
      ));
    }
    if (typeof this.props.text === 'string') {
      content.push(_react2['default'].createElement('div', {
        className: 'blog-post__text',
        itemProp: 'description',
        key: 'blog-post__text',
        /* eslint-disable react/no-danger */
        dangerouslySetInnerHTML: {
          '__html': this.props.text
        }
      }));
    } else if (this.props.text) {
      content.push(_react2['default'].createElement(
        'div',
        {
          className: 'blog-post__text',
          itemProp: 'description',
          key: 'blog-post__text'
        },
        this.props.text
      ));
    }
    if (this.props.afterText) {
      content.push(this.props.afterText);
    }

    var className = 'blog-post';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    return _react2['default'].createElement(
      'article',
      {
        className: className,
        itemScope: true, itemType: this.props.itemType, itemProp: this.props.itemProp,
        role: 'article'
      },
      content
    );
  };

  _createClass(BlogPost, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        className: _react2['default'].PropTypes.string,
        image: _react2['default'].PropTypes.shape({
          src: _react2['default'].PropTypes.string,
          caption: _react2['default'].PropTypes.string
        }),
        author: _react2['default'].PropTypes.string,
        byline: _react2['default'].PropTypes.string,
        section: _react2['default'].PropTypes.string,
        sectionUrl: _react2['default'].PropTypes.string,
        flyTitle: _react2['default'].PropTypes.string,
        title: _react2['default'].PropTypes.string.isRequired,
        rubric: _react2['default'].PropTypes.string,
        dateTime: _react2['default'].PropTypes.instanceOf(Date),
        dateString: _react2['default'].PropTypes.string,
        timestampISO: _react2['default'].PropTypes.string,
        dateFormat: _react2['default'].PropTypes.func,
        text: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]).isRequired,
        afterText: _react2['default'].PropTypes.node,
        itemType: _react2['default'].PropTypes.string,
        itemProp: _react2['default'].PropTypes.string
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        itemType: 'http://schema.org/BlogPosting',
        itemProp: 'blogPost',
        dateFormat: function dateFormat(date) {
          // Sep 19th 2015, 9:49
          function addPostFix(day) {
            var daystr = day.toString();
            var lastChar = daystr.charAt(daystr.length - 1);
            var postFix = '';
            switch (lastChar) {
              case '1':
                postFix = 'st';
                break;
              case '2':
                postFix = 'nd';
                break;
              case '3':
                postFix = 'rd';
                break;
              default:
                postFix = 'th';
                break;
            }
            return '' + day + postFix;
          }
          var shortMonthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          var minutes = date.getMinutes() < 10 ? '0' : '';
          minutes += date.getMinutes();
          return ['' + shortMonthList[date.getMonth()], '' + addPostFix(date.getDate()), date.getFullYear() + ',', date.getHours() + ':' + minutes].join(' ');
        }
      };
    }
  }]);

  return BlogPost;
})(_react2['default'].Component);

exports['default'] = BlogPost;
module.exports = exports['default'];