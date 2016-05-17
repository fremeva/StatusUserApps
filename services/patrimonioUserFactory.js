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
			return patrimonio.colaboracion.valor_propiedades_construidas
				   + patrimonio.flexibilidad.valor_propiedades_construidas
				   + patrimonio.innovacion.valor_propiedades_construidas;
		}

		patrimonio.getSumPropConstruida = function(){
			return patrimonio.colaboracion.propiedades_construidas
				   + patrimonio.flexibilidad.propiedades_construidas
				   + patrimonio.innovacion.propiedades_construidas;
		}

		return patrimonio; //retorna el objeto Patrimonio{};

	}])

})();
