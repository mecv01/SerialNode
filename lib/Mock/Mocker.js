'use strict';

var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Mocker(config, events){
	this._config = config;
	this._events = events.EventEmitter;
	this._ee = new this._events();
	this.emit('open');

	function generateSignal (context) {

		var maxValue = context._config.mocker.maxValue;
		var minValue = context._config.mocker.minValue;

		return Math.floor((Math.random() * maxValue) + minValue);

	};

	this.emit('data', generateSignal(this));

}
/*
Mocker.prototype.generateContinuousSignal = function () {

	//while (true) {

	//console.log(generateSignal(this));

		setInterval(function () {

			console.log(generateSignal(this));
			this.emit('data', generateSignal(this));

		}, this._config.mocker.timeBetweenSignals);

	//}

};
*/


util.inherits(Mocker, EventEmitter);

module.exports = Mocker;