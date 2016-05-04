(function () {

	var servicesModule = angular.module('AppServices');

	servicesModule.factory('userObjectService', [function () {
		var userObject = {};


		/*Propiedades
		userObject.nick = '';
		userObject.nombre = '';
		userObject.apellido = '';
		userObject.dni = '';
		/*userObject.nick = '';
		userData.energy = '';
		userData.compromise = '';
		userData.knowledge = '';
		userData.ciudad = '';
		userData.barrioSelected = '';*/

		/*Métodos*/
		userObject.setUserData = function (data) {
			userObject._id = data._id;
			userObject.dni = data.dni;
			userObject.nick = data.username;
			userObject.nombre = data.nombre;
			userObject.apellidos = data.apellidos;
			userObject.email = data.email;
			userObject.empresa_grupo = data.empresa_grupo;
			userObject.departamento = data.departamento;
			userObject.ciudad = data.ciudad;

			userObject.cash = data.sesion.monedero;
			userObject.unidades_oro = data.sesion.unidades_oro;
			userObject.conocimiento = data.sesion.conocimiento;
			userObject.compromiso = data.sesion.compromiso;
			userObject.energia = data.sesion.energia;
			userObject.ciudadSession = data.sesion.ciudad;

			//this.broadcastProp();
		};

		userObject.setUserBalance = function (data) {
			//userObject.balance = data

			//this.broadcastProp();
		};

		userObject.getFullName = function () {
			return userObject.nombre + ' ' + userObject.apellidos;
			this.broadcastProp();
		}

		userObject.getPerformance = function () {
			return (userObject.energia + userObject.compromiso + userObject.conocimiento);

		}

		userObject.getSalud = function () {
			return (this.getPerformance() / 3);
		}

		userObject.getEstadoSalud = function () {
			var _variablePorcentTotal = 19; //ESTO ES DE PRUEBA
			return ((this.getSalud() * 100) / _variablePorcentTotal).toFixed( 2 );
		}

		userObject.getPatrimonio = function () {
			var sumatoriaVivienda = 10 //ESTO ES DE PRUEBA
			return (sumatoriaVivienda +  userObject.cash + (userObject.unidades_oro * 20000));
		}

		/*Actualizador*
		userObject.broadcastProp = function () {
			$rootScope.$broadcast('updateUser');
		};*/

		return userObject;


	}])



})();