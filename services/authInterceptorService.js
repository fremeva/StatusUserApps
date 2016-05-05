(function () {

	var servicesModel = angular.module('AppServices');

	servicesModel.factory('authInterceptor', ['$rootScope', '$q', '$window'
		, function ($rootScope, $q, $window) {
			return {
				request: function (config) {
					config.headers = config.headers || {};
					if ($window.localStorage.token) {
						config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
					}
					return config;
				}
				, responseError: function (rejection) {
					if (rejection.status === 401) {}
					return $q.reject(rejection);
				}
			};
		}
	])

})();
