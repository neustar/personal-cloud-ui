'use strict'
angular.module('myApp').controller("homeController", function ($scope, $filter, commonServices) {
	  
	$scope.pageLoaded = true;
	$scope.errorMessageContainer = false;
	$scope.successMessageContainer = false;		 
	
	$scope.resetForm = function(item, event) {
		$scope.pageLoaded = false;											
		 
	}
	
	 
	
});