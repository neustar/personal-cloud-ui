'use strict'
angular.module('myApp').controller("homeController", function ($scope, $filter,$location,$cookies, commonServices) {
	  
	$scope.pageLoaded = true;
	$scope.errorMessageContainer = false;
	$scope.successMessageContainer = false;	
	$scope.userlogin={};
	$cookies.test='';
	
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
				$cookies.guardianCloudName = $scope.userlogin.cloudName;
				$cookies.guardianPassword = $scope.userlogin.secretToken;
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