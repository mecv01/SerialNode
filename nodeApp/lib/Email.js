'use strict';

function Email(config, nodemailer, xOAuth2, fs){
	
	this._config 		= config;
	this._nodemailer 	= nodemailer;
	this._xOAuth2 		= xOAuth2;
	this._mailOptions 	= {};
	this._fs = fs;
	this._isAllowedToSendMoreEmails = true;
	
	this._generator		= this._xOAuth2.createXOAuth2Generator(
							this._config.mailCredentials
							);

	var transporterOptions = {
								service: this._config.mailService,
						    	auth: {
						        	xoauth2: this._generator
						    	}
							};

	this._transporter 	= this._nodemailer.createTransport(transporterOptions);

	this.listenForTokenUpdates();

	return this;

}

Email.prototype.send = function(fileName){

	console.log('ALLOWED TO SEND EMAILS?....' + this._isAllowedToSendMoreEmails);

	if (this._isAllowedToSendMoreEmails === false) {

		console.log('Waiting to send more emails...');

	} else {

		var _this = this;
		_this._isAllowedToSendMoreEmails = false;
		this._mailOptions = this.generateEmail(fileName);
		//console.log(this._mailOptions);
		this._transporter.sendMail(this._mailOptions, function (error) {

			if (error) {
				console.log(error);
			} else {
				console.log('===Email Sent...!');
				setTimeout(function () {

					_this._isAllowedToSendMoreEmails = true;
					console.log('===Allowed to send more emails');

				}, _this._config.timeBetweenEmails);
			}

		});
	}
};

Email.prototype.listenForTokenUpdates = function () {

	// listen for token updates
	return this._generator.on('token', function(token){
		console.log('New token for %s: %s',
			token.user,
			token.accessToken
		);
	});

};

Email.prototype.generateEmail = function (fileName){

	var options = {
		'from': this._config.mailSender.from,
		'to': this._config.mailSender.to,
		'subject': this._config.mailSender.subject,
		'html': '<b>Movement detected at: ' + (Date.now()) + ' ✔</b>'
	};

	if(fileName) {

			options.attachments = [
				{
					'filename': fileName,
					'content': this._fs.createReadStream(fileName)
				}
			];

	}

	return options;

};

module.exports = Email;