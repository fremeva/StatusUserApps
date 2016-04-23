(function () {

	var controllerModule = angular.module('AppControllers');

	controllerModule.controller('testController', ['$scope', '$http', '$rootScope',

		function ($scope, $http, $rootScope) {
			var _idUser = $rootScope.idUserLoggedIn;

			$scope.getBalance = function (usuario_id) {
				$http.get(urlhttp + 'balances/' + usuario_id)
					.then(function (response) {
						$scope.balance = response.data;
					});
			};

			$scope.getSessionUsuario = function (usuario_id) {
				$http.get(urlhttp + 'usuarios/' + usuario_id + '/sesion/')
					.then(function (response) {
						$scope.sessionUsuario = response.data;
					});
			};

			$scope.getSessionUsuario(_idUser);
			$scope.getBalance(_idUser);

		}
	])

})();
