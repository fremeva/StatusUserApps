(function () {

	var controllerModule = angular.module('AppControllers');

	controllerModule.controller('statusController', ['$scope', '$rootScope', '$location', 'userService', 'calculoStatusService',
		function ($scope, $rootScope, $location, userService,calculoStatusService) {
			var _idUser = $rootScope.idUserLoggedIn;
			//Metodo para obtener la informacion del usuario
			$scope.getInformacionUsuario = function (usuario_id) {
				userService.getInfoUser(usuario_id).then(function successCallBack(response) {
					$scope.user = response.data;

					console.log($scope.user.sesion.energia);
					console.log($scope.user.sesion.compromiso);
					console.log($scope.user.sesion.conocimiento);


					$scope.saludUser = calculoStatusService.getSaludUser($scope.user.sesion.energia, $scope.user.sesion.compromiso, $scope.user.sesion.conocimiento )

					console.log($scope.saludUser);

				}, function errorCallBack(response) {
					$location.path('/home');

				});
			};

			/*//Metodo para obtener la sesion del usuario
			$scope.getUsuarioSesion = function (usuario_id) {
				userService.getSessionUsuario(usuario_id).then(function successCallBack(response){
					$scope.SessionUser = response.data;
					console.log($scope.SessionUser);

				}, function errorCallBack(response){
					console.log(response);
				});
			} */

			$scope.getInformacionUsuario(_idUser);
			//$scope.getUsuarioSesion(_idUser);



		}])

})();
