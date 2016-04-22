(function(){

	var controllerModule = angular.module('AppControllers');

	controllerModule.controller('loginController', ['$scope', '$rootScope', '$window', '$location', 'authService',
		function($scope, $rootScope, $window, $location, authService){
			$scope.user = {username: 'opblanco', password: 'opblanco'};

			$scope.login = function(user) {
				authService.login(user).then( function successCallBack(response) {

					$window.localStorage.token = response.data.token;
					var payload = JSON.parse($window.atob(response.data.token.split('.')[1]));
					console.log(payload);
					$rootScope.loggedIn = true;
					$rootScope.idUserLoggedIn = payload._id;
					$rootScope.userNameSession = payload.username;
					$location.path('/home');

				}, function errorCallBack(response) {
					delete $window.localStorage.token;
					$rootScope.loggedIn =false;
					$rootScope.idUserLoggedIn = '';
					$rootScope.userNameSession = '';
					$scope.error = true;

				});
			};

	}]);

})();
