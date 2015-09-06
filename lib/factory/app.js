'use strict';

module.exports = function(config, express, serveIndex, Signal, Email){

	var app = express();

	app.use(function(req, res, next){
		next();
	});

	/*
	var picVirtFolder = config.pictureVirtualFolder;
	var picFolderName = config.pictureFolderName;
	var picLog = config.picturesLog;
	var serveOptions = {'icons': true, 'view': 'details'};
	var xprStat = express.static(__dirname + '/' + picFolderName);

	app.use(picVirtFolder, xprStat);
	app.use(picVirtFolder, serveIndex(picLog, serveOptions));
*/
	Signal.initInfrastructure();

	//Email.send('/Users/mcarranza/Pictures/wallpapers/Docko.jpg', 100);

	return app;

}