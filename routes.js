(function () {
	"use strict";

	angular.module('App')
		.config(['$stateProvider', '$urlRouterProvider', '$rootScope', '$location',
			function ($stateProvider, $urlRouterProvider, $rootScope, $location) {
				$urlRouterProvider.otherwise("/");
				$stateProvider
					.state('login', {
						url: "/"
						, templateUrl: 'template/views/login.html'
						, controller: 'loginController'
					})
					.state('home', {
						url: '/home'
						, templateUrl: 'template/views/home.html'
					})
					.state('status', {
						url: '/status'
						, resolve: {
							check: function ($location) {
								var loggedIn = sessionStorage.getItem("user");
								if (!loggedIn) {
									$scope.error = "No tiene permisos para acceder a esta página.";
									$location.path('./');
								}
							}
						}
						, templateUrl: 'template/views/status.html'
						, controller: 'statusController'
					})
        		}]);
})();