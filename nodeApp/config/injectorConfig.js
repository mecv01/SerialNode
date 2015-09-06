'use strict';

module.exports = {
	/*
	 *	Libraries
	 */
	'nodemailer': 		['value', require('nodemailer')],
	'imagesnapjs': 		['value', require('imagesnapjs')],
	'serialport': 		['value', require('serialport')],
	'fs': 				    ['value', require('fs')],
	'xOAuth2': 			  ['value', require('xoauth2')],
	'serveIndex': 		['value', require('serve-index')],
	'express': 			  ['value', require('express')],
	'events':         ['value', require('events')],
	//'util':           ['value', require('util')],
	/*
	 *	Custom Classes
	*/
	'config': 			['type', 	require('./config')],
	'app': 				  ['factory', require('../lib/factory/app')],
	'Signal': 			['type', 	require('../lib/Signal')],
	'Email': 			  ['type', 	require('../lib/Email')],
	'Mocker': 			['type', 	require('../lib/Mock/Mocker')],
	'SignalSelector': 			['type', 	require('../lib/SignalSelector')]
};