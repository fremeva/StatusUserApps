(function () {
	var miapp = angular.module("miapp");
	miapp.run(
        function($rootScope, $templateCache){
            $rootScope.$on('$viewContentLoaded', function() {
                $templateCache.removeAll();
                //localStorage.clear();
                console.log('Cache Limpia')
            });
        }
    );
	miapp.controller('micontrolador', function($scope){
		$scope.sometext = 'test';
	});

})();
