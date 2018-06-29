"use strict";

var showdown = require('showdown-ghost'),
	converter = new showdown.converter();

module.exports = converter.makeHtml.bind(converter);