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
			}
		}
	}
	]);

})();
