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


app.directive('input', function ($parse) {
  return {
    restrict: 'E',
    require: '?ngModel',
    link: function (scope, element, attrs) {
      if (attrs.ngModel && attrs.value) {
        $parse(attrs.ngModel).assign(scope, attrs.value);
      }
    }
  };
});


app.controller('awayTab', function($translate, $scope) {

	$scope.contacts = [{}]; // Default: one empty contact
	
	$scope.add = function () {
		$scope.contacts.push({}); //Add one empty contact
    };
	
	$scope.remove= function (index) {
		$scope.contacts.splice(index, 1);
	};
	
		
})