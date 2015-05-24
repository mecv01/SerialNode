'use strict';

function Signal(config, nodemailer, imagesnapjs, serialport, fs, xOAuth2){
	this._config 		= config;
	this._nodemailer 	= nodemailer;
	this._imagesnapjs	= imagesnapjs;
	this._serialport 	= serialport;
	this._fs 			= fs;
	this._xOAuth2 		= xOAuth2;

	this._generator		= this._xOAuth2.createXOAuth2Generator(
							this._config.mailCredentials
							);

	this._serialport	= this._serialport.SerialPort;
	this._serialport	= new this._serialport(
							this._config.serialPortName, 
							this._config.serialConfig
							);

	this._transporter 	= this._nodemailer.createTransport({
    	service: this._config.mailService,
    	auth: {
        	xoauth2: this._generator
    	}
	});

	this._sentEmail = false;
	this._obj = {};
}

Signal.prototype.initInfrastructure = function(){
	// listen for token updates
	// TODO: Store these to a db
	this._generator.on('token', function(token){
	    console.log('New token for %s: %s', 
	    	token.user, 
	    	token.accessToken
	    );
	});

	var _this = this;

	this._serialport.on("open", function () {
	  console.log('Serial Port Open');
	  _this._serialport.on('data', function(data) {
	    try{
	    	_this._obj = JSON.parse(data.toString().split("'").join('"'));
	    	if(_this._obj.lightIndex < _this._config.lightThreshold){
	        	console.log('******Debugger: lightIndex: ' + 
	        		JSON.stringify(_this._obj) + ' sentEmail: ' + 
	        		_this._sentEmail + 
	        		(_this._sentEmail===false ? '****************' : '')
        		);
	        	takeAndSendPicture(_this, _this._obj.lightIndex, _this.sentEmail);
	    	}
	    }
	    catch (e) {
	    	console.log(e)
	    }
	  });
	}); 
}

var takeAndSendPicture = function(context, sensorValue, sentEMail){
  var fileName = '';
  var _this = context;

  fileName = context._config.picturesLog + '/' + 
  			 Date.now() + '.jpg';
          
  if(context._sentEmail === false){
  	// Disabling the sending of emails
    context._sentEmail = true;
    context._imagesnapjs.capture(fileName , 
    	{cliflags: '-w 2'}, 
    	function(err) {
        
		    //console.log(err ? err : '===Image saved!');
		    // let's block the email distribution
		    console.log('===Image saved and Sending email ...');
		    // setup e-mail data with unicode symbols
		    var mailOptions = {
		        from: _this._config.mailSender.from, // sender address
		        to: _this._config.mailSender.to, // list of receivers
		        subject: _this._config.mailSender.subject, // Subject line
		        attachments: [
		            {   // utf-8 string as an attachment
		                filename: fileName,
		                content: _this._fs.createReadStream(fileName)
		            }
		          ],
		        html: '<b>Light index: ' + sensorValue + ' ✔</b>' // html body
		    };

		    var __this = _this;

		    // send mail with defined transport object
		    _this._transporter.sendMail(mailOptions, function(error, info){
		        if(error){
		            console.log(error);
		        }else{
		          console.log('===Email Sent...! ***************************');
		          setTimeout(function() {
		          	// Enabling the sending of emails
		            __this._sentEmail = false;
		            console.log('===Allowed to send more emails *******************');
		          }, _this._config.timeBetweenEmails);
		        }
		    });
    	});
  }
  else{
    context._imagesnapjs.capture(fileName , { cliflags: '-w 2'}, function(err) {
      console.log('===Image saved but the mail system is bussy...!');
    });
  }
};

module.exports = Signal;