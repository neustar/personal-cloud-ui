'use strict'
angular.module('myApp').controller("registrationStepTwo", function ($scope,$location,commonServices) {
	 
	$scope.pageLoaded = true;
	$scope.errorMessageContainer = false;
	$scope.successMessageContainer = false;		 
	
	$scope.resetForm = function(item, event) {
		$scope.pageLoaded = false;											
		 
	}
	
	$scope.submitForm = function(isValid) {
	 
	if(isValid){
				//Get contact information from server
		commonServices.getInfo("profile").then(function(contactInfoData){
			 $scope.contactInfoData = contactInfoData;
				if(typeof(contactInfoData) !== "undefined"){
					if (angular.isObject( contactInfoData[1] )) {
						 
						$scope.contactinfo = contactInfoData[1];
						$scope.countryList = contactInfoData[1].countrynamelist;	
						$scope.loading_contactsInfo=false;
						$scope.pageLoaded = true;			
					}else{
						$scope.errorMessageContainer = true;
						$scope.loading_contactsInfo = false;
						$scope.pageLoaded = true;						
						$scope.errorMessage = "Error: Invalid Request";
					}
				}
			});
		}else
		{
			$scope.errorMessageContainer = true;
			$scope.loading_contactsInfo = false;
			$scope.errorMessage = "Error: Invalid Request";
		}
	}
	
	$scope.cloudCheck = function(cloudAvailUrl) {
		 
		if(cloudAvailUrl){
			commonServices.getInfo(cloudAvailUrl).then(function(result){	
				
				if(result!='true'){
					$scope.errorMessageContainer = true;
					$scope.errorMessage = "This cloud name is not available.";
				}else{
					$scope.successMessageContainer = true;
					$scope.successMessage = "This cloud name is available.";
				}
			
			});
		}else{
			$scope.errorMessageContainer = true;
			$scope.errorMessage = "Error: Invalid Request";
		}
	
	}
	 
	
});