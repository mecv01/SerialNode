'use strict';

module.exports = {
	/*
	 *	Libraries
	 */
	'nodemailer': 		['value', require('nodemailer')],
	'imagesnapjs': 		['value', require('imagesnapjs')],
	'serialport': 		['value', require('serialport')],
	'fs': 				['value', require('fs')],
	'xOAuth2': 			['value', require('xoauth2')],
	'serveIndex': 		['value', require('serve-index')],
	'express': 			['value', require('express')],
	/*
	 *	Custom Classes
	 */
	'config': 			['type', 	require('./config')],
	'app': 				['factory', require('./app')],
	'Signal': 			['type', 	require('./Signal')]

}