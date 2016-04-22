(function () {

	var controllerModule = angular.module('AppControllers');

	controllerModule.controller('statusController', ['$scope', '$rootScope', '$location', 'userService',
		function ($scope, $rootScope, $location, userService) {
			$scope.getInformacionUsuario = function (usuario_id) {
				userService.getInfoUser(usuario_id).then(function successCallBack(response) {
					$scope.user = response.data;
					console.log($scope.userData);

				}, function errorCallBack(response) {
					console.log(response);
					$location.path('/home');
					console.log($location);
				});
			};


			$scope.getInformacionUsuario($rootScope.idUserLoggedIn);



		}])

})();
