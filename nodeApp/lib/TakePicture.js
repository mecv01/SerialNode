'use strict';

function TakePicture(config, imagesnapjs) {

	this._imagesnapjs = imagesnapjs;
	this._config = config;

}

TakePicture.prototype.sayCheese = function (callback){

	var fileName = '';
	var flags = {cliflags: '-w 2'};

	fileName = this._config.picturesLog + '/' + Date.now() + '.jpg';

	this._imagesnapjs.capture(fileName , flags, function takePicture(err) {

		console.log(err ? err : '===Image saved!');

		if (!err) {
			callback(err, null);
		}

		callback(null, fileName);

		console.log('===Image saved ...');
	});

};

module.exports = TakePicture;
