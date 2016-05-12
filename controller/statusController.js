(function () {

	var controllerModule = angular.module('AppControllers');
	controllerModule.controller('statusController', ['$scope', '$rootScope', '$location', 'userService', 'userFactory',
		 function ($scope, $rootScope, $location, userService, userFactory) {
			 // Id del usuario Autenticado.
			 var _idUser = $rootScope.idUserLoggedIn;

			 userService.getInfoUser(_idUser).then(function (response) {
					userFactory.setUserData(response.data);
					$scope.user = userFactory;
					$scope.user.saludObj = userFactory.getSalud();
					$scope.paintSliderChart($scope.user.saludObj); //Pintar Slider de la salud del usuario.
			 }, function (error) {
					$location.path('/home');
			 });

			 userService.getBalance(_idUser).then(function (response) {
				 $scope.balance = response.data;
				 console.log($scope.balance);
			 }, function (error) {
				 $location.path('/home');
			 });

			 /************** Charts Functions ********************/
			 $scope.showDonoutChar = function () {
				 $scope.labels_barrio = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
				 $scope.data_barrio = [300, 500, 100];
				 $scope.onClick = function (points, evt) {
					 console.log(points, evt);
				 };
			 }

			 $scope.showCashChar = function () {
				 $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
				 $scope.series = ['Series A', 'Series B'];
				 $scope.data = [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]];
			 }

			 $scope.showUnidOroChar = function () {
				 $scope.labels_meses = ["January", "February", "March", "April", "May", "June", "July"];
				 $scope.series_meses = ['Series A', 'Series B'];
				 $scope.data_meses = [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]];
			 }

			 $scope.getStyle = function () {
				 var transform = ($scope.isSemi ? '' : 'translateY(50%) ') + 'translateX(-50%)';
				 return {
					 'top': $scope.isSemi ? 'auto' : '50%',
					 'bottom': $scope.isSemi ? '5%' : 'auto',
					 'left': '50%',
					 'transform': transform,
					 '-moz-transform': transform,
					 '-webkit-transform': transform,
					 'font-size': $scope.radius / 3.5 + 'px'
					};
			 };

			 $scope.paintSliderChart = function (salud) {
				 var saludInt = parseInt(salud.value);
				 $scope.sliderSalud = {
					 value: saludInt,
					 options: {
						 floor: 0
						 , ceil: 100
						 , readOnly: true
						 , showTicksValues: 25
						 , showSelectionBar: true
						 , getSelectionBarColor: function () {
							 return salud.color
						 }
						 , getPointerColor: function () {
							 return salud.color
							}
					 }
				 };
			 }

			 //Show Charts
			 $scope.showDonoutChar();
			 $scope.showCashChar();
			 $scope.showUnidOroChar();

		 }])

})();
