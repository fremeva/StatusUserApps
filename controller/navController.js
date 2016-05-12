/*
* Nav controller File
* Controlador para el menú de la applicacion.
*/
(function () {

	var controllerModule = angular.module('AppControllers');
	controllerModule.controller('navController', ['$scope', '$rootScope', '$location', '$window', 'authService',
      function ($scope, $rootScope, $location, $window, authService) {
			$scope.login = function () {
				$location.path('/login');
			};

			$scope.logout = function () {
				authService.logout();
				//delete $window.localStorage.token;
				$rootScope.loggedIn = false;
				$rootScope.idUserLoggedIn = '';
				$rootScope.userNameSession = '';
				$location.path('/');
			};

    }]);

})();
