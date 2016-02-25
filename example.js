'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _examplePostTextEs6 = require('./example-post-text.es6');

var _examplePostTextEs62 = _interopRequireDefault(_examplePostTextEs6);

var today = new Date();
exports['default'] = _react2['default'].createElement(
  'div',
  null,
  _react2['default'].createElement(_2['default'], {
    image: {
      src: 'http://cdn.static-economist.com/sites/default/files/imagecache/full-width/20151017_BLP560.jpg',
      title: 'Just an image'
    },
    section: 'International',
    flyTitle: 'The UN, religion and development',
    title: 'Faith and secular global bodies learn to live together',
    rubric: 'A different critique was put forward recently by a representative of the Bahai faith, which originated in 19th century Persia but is now flourishing in smallish pockets throughout the world, while facing persecution in its homeland.',
    dateTime: today,
    text: _examplePostTextEs62['default'],
    itemType: 'http://schema.org/BlogPosting',
    itemProp: 'blogPost'
  })
);
module.exports = exports['default'];