(function () {
	var miapp = angular.module('miapp');

	miapp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
		function ($stateProvider, $urlRouterProvider, $httpProvider){

			$httpProvider.interceptors.push('authInterceptor');

			//Routering...
			$urlRouterProvider.otherwise('/login');
			$stateProvider
				.state('login', {
							url: "/login"
							, templateUrl: 'template/views/login.html'
							, controller: 'loginController'
						})
						.state('home', {
							url: '/home'
							, templateUrl: 'template/views/home.html'
							, controller: 'homeController'
						})
						.state('status', {
							url: '/status'
							, templateUrl: 'template/views/status.html'
							, controller: 'statusController'
						})

	}])

})();




/*miapp.config(['$stateProvider', '$urlRouterProvider', '$rootScope', '$location',
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
        		}]);*/
