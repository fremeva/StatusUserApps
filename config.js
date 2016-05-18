/*
 * Config module File
 * Configuracion de la aplicacion. Rutas.
 */
(function () {
	var miapp = angular.module('miapp');

	miapp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'ChartJsProvider'
		, function ($stateProvider, $urlRouterProvider, $httpProvider,ChartJsProvider) {

			// Configure all charts
			ChartJsProvider.setOptions('Line',{
				colours: ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
				, responsive: true,
				legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span ="<%=name.toLowerCase()%>-legend-icon" style="background-color:<%=datasets[i].strokeColor%>">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span><span class="<%=name.toLowerCase()%>-legend-text">&nbsp<%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>'

			});
			// Configure all doughnut charts
			ChartJsProvider.setOptions('Doughnut', {
				animateScale: true,
				tooltipTemplate: "<%= label %>: <%= value %>%"
			});

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
					, templateUrl: 'template/views/status/status.html'
					, controller: 'statusController'
				})
	}])

})();

