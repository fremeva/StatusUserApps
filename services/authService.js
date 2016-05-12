/*
 * Auth Service File
 * Servicio para la autenticacion con la API, verificacion del token de acceso y
 * obtener la configuracion general de la aplicacion.
 */

(function () {
	var servicesModule = angular.module('AppServices');
	servicesModule.factory('authService', ['$http', '$window', '$rootScope', function ($http, $window, $rootScope) {
		return {
			_urlhttp: urlhttp
			, login: function (user) {
				return $http.post(this._urlhttp + 'login', user);
			}
			, logout: function () {
				delete $window.localStorage.token;
			}
			, isLogged: function () {
				var data = $window.localStorage.token;
				if (data) {
					var payload = JSON.parse($window.atob(data.split('.')[1]));
					$rootScope.loggedIn = true;
					$rootScope.idUserLoggedIn = payload._id;
					$rootScope.userNameSession = payload.username;
					this.getConfigApp()
				} else {
					$rootScope.loggedIn = false;
					$rootScope.idUserLoggedIn = '';
					$rootScope.userNameSession = '';
				}

			}
			, getConfigApp: function(){
				$http.get(this._urlhttp + 'configuraciones').success(function(data){
					$rootScope.configApp = data;
				});
			}
		};
	}]);

})();
