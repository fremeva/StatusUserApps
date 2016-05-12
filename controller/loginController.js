/*
* Login controller File
* Controlador para la autenticacion de la applicacion.
*/
(function(){

	var controllerModule = angular.module('AppControllers');

	controllerModule.controller('loginController', ['$scope', '$rootScope', '$window', '$location', 'authService',
		function($scope, $rootScope, $window, $location, authService){
			$scope.userAuth = {};
			$scope.login = function(userAuth) {
				authService.login(userAuth).then( function (response) {
					$window.localStorage.token = response.data.token;
					authService.isLogged();
					$location.path('/home');

				}, function (response) {
					delete $window.localStorage.token;
					$scope.error = true;
				});
			};

	}]);

})();
