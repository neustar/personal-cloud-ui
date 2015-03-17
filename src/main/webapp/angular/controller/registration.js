'use strict'
angular.module('myApp').controller("registration", function ($scope,$location,blockUI, commonServices) {
	
	$scope.pageLoaded = true;
	$scope.errorMessageContainer = false;
	$scope.successMessageContainer = false;	
	$scope.loading_contactsInfo = false;
	$scope.error = true;
	$scope.user= {};
	
	// avaiable registration form container
	$scope.cloudAvalContainer = true;
	$scope.userDetailContainer = false;
	$scope.validUserContainer = false;
	$scope.loading_contactsInfo = false;
	
	 
	
	// function to check cloudname is available
	$scope.cloudCheck = function(cloudAvailUrl) {
		blockUI.start();
		if(cloudAvailUrl){
			$scope.loading_contactsInfo = true;
			commonServices.getInfo(cloudAvailUrl).then(function(responseData){	
				blockUI.stop();
				$scope.loading_contactsInfo = false;
				if(responseData.message!='true'){
					$scope.errorMessageContainer = true;
					$scope.successMessageContainer = false;
					$scope.errorMessage = responseData[0].errorMessage;
					$scope.error = true;
				}else{
					$scope.successMessageContainer = true;
					$scope.errorMessageContainer = false;
					$scope.successMessage = "This cloud name is available.";
					$scope.error = false;
				}
			
			});
		}else{
			$scope.errorMessageContainer = true;
			$scope.errorMessage = "Error: Invalid Request";
		}
	
	}
	
	$scope.resetForm = function(item, event) {
		$scope.pageLoaded = false;											
		 
	}
	// function to submit cloudname 
	$scope.submitForm = function(isValid) {
	 
	if(isValid){
			$scope.userDetailContainer = true;
			$scope.cloudAvalContainer = false;
			$scope.validUserContainer = false;
			$scope.errorMessageContainer = false;
						
		}else{
			$scope.errorMessageContainer = true;
			$scope.loading_contactsInfo = false;
			$scope.errorMessage = "Error: Invalid Request";
		}
	}
	
	// function to submit user information
	$scope.submitUserInfo = function(isValid,postUrl) {

		if(isValid){
			$scope.errorMessageContainer = false;
			$scope.successMessageContainer = false;	
			$scope.loading_contactsInfo = true;
			 
			 var apiUrl = {postUrl : postUrl};
			 
			//Updating paramters accordingly
			var dataObject= {
				emailAddress : $scope.user.userEmail,
				phoneNumber : $scope.user.userTel,
				password : $scope.user.password,
				confirmPassword : $scope.user.password_c,
				identifier:"1234"
			};
			commonServices.saveInfo(dataObject,apiUrl).then(function(responseData){	
			 
			 
				if(responseData.message == "Success"){
					$scope.pageLoaded = true;					
					$scope.loading_contactsInfo=false;								  
					$scope.userDetailContainer = false;
					$scope.validUserContainer = true;					 
				}
				else
				{
					$scope.errorMessageContainer = true;
					$scope.errorMessage = responseData[0].errorMessage;
				}
			});
		}else{
			$scope.errorMessageContainer = true;
			$scope.loading_contactsInfo = false;
			$scope.errorMessage = "Error: Invalid Request";
		}
	}
	
	$scope.validatesCodes = function(isValid,postUrl)
	{
			if(isValid){
			$scope.errorMessageContainer = false;
			$scope.successMessageContainer = false;	
			$scope.loading_contactsInfo = true;
			 
			 var apiUrl = {postUrl : postUrl};
			 
			//Updating paramters accordingly
			var dataObject= {
				emailCode : $scope.user.emailCode,
				phoneCode : $scope.user.phoneCode,
				identifier:"1234"
			};
			commonServices.saveInfo(dataObject,apiUrl).then(function(responseData){	
			
				if(responseData.message == "Success"){
					$scope.pageLoaded = true;					
					$scope.loading_contactsInfo=false;								  
					$scope.userDetailContainer = false;
					$scope.validUserContainer = false;		
					$scope.paymentContainer = true;
				}
				else
				{
					$scope.errorMessageContainer = true;
					$scope.errorMessage = responseData[0].errorMessage;
				}
			});
		}else{
			$scope.errorMessageContainer = true;
			$scope.loading_contactsInfo = false;
			$scope.errorMessage = "Error: Invalid Request";
		}
	
	
	
	}
	
});