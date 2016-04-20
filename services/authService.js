(function (){

	var servicesModule = angular.module('AppServices');

	servicesModule.factory('authService', ['$http', '$q', '$window', function($http, $q, $window){
		return{
			login: function(user){

			},
			logout: function(){
				delete $window.localStorage.token;
			}
		}
	}
	]);

})();
