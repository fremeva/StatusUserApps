(function(){

	var servicesModule = angular.module('AppServices');

	servicesModule.factory('calculoStatusService',[ function(){
		return{
			getSaludUser: function(energia, compromiso, conocimiento){
				return (energia + compromiso + conocimiento)/3;
			},
			getPerformance: function(energia, compromiso, conocimiento){
				return energia + compromiso + conocimiento;
			}
		};
	}
	])

})();
