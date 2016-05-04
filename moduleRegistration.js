(function () {
	angular.module('AppControllers', []);  // Modulo de todos los controladores de la aplicacion.
	angular.module('AppServices', []);     // Modulo de todos los servicios de la aplicacion.

	//Modulo Principal de la Aplicacion.
	angular.module("miapp", ['AppControllers','AppServices', 'ui.router', 'chart.js']);

})();
