(function () {

	var controllerModule = angular.module('AppControllers');

	controllerModule.controller('statusController', ['$scope','$rootScope', '$location', 'userService', 'userFactory',
													 'balanceChartFactory', 'patrimonioUserFactory',
		function ($scope, $rootScope, $location, userService, userFactory, balanceChartFactory,patrimonioUserFactory
		) {
			// Id del usuario Autenticado.
			var _idUser = $rootScope.idUserLoggedIn;

			//Obtener el patrimonio del usuario.
			userService.getEdificioUsuario(_idUser).then(function (response){
				//edificiosUserFactory.setEdificioData(response.data);
				var edificios = response.data;
				userService.getPatrimonioEdificio(_idUser).then(function (response){
					patrimonioUserFactory.setPatrimonioData(response.data, edificios);
					$scope.patrimonioUser = patrimonioUserFactory;
					console.log($scope.patrimonioUser);
					paintDoughnutToBarrioFlexibilidad($scope.patrimonioUser.flexibilidad);
					paintDoughnutToBarrioColaboracion($scope.patrimonioUser.colaboracion);
					paintDoughnutToBarrioInnovacion($scope.patrimonioUser.innovacion);
				});
			}, function (error){
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

			var paintDoughnutToBarrioFlexibilidad = function (barrioObject){

				$scope.labels_flexibilidad = [];
				$scope.data_flexibilidad = [];

				if(barrioObject.edificios ==0){
					$scope.labels_flexibilidad.push("Ed. No construido");
					$scope.data_flexibilidad.push(100);
				}
				else{
					var num_porcent_barrio = 100/parseInt(barrioObject.propiedades_maximo);
					if(barrioObject.propiedades_construidas != 0 &&
					   barrioObject.propiedades_construidas < barrioObject.propiedades_maximo)
					{
						barrioObject.edificios.forEach(function (item, index) {
								$scope.labels_flexibilidad.push(item.info);
								$scope.data_flexibilidad.push(num_porcent_barrio);
						});
						var dif = barrioObject.propiedades_maximo - barrioObject.propiedades_construidas;
						for(var i=0;i<dif;i++){
							$scope.labels_flexibilidad.push("Ed. No construido");
							$scope.data_flexibilidad.push(num_porcent_barrio);
						}

					}
					else
					{
						barrioObject.edificios.forEach(function (item, index) {
							$scope.labels_flexibilidad.push(item.info);
							$scope.data_flexibilidad.push(item.precio);
						});
					}
				}

			}

			var paintDoughnutToBarrioColaboracion = function (barrioObject){

				$scope.labels_Colaboracion = []
				$scope.data_Colaboracion = []

				if(barrioObject.edificios ==0){
					$scope.labels_Colaboracion.push("Ed. No construido");
					$scope.data_Colaboracion.push(100);
				}
				else{
					var num_porcent_barrio = 100/parseInt(barrioObject.propiedades_maximo);
					if(barrioObject.propiedades_construidas != 0 &&
					   barrioObject.propiedades_construidas < barrioObject.propiedades_maximo)
					{
						barrioObject.edificios.forEach(function (item, index) {
								$scope.labels_Colaboracion.push(item.info);
								$scope.data_Colaboracion.push(num_porcent_barrio);
						});
						var dif = barrioObject.propiedades_maximo - barrioObject.propiedades_construidas;
						for(var i=0;i<dif;i++){
							$scope.labels_Colaboracion.push("Ed. No construido");
							$scope.data_Colaboracion.push(num_porcent_barrio);
						}

					}
					else
					{
						barrioObject.edificios.forEach(function (item, index) {
							$scope.labels_Colaboracion.push(item.info);
							$scope.data_Colaboracion.push(item.precio);
						});
					}
				}

			}

			var paintDoughnutToBarrioInnovacion = function (barrioObject){

				$scope.labels_Innovacion = []
				$scope.data_Innovacion = []

				if(barrioObject.edificios ==0){
					$scope.labels_Innovacion.push("Ed. No construido");
					$scope.data_Innovacion.push(100);
				}
				else{
					var num_porcent_barrio = 100/parseInt(barrioObject.propiedades_maximo);
					if(barrioObject.propiedades_construidas != 0 &&
					   barrioObject.propiedades_construidas < barrioObject.propiedades_maximo)
					{
						barrioObject.edificios.forEach(function (item, index) {
								$scope.labels_Innovacion.push(item.info);
								$scope.data_Innovacion.push(num_porcent_barrio);
						});
						var dif = barrioObject.propiedades_maximo - barrioObject.propiedades_construidas;
						for(var i=0;i<dif;i++){
							$scope.labels_Innovacion.push("Ed. No construido");
							$scope.data_Innovacion.push(num_porcent_barrio);
						}

					}
					else
					{
						barrioObject.edificios.forEach(function (item, index) {
							$scope.labels_Innovacion.push(item.info);
							$scope.data_Innovacion.push(item.precio);
						});
					}
				}

			}


			//$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"]; $scope.data = [35, 15, 50];

		 }])



})();
