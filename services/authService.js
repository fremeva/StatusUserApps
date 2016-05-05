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
					} else {
						$rootScope.loggedIn = false;
						$rootScope.idUserLoggedIn = '';
						$rootScope.userNameSession = '';
					}

				}
			}
	}
	]);

})();
