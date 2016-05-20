/*
 * Home controller File
 * Controlador de la pagina Home de la aplicacion.
 */
(function () {

	var controllerModule = angular.module('AppControllers');
	controllerModule.controller('homeController', ['$scope', 'userService', '$rootScope', 'balanceChartFactory'
		, function ($scope, userService, $rootScope, balanceChartFactory) {
			// Funcion para controlar el template home.html

			// Id del usuario Autenticado.
			var _idUser = $rootScope.idUserLoggedIn;
			userService.getBalance(_idUser).then(function (response) {
				$scope.balance = response.data;
				balanceChartFactory.runProcess(response.data);
				balanceChartFactory.getDataCashPorDia();

			}, function (error) {
				$location.path('/home');
			});

    }]);

})();
