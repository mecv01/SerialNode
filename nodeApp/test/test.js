'use strict';

var assert = require("assert");
var di 				= require('di');
var injectorConfig 	= require('../config/injectorConfig');

var injector 		= new di.Injector([injectorConfig]);

injector.invoke(function(){

	describe('Unit tests', function() {
		describe('Constructor', function () {
			it('should return -1 when the value is not present', function () {
				assert.equal(-1, [1,2,3].indexOf(5));
				assert.equal(-1, [1,2,3].indexOf(0));
			});
		});
	});

});





