(function () {

	var controllerModule = angular.module('AppControllers');

	controllerModule.controller('statusController', [
		'$scope', '$rootScope', '$location', 'userService', 'userFactory', 'balanceChartFactory',
		function ($scope, $rootScope, $location, userService, userFactory, balanceChartFactory) {
			// Id del usuario Autenticado.
			var _idUser = $rootScope.idUserLoggedIn;

			//Obtener la informacion del usuario.
			userService.getInfoUser(_idUser).then(function (response) {
				userFactory.setUserData(response.data);
				$scope.user = userFactory;
				$scope.user.saludObj = userFactory.getSalud();
				paintSliderChart($scope.user.saludObj); //Pintar Slider de la salud del usuario.

				//Show Donout Charts
				showDonoutChar();

			}, function (error) {
				$location.path('/home');
			});

			//Obtener el balance del usuario.
			userService.getBalance(_idUser).then(function (response) {
				balanceChartFactory.runProcess(response.data);
				paintChartCash(balanceChartFactory);
				paintChartUnidadOro(balanceChartFactory);
			}, function (error) {
				$location.path('/home');
			});

			/*userService.getCiudadUsuario(_idUser).then(function(response){
				console.log(response.data);

			}, function(error){

			});*/


			$scope.getStyle = function () {
				var transform = ($scope.isSemi ? '' : 'translateY(50%) ') + 'translateX(-50%)';
				return {
					'top': $scope.isSemi ? 'auto' : '50%'
					, 'bottom': $scope.isSemi ? '5%' : 'auto'
					, 'left': '50%'
					, 'transform': transform
					, '-moz-transform': transform
					, '-webkit-transform': transform
					, 'font-size': $scope.radius / 3.5 + 'px'
				};
			};

			/************** Charts Functions ********************/
			var showDonoutChar = function () {
				$scope.labels_barrio = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
				$scope.data_barrio = [300, 500, 100];
				$scope.onClick = function (points, evt) {
					//console.log(points, evt);
				};
			}

			var paintSliderChart = function (salud) {
				var saludInt = parseInt(salud.value);
				$scope.sliderSalud = {
					value: saludInt
					, options: {
						floor: 0
						, ceil: 100
						, readOnly: true
						, showTicksValues: 25
						, showSelectionBar: true
						, getSelectionBarColor: function () {
							return salud.color
						}
						, getPointerColor: function () {
							return salud.color
						}
					}
				};
			}

			var paintChartCash = function (balance) {
				$scope.labels_cash = balance.getLabelsCash();
				$scope.series_cash = balance.getSeriesCash();
				$scope.data_cash = balance.getDataCash();
				$scope.canvas_cash_show = $scope.labels_cash.length != 0 ? true : false;
			}

			var paintChartUnidadOro = function (balance) {
				$scope.labels_unid_oro = balance.getLabelsUnidadOro();
				$scope.series_unid_oro = balance.getSeriesUnidadOro();
				$scope.data_unid_oro = balance.getDataUnidadOro();
				$scope.canvas_unid_oro_show = $scope.labels_unid_oro.length != 0 ? true : false;
			}

		 }])



})();
