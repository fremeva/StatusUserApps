(function () {

	var controllerModule = angular.module('AppControllers');

	controllerModule.controller('statusController', ['$scope', '$rootScope', '$location', 'userService', 'userObjectService'



		, function ($scope, $rootScope, $location, userService, userObjectService) {

			var _idUser = $rootScope.idUserLoggedIn; // Id del usuario Autenticado.

			//OBETNER LA INFORMACION DEL USUARIO AUTENTICADO
			userService.getInfoUser(_idUser).then(function (response) {
				userObjectService.setUserData(response.data);
				//console.log(response.data);
			}, function (error) {
				$location.path('/home');
			});

			//OBTENER EL BALANCE DEL USUARIO AUTENTICADO
			userService.getBalance(_idUser).then(function (response) {
				//userObjectService.setUserBalance(response.data);
				console.log("########################################");
				console.log(response.data);
				console.log("########################################");
				//console.log(response.data);
			}, function (error) {
				$location.path('/home');
			});

			$scope.showDonoutChar = function () {
				$scope.labels_barrio = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
				$scope.data_barrio = [300, 500, 100];
			}



			$scope.showCashChar = function () {
				$scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
				$scope.series = ['Series A', 'Series B'];
				$scope.data = [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]];
			}

			$scope.showUnidOroChar = function () {
				$scope.labels_meses = ["January", "February", "March", "April", "May", "June", "July"];
				$scope.series_meses = ['Series A', 'Series B'];
				$scope.data_meses = [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]];
				$scope.onClick = function (points, evt) {
					console.log(points, evt);
				};
			}


			//$scope.getInformacionUsuario(_idUser);
			$scope.user = userObjectService;
			$scope.showDonoutChar();
			$scope.showCashChar();
			$scope.showUnidOroChar();
			//console.log($scope.user);

		}])

})();
