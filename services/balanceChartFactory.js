/*
 * Balance Chart Factory
 * Servicio para calcular, procesar y obtener los datos e informacion
 * del balance de ingresos y egreso del usuario en la aplicacion para dibular los charts requeridos.
 */
(function () {
	var servicesModule = angular.module('AppServices');
	servicesModule.factory('balanceChartFactory', ['_', function (_) {
		var balance = {}
		var series = ['Ingresos', 'Gastos'];
		var monederoArray = [];
		var unidadesOroArray = [];

		var soloAnnoArray = [];
		var mesArray = [];
		var diaArray = [];
		var arraySemana = [];


		balance.runProcess = function (data) {
			llenarArraysFechas(_.map(data, 'fecha_creacion'));
			monederoArray = _.reject(data, {
				'destino_movimiento': "unidades_oro"
			});
			unidadesOroArray = _.reject(data, {
				'destino_movimiento': "monedero"
			});
		}

		// GET Methods
		//Metodo que devuelve los labels del grafico  x Mes
		balance.getLabelsPorMes = function () {
			return mesArray;
		}

		//Metodo que devuelve los labels del grafico x dias
		balance.getLabelsPorDia = function () {
			return diaArray;
		}

		//Metodo que devuelve los labels del grafico x Horas
		/*balance.getLabelsPorHoras = function () {
			return labelHorasFormat;
		}*/

		//Metodo que devuelve los labels del grafico  x Semanas
		balance.getLabelsPorSemana = function () {
			return arraySemana;
		}

		//Metodo que devuelve el array de series del grafico
		balance.getSeries = function () {
			return series;
		}

		//Metodo que devuelve los datos del grafico para el Cash x Horas
		balance.getDataPorHoras = function (type, fechaSearch) {
			if (!type) return null;
			var typeArray = [];
			if (type == "cash")
				typeArray = monederoArray;
			else
				typeArray = unidadesOroArray;

			var arrayIngresos = [];
			var arrayGastos = [];
			var HorasFormat = [];
			var labelHorasFormat = [];

			typeArray.forEach(function (item) {
				var fecha = objectDateConverted(new Date(item.fecha_creacion));
				if (fechaSearch == fecha.day) {
					var posFound = HorasFormat.indexOf(String(fecha.hora));
					if (posFound == -1) {
						HorasFormat.push(fecha.hora);
						var hora = (fecha.hora.split(" ")[1] < 10 ? '0' : '') + fecha.hora.split(" ")[1] + ":00";
						labelHorasFormat.push(hora);
						if (item.tipo_movimiento === "ingreso") {
							if (type == "cash") {
								arrayIngresos.push(item.monedero);
								arrayGastos.push(0);
							} else {
								arrayIngresos.push(item.unidades_oro);
								arrayGastos.push(0);
							}
						} else {
							if (type == "cash") {
								arrayIngresos.push(0);
								arrayGastos.push(item.monedero);
							} else {
								arrayIngresos.push(0);
								arrayGastos.push(item.unidades_oro);
							}
						}
					} else {
						if (item.tipo_movimiento === "ingreso") {
							arrayIngresos[posFound] = type == "cash" ?
								arrayIngresos[posFound] + item.monedero : arrayIngresos[posFound] + item.unidades_oro;
						} else {
							arrayGastos[posFound] = type == "cash" ?
								arrayGastos[posFound] + item.monedero : arrayGastos[posFound] + item.unidades_oro;
						}
					}
					//No hace nada, porque no concuerda la fecha.
				}

			});
			var data = {
				ingresos: arrayIngresos,
				gastos: arrayGastos,
				labels: labelHorasFormat
			}
			return data;

		}

		//Metodo que devuelve los datos del grafico para el Cash x dias
		balance.getDataPorDia = function (type) {
			if (!type) return null;
			var typeArray = [];
			if (type == "cash")
				typeArray = monederoArray;
			else
				typeArray = unidadesOroArray;

			var arrayIngresos = [];
			var arrayGastos = [];
			for (var i in typeArray) {
				arrayIngresos.push(0);
				arrayGastos.push(0);
			}
			typeArray.forEach(function (item) {
				var fecha = objectDateConverted(new Date(item.fecha_creacion));
				var posFound = diaArray.indexOf(String(fecha.day));

				if (item.tipo_movimiento === "ingreso") {
					arrayIngresos[posFound] = type == "cash" ?
						arrayIngresos[posFound] + item.monedero : arrayIngresos[posFound] + item.unidades_oro;
				} else {
					arrayGastos[posFound] = type == "cash" ?
						arrayGastos[posFound] + item.monedero : arrayGastos[posFound] + item.unidades_oro;
				}

			});

			return [arrayIngresos, arrayGastos];

		}

		//Metodo que devuelve los datos del grafico para el Cash x Semana
		balance.getDataPorSemana = function (type) {
			if (!type) return null;
			var typeArray = [];
			if (type == "cash")
				typeArray = monederoArray;
			else
				typeArray = unidadesOroArray;

			var arrayIngresos = [];
			var arrayGastos = [];
			for (var i in typeArray) {
				arrayIngresos.push(0);
				arrayGastos.push(0);
			}
			typeArray.forEach(function (item) {
				var semana = convertFormatoSemana(new Date(item.fecha_creacion).getSemana(1));
				var posFound = arraySemana.indexOf(String(semana));
				if (item.tipo_movimiento === "ingreso") {
					arrayIngresos[posFound] = type == "cash" ?
						arrayIngresos[posFound] + item.monedero : arrayIngresos[posFound] + item.unidades_oro;
				} else {
					arrayGastos[posFound] = type == "cash" ?
						arrayGastos[posFound] + item.monedero : arrayGastos[posFound] + item.unidades_oro;
				}

			});

			return [arrayIngresos, arrayGastos];

		}

		//Metodo que devuelve los datos del grafico para el Cash x Mes
		balance.getDataPorMes = function (type) {
			if (!type) return null;
			var typeArray = [];
			if (type == "cash")
				typeArray = monederoArray;
			else
				typeArray = unidadesOroArray;

			var arrayIngresos = [];
			var arrayGastos = [];
			for (var i in typeArray) {
				arrayIngresos.push(0);
				arrayGastos.push(0);
			}
			typeArray.forEach(function (item) {
				var fecha = objectDateConverted(new Date(item.fecha_creacion));
				var posFound = mesArray.indexOf(String(fecha.mesAnno));
				if (item.tipo_movimiento === "ingreso") {
					arrayIngresos[posFound] = type == "cash" ?
						arrayIngresos[posFound] + item.monedero : arrayIngresos[posFound] + item.unidades_oro;
				} else {
					arrayGastos[posFound] = type == "cash" ?
						arrayGastos[posFound] + item.monedero : arrayGastos[posFound] + item.unidades_oro;
				}

			});

			return [arrayIngresos, arrayGastos];

		}

		var llenarArraysFechas = function (array) {
			array.forEach(function (value) {
				var date = new Date(value);
				var fechaObject = objectDateConverted(date);
				if (soloAnnoArray.indexOf(fechaObject.anno) == -1)
					soloAnnoArray.push(String(fechaObject.anno));
				if (mesArray.indexOf(String(fechaObject.mesAnno)) == -1)
					mesArray.push(String(fechaObject.mesAnno));
				if (diaArray.indexOf(String(fechaObject.day)) == -1)
					diaArray.push(String(fechaObject.day));

				var semanaFormat = convertFormatoSemana(date.getSemana(1));
				if (arraySemana.indexOf(String(semanaFormat)) == -1)
					arraySemana.push(String(semanaFormat));
			});

		};

		var convertFormatoSemana = function (semana) {
			return objectDateConverted(semana[0]).day + "-" + objectDateConverted(semana[1]).day;
		}
		var objectDateConverted = function (dateFormat) {
			return {
				anno: String(dateFormat.getFullYear())
				, mesAnno: String(dateFormat.getFullYear()) + "/" + (dateFormat.getMonth() + 1)
				, day: String(dateFormat.getFullYear()) + "/" + (dateFormat.getMonth() + 1) + "/" + (dateFormat.getDate())
				, hora: String(dateFormat.getFullYear()) + "/" +
					(dateFormat.getMonth() + 1) + "/" + (dateFormat.getDate()) + " " + (dateFormat.getHours())
			};
		}

		return balance;

	}])

	//Extencion Date.
	Date.prototype.getSemana = function (start) {
		//Calcing the starting point
		start = start || 0;
		var today = new Date(this.setHours(0, 0, 0, 0));
		var day = today.getDay() - start;
		var date = today.getDate() - day;

		// Grabbing Start/End Dates
		var StartDate = new Date(today.setDate(date));
		var EndDate = new Date(today.setDate(date + 6));
		return [StartDate, EndDate];
	}



})();
