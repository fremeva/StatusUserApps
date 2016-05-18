/*
 * Patrimonio Factory
 * Servicio para calcular y obtener los datos e informacion
 * del patrimonio del usuario
 */
(function () {
	var servicesModule = angular.module('AppServices');
	servicesModule.factory('patrimonioUserFactory', ['$rootScope', function ($rootScope) {
		var patrimonio = {}

		/********************   Métodos    **************************/
		//Metodo para capturar los datos del usuario{};
		patrimonio.setPatrimonioData = function (data, edificios) {
			patrimonio.colaboracion = data.colaboracion;
			patrimonio.flexibilidad = data.flexibilidad;
			patrimonio.innovacion = data.innovacion;

			//Añadiendo los edificios
			patrimonio.colaboracion.edificios = edificios.colaboracion;
			patrimonio.flexibilidad.edificios = edificios.flexibilidad;
			patrimonio.innovacion.edificios = edificios.innovacion;

		};

		//Metodo que devuelve el nombre completo del usuario
		patrimonio.getSumatoriaPrecioVivienda = function () {
			return patrimonio.colaboracion.valor_propiedades_construidas + patrimonio.flexibilidad.valor_propiedades_construidas +
				patrimonio.innovacion.valor_propiedades_construidas;
		}

		patrimonio.getSumPropConstruida = function () {
			return patrimonio.colaboracion.propiedades_construidas + patrimonio.flexibilidad.propiedades_construidas +
				patrimonio.innovacion.propiedades_construidas;
		}

		patrimonio.convertToDoughnutChartDataFormat = function(barrio) {
			var labels = [];
			var datas = [];
			var porcent_construido = 0;
			if (barrio.edificios == 0) {
				labels.push("NO-CONSTRUIDO");
				datas.push(100);
				porcent_construido=0;
			} else {
				var num_porcent_barrio = 100 / parseInt(barrio.propiedades_maximo);
				if (barrio.propiedades_construidas != 0 &&
					barrio.propiedades_construidas < barrio.propiedades_maximo) {
					barrio.edificios.forEach(function (item, index) {
						labels.push(item.etiqueta);
						datas.push(num_porcent_barrio);
					});
					porcent_construido = num_porcent_barrio * barrio.propiedades_construidas;
					var numporc_noconstruido = 100 - porcent_construido;
					labels.push("NO-CONSTRUIDO");
					datas.push(numporc_noconstruido);
					/*var dif = barrioObject.propiedades_maximo - barrioObject.propiedades_construidas;
					for (var i = 0; i < dif; i++) {
						$scope.labels_flexibilidad.push("Ed. No construido");
						$scope.data_flexibilidad.push(num_porcent_barrio);
					}*/

				} else {
					barrio.edificios.forEach(function (item, index) {
						labels.push(item.etiqueta);
						datas.push(num_porcent_barrio);
					});
					porcent_construido=100;
				}
			}
			console.log(porcent_construido);
			return  {
				label: labels,
				data: datas,
				porcent: porcent_construido
			};
		}

		return patrimonio; //retorna el objeto Patrimonio{};

	}])

})();
