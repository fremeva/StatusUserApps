/*
* User Factory
* Servicio para calcular y obtener los datos e informacion
* del comportamiento del usuario en la aplicacion.
*/
(function () {
	var servicesModule = angular.module('AppServices');
	servicesModule.factory('userFactory', ['$rootScope', function ($rootScope) {
		var usuario = {}

		/********************   Métodos    **************************/
		//Metodo para capturar los datos del usuario{};
		usuario.setUserData = function (data) {
			usuario._id = data._id;
			usuario.dni = data.dni;
			usuario.nick = data.username;
			usuario.nombre = data.nombre;
			usuario.apellidos = data.apellidos;
			usuario.email = data.email;
			usuario.empresa_grupo = data.empresa_grupo;
			usuario.departamento = data.departamento;
			usuario.ciudad = data.ciudad;
			usuario.cash = data.sesion.monedero;
			usuario.unidades_oro = data.sesion.unidades_oro;
			usuario.conocimiento = data.sesion.conocimiento;
			usuario.compromiso = data.sesion.compromiso;
			usuario.energia = data.sesion.energia;
			usuario.ciudadSession = data.sesion.ciudad;

		};

		//Metodo que devuelve el nombre completo del usuario
		usuario.getFullName = function () {
			return usuario.nombre + ' ' + usuario.apellidos;
		}

		//Metodo que calcula y devuelve el performances del usuario
		usuario.getPerformance = function () {
			return (usuario.energia + usuario.compromiso + usuario.conocimiento) /3;

		}

		//Metodo que calcula el valor de la salud, estado y el color y devuelve un objeto salud{};
		usuario.getSalud = function () {
			var salud = {}
			salud.value = (this.getPerformance() /*/3*/);

			if (salud.value >= 0 && salud.value < $rootScope.configApp.porcentaje_salud_regular) {
				salud.state = 'Critica';
				salud.color = '#757575';
			}
			if (salud.value >= $rootScope.configApp.porcentaje_salud_regular && salud.value < $rootScope.configApp.porcentaje_salud_optima) {
				salud.state = 'Regular';
				salud.color = '#ffd600';
			}
			if (salud.value >= $rootScope.configApp.porcentaje_salud_optima && salud.value < $rootScope.configApp.porcentaje_salud_excelente) {
				salud.state = 'Optima';
				salud.color = '#ff6d00';
			}
			if (salud.value >= $rootScope.configApp.porcentaje_salud_excelente) {
				salud.state = 'Excelente';
				salud.color = '#f44336';
			}

			return salud;
		}

		//Metodo que calcula y devuelve el patrimonio del usuario.
		usuario.getPatrimonio = function (sumatoriaPrecioVivienda) {
			return (sumatoriaPrecioVivienda + usuario.cash + (usuario.unidades_oro * $rootScope.configApp.dips_por_unidad_oro));
		}

		usuario.getColorEnergia = function(){
			return usuario.energia <=25 ? '#f44336' : '#f9b233';
		}

		usuario.getColorCompromiso = function(){
			return usuario.compromiso <=25 ? '#f44336' : '#00c0d9';
		}

		usuario.getColorConocimiento = function(){
			return usuario.conocimiento <=25 ? '#f44336' : '#95c11e';
		}

		return usuario; //retorna el objeto usuario{};

	}])

})();
