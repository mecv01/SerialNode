'use strict';

function SignalSelector(config, serialport, Mocker) {

	this._config = config;
	this._mockMode = config.app.mockMode;
	this._serialport = serialport;
	this._mocker = Mocker;

}

SignalSelector.prototype.select = function() {

	if (this._mockMode === true) {

		return this._mocker;

	}

	this._serialport	= this._serialport.SerialPort;
	return new this._serialport(this._config.serialPortName, this._config.serialConfig);

};

module.exports = SignalSelector;