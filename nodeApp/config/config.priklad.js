'use strict';

module.exports = function(serialport){
	return {

		app:{
			port: 8000,
			mockMode: false
		},
		mocker: {
			minValue: 500,
			maxValue: 1200,
			timeBetweenSignals: 1000
		},
		pictureFolderName: 'picturesLog',
		picturesLog: './picturesLog',
		pictureVirtualFolder: '/logs',
		mailService: 'gmail',
		mailCredentials: {
			user: 'aRandomUser@gmail.com',
			clientId: 'clientId',
			clientSecret: 'clientSecret',
			refreshToken: 'refreshToken',
			accessToken: 'accessToken'
		},
		mailSender: {
			from: 'A Random User ✔ <aRandomUser@gmail.com>',
			to: 'aRandomUser@gmail.com',
			subject: 'Movement detected ✔'
		},
		serialPortName: '/dev/cu.usbmodem411',
		serialConfig:  {
			baudRate: 9600,
			dataBits: 8,
			parity: 'none',
			stopBits: 1,
			flowControl: false,
			parser: serialport.parsers.readline('\n')
		},
		lightThreshold: 900,
		timeBetweenEmails: 10000

	};
};