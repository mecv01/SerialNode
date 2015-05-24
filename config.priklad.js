'use strict';

module.exports = function(serialport){ 
	return {

		app:{
			port: 8000
		},
		pictureFolderName: 'picturesLog',
		picturesLog: './picturesLog',
		pictureVirtualFolder: '/logs',
		mailService: 'gmail',
		// ref. 1:  http://masashi-k.blogspot.cz/2013/06/sending-mail-with-gmail-using-xoauth2.html
		mailCredentials: {
		    user: 'aRandomUser@gmail.com',
		    clientId: 'clientId',
		    clientSecret: 'clientSecret',
		    refreshToken: 'refreshToken',
		    accessToken: 'accessToken' // optional
		},
		mailSender: {
			from: 'A Random User ✔ <aRandomUser@gmail.com>',
			to: 'aRandomUser@gmail.com',
			subject: 'A Random Subject ✔'
		},
		serialPortName: '/dev/cu.usbmodem621',
		serialConfig:  { // portName is instatiated to be COM3, replace as necessary
			baudRate: 9600, // this is synced to what was set for the Arduino Code
			dataBits: 8, // this is the default for Arduino serial communication
			parity: 'none', // this is the default for Arduino serial communication
			stopBits: 1, // this is the default for Arduino serial communication
			flowControl: false, // this is the default for Arduino serial communication
			parser: serialport.parsers.readline("\n")
		},
		lightThreshold: 900,
		timeBetweenEmails: 10000
	
	}
};