'use strict';

function Signal(config, SignalSelector, Email) {

	this._config 		= config;
	this._email     = Email;
	this._serialport	= SignalSelector.select();

}

Signal.prototype.initInfrastructure = function(){

	var _this = this;
	var jsonObj = {};

	this._serialport.on('open', function () {
	  console.log('Serial Port Open');
	  _this._serialport.on('data', function(data) {
		  try
		  {
			  jsonObj = JSON.parse(data.toString());
			  if(jsonObj.motion) {
				  console.log(data.toString());
				  _this._email.send();
			  }
		  }
		  catch(e)
		  {
			  console.log(e.message);
			  console.log('Invalid JSON: ' + data.toString());
		  }

	  });

	});

};

module.exports = Signal;