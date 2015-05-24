'use strict';

var di 				= require('di');
var injectorConfig 	= require('./injectorConfig');

var injector 		= new di.Injector([injectorConfig]);

injector.invoke(function webServer(app, config){
  app.listen(config.app.port, function startWebServer() {
    console.log('Server started and listening to port ' + config.app.port + '...');
  });
});