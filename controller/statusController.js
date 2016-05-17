(function () {

		var controllerModule = angular.module('AppControllers');

		controllerModule.controller('statusController', ['$scope', '$rootScope', '$location', '_', 'userService', 'userFactory'

				, 'balanceChartFactory', 'patrimonioUserFactory'

				, function ($scope, $rootScope, $location, _, userService, userFactory, balanceChartFactory, patrimonioUserFactory) {
					// Id del usuario Autenticado.
					var _idUser = $rootScope.idUserLoggedIn;

					//Obtener el patrimonio del usuario.
					userService.getEdificioUsuario(_idUser).then(function (response) {
						var edificios = response.data;
						userService.getPatrimonioEdificio(_idUser).then(function (response) {
							patrimonioUserFactory.setPatrimonioData(response.data, edificios);
							$scope.patrimonioUser = patrimonioUserFactory;
							var dataChart =
								$scope.patrimonioUser.convertToDoughnutChartDataFormat($scope.patrimonioUser.flexibilidad);
							showDonoutCharFlexibilidad(dataChart);
							dataChart =
								$scope.patrimonioUser.convertToDoughnutChartDataFormat($scope.patrimonioUser.colaboracion);
							showDonoutCharColaboracion(dataChart);
							dataChart =
								$scope.patrimonioUser.convertToDoughnutChartDataFormat($scope.patrimonioUser.innovacion);
							showDonoutCharInnovacion(dataChart);

						});
					}, function (error) {
						$location.path('/home');
					});

					//Obtener la informacion del usuario.
					userService.getInfoUser(_idUser).then(function (response) {
						userFactory.setUserData(response.data);
						$scope.user = userFactory;
						$scope.user.saludObj = userFactory.getSalud();
						paintSliderChart($scope.user.saludObj); //Pintar Slider de la salud del usuario.
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
					var showDonoutCharFlexibilidad = function (dataChart) {
						$scope.labels_flexibilidad = dataChart.label;
						$scope.data_flexibilidad = dataChart.data;
						$scope.onClickFlexibilidad = function (points, evt) {
							var barrio = $scope.patrimonioUser.flexibilidad
							showDetalleEdificioEvent(points, barrio.nombre_barrio, barrio.edificios);
						};
					}
					var showDonoutCharColaboracion = function (dataChart) {
						$scope.labels_Colaboracion = dataChart.label
						$scope.data_Colaboracion = dataChart.data
						$scope.onClickColaboracion = function (points, evt) {
							var barrio = $scope.patrimonioUser.colaboracion
							showDetalleEdificioEvent(points, barrio.nombre_barrio, barrio.edificios);
						};
					}
					var showDonoutCharInnovacion = function (dataChart) {
						$scope.labels_Innovacion = dataChart.label;
						$scope.data_Innovacion = dataChart.data
						$scope.onClickInnovacion = function (points, evt) {
							var barrio = $scope.patrimonioUser.innovacion
							showDetalleEdificioEvent(points, barrio.nombre_barrio, barrio.edificios);
						};
					}
					var showDetalleEdificioEvent = function(points, nombreBarrio, edificios){
						if (points[0].label === "NO-CONSTRUIDO") {
								alert(
									"Nombre del Barrio: " + nombreBarrio + "\n" + "\n" +
									"EDIFICIO(S) NO CONSTRUIDO: Te falta el " + points[0].value + "% para terminar"
								);
							}else {
								var edificio = _.find(edificios, function (o) { return o.etiqueta == points[0].label;});
								alert(
									"Nombre del Barrio: " + nombreBarrio + "\n" + "\n" +
									"Etiqueta: " +  edificio.etiqueta + "\n" +
									"Info: " +  edificio.info + "\n" +
									"Precio: " +  edificio.precio + "\n" +
									"Imagen: " +  edificio.imagen + "\n" +
									"Mejoras (Arreglo): " +  edificio.mejoras + "\n"
								);

								/*$uibModal.open({
									templateUrl: 'addToDoModal'
									, controller: 'statusController.addToDoModal'
									, size: 'md'
								}).result.then(function (t) {

								});*/
							}
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

			/*controllerModule.controller('statusController.addToDoModal', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
		$scope.todo = {};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

		$scope.ok = function () {

			$modalInstance.close($scope.todo);
		};
    }]);*/


})();
