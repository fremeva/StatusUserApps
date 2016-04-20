(function () {
	var App = angular.module("App", [
		'ui.router'
		, 'AppControllers'
		, 'AppServices'
	]);

	App.run(
        function($rootScope, $templateCache){
            $rootScope.$on('$viewContentLoaded', function() {
                $templateCache.removeAll();
                //localStorage.clear();
                console.log('Cache Limpia')
            });
        }
    );

})();
