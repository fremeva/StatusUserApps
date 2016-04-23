(function () {

	var controllerModule = angular.module('AppControllers');

	controllerModule.controller('statusController', ['$scope', '$rootScope', '$location', 'userService',
		function ($scope, $rootScope, $location, userService) {
			$scope.getInformacionUsuario = function (usuario_id) {
				userService.getInfoUser(usuario_id).then(function successCallBack(response) {
					$scope.user = response.data;

				}, function errorCallBack(response) {
					$location.path('/home');

				});
			};


			$scope.getInformacionUsuario($rootScope.idUserLoggedIn);



		}])

})();
