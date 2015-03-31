/*********************
	ANGULAR
**********************/
var app = angular.module('myApp', ['ui.bootstrap', 'pascalprecht.translate']);


// TRANSLATIONS 
app.config(function($translateProvider) {
	$translateProvider
		.translations('en', translations.en)
		.translations('es', translations.es)
	$translateProvider.preferredLanguage(userLang);
});

// DATE PICKER
angular.module('ui.bootstrap').controller('awayTab', function ($scope) {
  
	$scope.datepickers = {
		datefrom: false,
		dateto: false
	}
		
	$scope.open = function($event, which) {
        $event.preventDefault();
        $event.stopPropagation();
	
		$scope.datepickers.datefrom = false;
		$scope.datepickers.dateto = false;
        $scope.datepickers[which]= true;
	};

	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};
  
	$scope.format = 'yyyy/MM/dd'; 
})


// LANGUAGE SWITCHER
app.controller('ctrlTranslate', function($translate, $scope) {
	$scope.changeLanguage = function (langKey) {
		$translate.use(langKey);
		
		update_checkboxs();
	};
});


