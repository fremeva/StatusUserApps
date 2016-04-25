(function () {
	var miapp = angular.module("miapp");

	miapp.run(
        function($rootScope, $templateCache, authService){
			authService.isLogged();
            $rootScope.$on('$viewContentLoaded', function() {
                $templateCache.removeAll();
                //localStorage.clear();
                //console.log('Cache Limpia')
            });
        }
    );

})();
