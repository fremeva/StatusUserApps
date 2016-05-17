/*
* User Service
* Servicio para obtener informacion de la Api relacionado al Usuario.
*/
(function(){

	var servicesModule = angular.module('AppServices');

	servicesModule.factory('userService',[ '$http', function($http){
		return{
			_urlhttp: urlhttp,
			getInfoUser: function(usuario_id){
				return $http.get(this._urlhttp + 'usuarios/' + usuario_id);
			},
			getBalance: function (usuario_id) {
				return $http.get(this._urlhttp + 'balances/' + usuario_id)
			},
			getSessionUsuario: function (usuario_id) {
				return $http.get(this._urlhttp + 'usuarios/' + usuario_id + '/sesion/');
			},
			getCiudadUsuario: function (usuario_id) {
				return $http.get(this._urlhttp + 'ciudades/' + usuario_id);
			},
			getPatrimonioEdificio: function(usuario_id) {
				return $http.get(this._urlhttp + 'usuarios/' + usuario_id + '/sesion/obtener_patrimonio_edificios');
			},
			getEdificioUsuario: function(usuario_id) {
				return $http.get(this._urlhttp + 'usuarios/' + usuario_id + '/sesion/obtener_edificios');
			}
		}
	}
	]);

})();
