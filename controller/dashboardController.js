(function () {
	var controllerModule = angular.module('AppControllers');
	controllerModule.controller('dashboardController', ['$scope', '$rootScope', '$location', '_', '$uibTooltip', '$uibModal',
		'userFactory', 'userService', 'balanceChartFactory', 'patrimonioUserFactory',
		function ($scope, $rootScope, $location, _, $uibTooltip, $uibModal, userFactory, userService,
				   balanceChartFactory, patrimonioUserFactory)
		{
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
					showDonutCharFlexibilidad(dataChart); //Llamada a la funcion para pintar los Donou

					dataChart =
						$scope.patrimonioUser.convertToDoughnutChartDataFormat($scope.patrimonioUser.colaboracion);
					showDonutCharColaboracion(dataChart);

					dataChart =
						$scope.patrimonioUser.convertToDoughnutChartDataFormat($scope.patrimonioUser.innovacion);
					showDonutCharInnovacion(dataChart);

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
				$scope.paintChartCashPorMes(balanceChartFactory);
				$scope.paintChartUnidadOroPorMes(balanceChartFactory);
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
			var showDonutCharFlexibilidad = function (dataChart) {
				$scope.labels_flexibilidad = dataChart.label;
				$scope.data_flexibilidad = dataChart.data;
				$scope.porcent_flexibilidad = dataChart.porcent
				$scope.onClickFlexibilidad = function (points, evt) {
					var barrio = $scope.patrimonioUser.flexibilidad
					showModalEvent(points, barrio.nombre_barrio, barrio.edificios);
				};
			}
			var showDonutCharColaboracion = function (dataChart) {
				$scope.labels_Colaboracion = dataChart.label
				$scope.data_Colaboracion = dataChart.data;
				$scope.porcent_colaboracion = dataChart.porcent;
				$scope.onClickColaboracion = function (points, evt) {
					var barrio = $scope.patrimonioUser.colaboracion
					showModalEvent(points, barrio.nombre_barrio, barrio.edificios);
				};
			}
			var showDonutCharInnovacion = function (dataChart) {
				$scope.labels_Innovacion = dataChart.label;
				$scope.data_Innovacion = dataChart.data;
				$scope.porcent_innovacion = dataChart.porcent;
				$scope.onClickInnovacion = function (points, evt) {
					var barrio = $scope.patrimonioUser.innovacion
					showModalEvent(points, barrio.nombre_barrio, barrio.edificios);
				};
			}
			var showModalEvent = function (points, nombreBarrio, edificios) {
				var edificioSelected = {}; //Edificio seleccionado
				edificioSelected.isConstruido = false;
				if (points[0].label === "NO-CONSTRUIDO") {
					edificioSelected.info = "Edificio(s) no construido(s); falta el " + points[0].value
						+ "% para terminar de construir los edificios del barrio " + nombreBarrio;
				} else {
					edificioSelected = _.find(edificios, function (o) {
						return o.etiqueta == points[0].label;
					});
					edificioSelected.isConstruido = true;
				}
				var modalInstance = $uibModal.open({
					animation: true
					, templateUrl: 'template/views/dashboard/detalleEdificioModal.html'
					, controller: 'detalleEdificoCtrl'
					, resolve: {
						items: function () {
							return {
								points: points
								, nombreBarrio: nombreBarrio
								, edificio: edificioSelected
							};
						}
					}
				});

			}

			$scope.dayArray = balanceChartFactory.getLabelsPorDia();
			$scope.paintChartCashPorDia = function () {
				$scope.labels_cash_dia = balanceChartFactory.getLabelsPorDia();
				$scope.series_cash_dia = balanceChartFactory.getSeries();
				$scope.data_cash_dia = balanceChartFactory.getDataPorDia("cash");
				$scope.canvas_cash_show_dia = true;
			}
			$scope.paintChartCashPorSemana = function () {
				$scope.labels_cash_semana = balanceChartFactory.getLabelsPorSemana();
				$scope.series_cash_semana = balanceChartFactory.getSeries();
				$scope.data_cash_semana = balanceChartFactory.getDataPorSemana("cash");
				$scope.canvas_cash_show_semana = true;
			}
			$scope.paintChartCashPorMes = function (balance) {
				$scope.labels_cash_mes = balanceChartFactory.getLabelsPorMes();
				$scope.series_cash_mes = balanceChartFactory.getSeries();
				$scope.data_cash_mes = balanceChartFactory.getDataPorMes("cash");
				$scope.canvas_cash_show_mes = true;
			}
			$scope.paintChartCashPorHora = function(fecha){
				//var fecha = $scope.selectedFechaToCash;
				var dataToChart = balanceChartFactory.getDataPorHoras("cash", fecha);
				$scope.labels_cash_horas = dataToChart.labels;
				$scope.series_cash_horas = balanceChartFactory.getSeries();
				$scope.data_cash_horas = [dataToChart.ingresos, dataToChart.gastos]
				$scope.showChartCashHora = true;
			}

			$scope.paintChartUnidadOroPorDia = function () {
				$scope.labels_unidades_oros_dia = balanceChartFactory.getLabelsPorDia();
				$scope.series_unidades_oros_dia = balanceChartFactory.getSeries();
				$scope.data_unidades_oros_dia = balanceChartFactory.getDataPorDia("unidades_oros");
				$scope.canvas_unidades_oros_show_dia = true;
			}
			$scope.paintChartUnidadOroPorSemana = function () {
				$scope.labels_unidades_oros_semana = balanceChartFactory.getLabelsPorSemana();
				$scope.series_unidades_oros_semana = balanceChartFactory.getSeries();
				$scope.data_unidades_oros_semana = balanceChartFactory.getDataPorSemana("unidades_oros");
				$scope.canvas_unidades_oros_show_semana = true;
			}
			$scope.paintChartUnidadOroPorMes = function (balance) {
				$scope.labels_unidades_oros_mes = balance.getLabelsPorMes();
				$scope.series_unidades_oros_mes = balance.getSeries();
				$scope.data_unidades_oros_mes = balance.getDataPorMes("unidades_oros");
				$scope.canvas_unidades_oros_show_mes = true;
			}

			$scope.paintChartUnidadOroPorHora = function(fecha){
				//var fecha = $scope.selectedFechaToCash;
				var dataToChart = balanceChartFactory.getDataPorHoras("unidad_oro", fecha);
				$scope.labels_unidades_oros_horas = dataToChart.labels;
				$scope.series_unidades_oros_horas = balanceChartFactory.getSeries()
				$scope.data_unidades_oros_horas = [dataToChart.ingresos, dataToChart.gastos]
				$scope.showChartUnidadOroHora = true;
			}


		}])

	//Controlador del Modal.
	controllerModule.controller('detalleEdificoCtrl', function ($scope, $uibModalInstance, items) {
		$scope.barrio = items.nombreBarrio;
		$scope.edificio = items.edificio;
		$scope.ok = function () {
			$uibModalInstance.close();
		};
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	});


})();
