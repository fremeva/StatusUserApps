/*
 * Balance Chart Factory
 * Servicio para calcular, procesar y obtener los datos e informacion
 * del balance de ingresos y egreso del usuario en la aplicacion para dibular los charts requeridos.
 */
(function () {
	var servicesModule = angular.module('AppServices');
	servicesModule.factory('balanceChartFactory', [function () {
		var balance = {}

		//Propiedades
		balance.labels_cash = [];
		balance.arrayIngresos = [];
		balance.arrayGastos = [];
		balance.labels_unid_oro = [];
		balance.arrayIngresos_unid_oro = [];
		balance.arrayGastos_unid_oro = [];
		balance.series_cash = ['Ingresos', 'Gastos'];
		balance.series_unid_oro = ['Ingresos', 'Gastos'];

		/********************   Métodos    **************************/

		//Metodo para capturar y procesar los datos del balance usuario{};
		balance.runProcess = function (data) {
			data.forEach(function (obj, index) {
				var fecha = obj.fecha_creacion.substring(0, 10);
				if (obj.destino_movimiento === "monedero") {
					var isFind = balance.labels_cash.indexOf(fecha);
					if (isFind == -1) {
						balance.labels_cash.push(fecha);
						if (obj.tipo_movimiento === "ingreso") {
							balance.arrayIngresos.push(obj.monedero);
							balance.arrayGastos.push(0);
						} else {
							balance.arrayGastos.push(obj.monedero);
							balance.arrayIngresos.push(0);
						}
					} else {
						if (obj.tipo_movimiento === "ingreso") {
							balance.arrayIngresos[isFind] = balance.arrayIngresos[isFind] + obj.monedero;
						} else {
							balance.arrayGastos[isFind] = balance.arrayGastos[isFind] + obj.monedero;
						}
					}

				} else {

					var isFind = balance.labels_unid_oro.indexOf(fecha);
					if (isFind == -1) {
						balance.labels_unid_oro.push(fecha);
						if (obj.tipo_movimiento === "ingreso") {
							balance.arrayIngresos_unid_oro.push(obj.unidades_oro);
							balance.arrayGastos_unid_oro.push(0);
						} else {
							balance.arrayGastos_unid_oro.push(obj.unidades_oro);
							balance.arrayIngresos_unid_oro.push(0);
						}
					} else {
						if (obj.tipo_movimiento === "ingreso") {
							balance.arrayIngresos_unid_oro[isFind] = balance.arrayIngresos_unid_oro[isFind] + obj.unidades_oro;
						} else {
							balance.arrayGastos_unid_oro[isFind] = balance.arrayGastos_unid_oro[isFind] + obj.unidades_oro;

						}
					}

				}

			});
		};

		// GET Methods
		//Metodo que devuelve los labels del grafico para el Cash
		balance.getLabelsCash = function () {
			return balance.labels_cash;
		}

		//Metodo que devuelve los labels del grafico para las unidades de oro
		balance.getLabelsUnidadOro = function () {
			return balance.labels_unid_oro;
		}

		//Metodo que devuelve los datos del grafico para el Cash
		balance.getDataCash = function () {
			var data = [balance.arrayIngresos, balance.arrayGastos]
			return data;
		}

		//Metodo que devuelve los datas para grafico de las unidades de oro
		balance.getDataUnidadOro = function () {
			var data = [balance.arrayIngresos_unid_oro, balance.arrayGastos_unid_oro];
			return data;
		}

		//Metodo que devuelve las series del grafico para el Cash
		balance.getSeriesCash = function () {
			return balance.series_cash;
		}

		//Metodo que devuelve las series para grafico de las unidades de oro
		balance.getSeriesUnidadOro = function () {
			return balance.series_unid_oro;
		}

		return balance; //retorna el objeto balance{};

	}])

})();
