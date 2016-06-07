/*
* Module Registration
* Archivo donde se crean o se registran los modulos de la aplicacion Angular
*/
(function () {
	angular.module('AppControllers', []);  // Modulo de todos los controladores de la aplicacion.
	angular.module('AppServices', []);     // Modulo de todos los servicios de la aplicacion.
	angular.module('lodash',[]).factory('_', function(){
        return window._;
});

	//Modulo Principal de la Aplicacion.
	angular.module("miapp", [
		'AppControllers',
		'AppServices',
		'lodash',
		'ui.bootstrap',
		'ui.router',
		'chart.js',
		'angular-svg-round-progressbar',
		'ngSanitize',
		'rzModule'
	]);

})();
