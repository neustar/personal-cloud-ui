'use strict'
angular.module('myApp').controller("homeController", function ($scope, $filter,$location, commonServices) {
	  
	$scope.pageLoaded = true;
	$scope.errorMessageContainer = false;
	$scope.successMessageContainer = false;	
	$scope.userlogin={};
	
	
	$scope.resetForm = function(item, event) {
		$scope.pageLoaded = false;											
		 
	}
	
	$scope.login = function(postUrl)
	{
		var password = $scope.userlogin.secretToken;
				
		commonServices.userlogin(password,postUrl).then(function(result)
		{
			if(result.message == 'Success')
			{
				
				commonServices.setCloudName($scope.userlogin.cloudName);
				$location.path('userhome');
				//window.location = 'home.jsp#/userhome'
				
				
			}
			else
			{
				$scope.errorMessageContainer = true;
				$scope.errorMessage = result.errorMessage;
			
			}
		
			
		
		});
	
	}
	
	 
	
});