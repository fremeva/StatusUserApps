(function () {

	var servicesModule = angular.module('AppServices');

	servicesModule.factory('authService', ['$http', '$window', function ($http, $window) {
			return {
				_urlhttp: urlhttp,
				login: function (user) {
					return $http.post(this._urlhttp+'login', user);
				}
				,logout: function () {
					delete $window.localStorage.token;
				}
			}
	}
	]);

})();
