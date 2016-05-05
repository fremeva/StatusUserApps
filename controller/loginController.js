(function(){

	var controllerModule = angular.module('AppControllers');

	controllerModule.controller('loginController', ['$scope', '$rootScope', '$window', '$location', 'authService',
		function($scope, $rootScope, $window, $location, authService){
			$scope.user = {};

			$scope.login = function(user) {
				authService.login(user).then( function successCallBack(response) {
					$window.localStorage.token = response.data.token;
					authService.isLogged();
					$location.path('/home');

				}, function errorCallBack(response) {
					delete $window.localStorage.token;
					$scope.error = true;

				});
			};

	}]);

})();
