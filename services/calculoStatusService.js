(function () {

	var servicesModule = angular.module('AppServices');

	servicesModule.factory('calculoStatusService', [function () {
			return {
				_variablePorcentTotal : Math.random() * (50 - 10) + 10 //ESTO ES DE PRUEBA
					, _valorBarraOro : 20000
					, getEstadoSalud: function (salud) {
						return (salud * 100) / this._variablePorcentTotal;
					}
					, getSaludUser: function (energia, compromiso, conocimiento) {
						return (this.getPerformance(energia, compromiso, conocimiento)) / 3;
					}
					, getPerformance: function (energia, compromiso, conocimiento) {
						return energia + compromiso + conocimiento;
					},
				getPatrimonio: function(viviendas, monedero, unidad_oro){
					return viviendas+monedero+this.convertUnidadOro(unidad_oro)
				}
				, convertUnidadOro: function (unidad_oro){
					return unidad_oro * this._valorBarraOro;
				}
			};
	}
	])

})();
