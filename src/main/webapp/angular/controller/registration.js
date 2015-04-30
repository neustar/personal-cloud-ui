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
	$scope.registrationcontainer = true;
	$scope.CongratulationContainer = false;
	$scope.paymentContainer = false;
	$scope.paymentDetailContainer = false;
	
	$scope.hasErrorCond = false;
	$scope.hasErrorVerify = false;
	$scope.hasErrorPay = false;
	
	 
	
	
	$scope.reset = function() {
    $scope.$broadcast('show-errors-reset');
    $scope.user = {userEmail:"", userMobile:"", password:"", password_c:""};
	}
	
	//this function append "=" sign to cloud Name
	$scope.appendSign = function()
	{
		
		if($scope.user.cloudName && !($scope.user.cloudName.charAt(0) == "="))
		{
			$scope.user.cloudName = '='+$scope.user.cloudName;
			
		}
		
		
	
	}
	
	//function to check cloud Name is available
	$scope.cloudCheck = function(cloudAvailUrl) {
		 blockUI.start();
		if(cloudAvailUrl){
		cloudAvailUrl = 'clouds/personalClouds/'+cloudAvailUrl+'/available';
			 
			commonServices.getInfo(cloudAvailUrl).then(function(responseData){	
			 	blockUI.stop();
				 
				if(responseData.message =="true"){ 
					$scope.successMessageContainer = true;
					$scope.errorMessageContainer = false;
					$scope.successMessage = "This cloud name is available.";
					$scope.error = false;
					 
				}else if((responseData.message =="false")){ 
					$scope.successMessageContainer = false;
					$scope.errorMessageContainer = true;
					$scope.errorMessage = "This cloud name is not available.";
					$scope.error = true;
				 
				}				
				else if(responseData.errorMessage || responseData[0].errorMessage){ 
					
					 
					$scope.successMessageContainer = false;					
					$scope.errorMessageContainer = true;
					if(responseData.errorMessage){
					$scope.errorMessage = responseData.errorMessage;
					}
					else if(responseData[0].errorMessage){
					$scope.errorMessage = responseData[0].errorMessage;
					}
					$scope.error = true;					 
					 
					}
				else{ 
					$scope.errorMessageContainer = true;
					$scope.successMessageContainer = false;
					$scope.errorMessage = responseData.message;
					$scope.error = true;
					 

				}
			
			});
		}else{
			blockUI.stop();
			$scope.errorMessageContainer = false;
			$scope.successMessageContainer = false;
			 
		}
	
	}
	
	$scope.resetForm = function(item, event) {
		$scope.pageLoaded = false;											
		 
	}
	// function to submit cloudname 
	$scope.submitForm = function(isValid,errorContainer) {
	  
	if(isValid && !errorContainer){
			$scope.userDetailContainer = true;
			$scope.cloudAvalContainer = false;
			$scope.validUserContainer = false;
			$scope.errorMessageContainer = false;
			 
						
		}else{
			$scope.errorMessage = "";
			$scope.errorMessageContainer = true;
			$scope.successMessageContainer = false;			
			$scope.error = true; 	
			
			 
			
		}
	}
	
	// function to submit user information
	$scope.submitUserInfo = function(isValid,postUrl) {
	 
		
	 
	 
		if($scope.user.password!=undefined && !($scope.user.password===$scope.user.password_c)){
		
			$scope.user.errorMessageContainer = true;
			$scope.user.errorMessage = "Password don't match";
			return false;
		
		}
	 
		if(isValid){
		
		
			$scope.user.errorMessageContainer = false;
			$scope.successMessageContainer = false;	
			$scope.loading_contactsInfo = true;
			$scope.user.userTel = "+"+$scope.user.countryCode+"."+$scope.user.userMobile; 
			 var apiUrl = {postUrl : postUrl};
			 
			$scope.user.identifier = Math.floor((Math.random() *(10000-1000))+1000);
			 
			//Updating paramters accordingly
			var dataObject= {
				emailAddress : $scope.user.userEmail,
				phoneNumber : $scope.user.userTel,
				password : $scope.user.password,
				confirmPassword : $scope.user.password_c,
				identifier:$scope.user.identifier
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
					$scope.user.errorMessageContainer = true;
					if(responseData.errorMessage)
					{
					$scope.user.errorMessage = responseData.errorMessage;
					}
					else if(responseData[0] != undefined)
					{
						$scope.user.errorMessage = responseData[0].errorMessage;
					}
					 
				}
			});
		}else{
			 
			$scope.user.hasErrorCond = true;
		
		}
	}
	
	$scope.validatesCodes = function(isValid,postUrl)
	{ 
		if(!($scope.user.I_Agree) || $scope.user.I_Agree === "undefined"){
			 
			$scope.user.errorMessageContainer = true;
			$scope.user.errorMessage = "Please agree on rule.";
			return false;
		
		}
		if(isValid){
			$scope.errorMessageContainer = false;
			$scope.successMessageContainer = false;	
			$scope.loading_contactsInfo = true;
			 
			 var apiUrl = {postUrl : postUrl};
			 
			
			 
			//Updating paramters accordingly
			var dataObject= {
				emailCode : $scope.user.emailCode,
				phoneCode : $scope.user.phoneCode,
				identifier:$scope.user.identifier
			};
			commonServices.saveInfo(dataObject,apiUrl).then(function(responseData){	
			
				if(responseData.message == "Success"){
					$scope.pageLoaded = true;					
					 					  
					$scope.userDetailContainer = false;
					$scope.validUserContainer = false;		
					$scope.paymentContainer = true;
				}
				else
				{
					$scope.errorMessageContainer = true;
					if(responseData.errorMessage)
					$scope.user.errorMessage = responseData.errorMessage;
					else if(responseData[0].errorMessage)
					$scope.user.errorMessage = responseData[0].errorMessage;
					
					 
				}
			});
		}
		else
		{
			$scope.errorMessageContainer = true;			 
			$scope.user.hasErrorVerify= true;
		}
		
		
	}
	
	$scope.getPaymentID = function(isValid,event,serviceName)
	{  
		 
		if(!($scope.user.paymentOption) || $scope.user.paymentOption === "undefined"){
			 
			$scope.user.errorMessageContainer = true;
			$scope.user.errorMessage = "Please choose payment option.";
			return false;
		
		}
		if(!($scope.user.I_Agree1) || $scope.user.I_Agree1 === "undefined"){
			 
			$scope.user.errorMessageContainer = true;
			$scope.user.errorMessage = "Please agree on rule.";
			return false;
		
		}	
			
			if(isValid){
			$scope.errorMessageContainer = false;
			$scope.successMessageContainer = false;	
			$scope.paymentContainer = false;
			$scope.paymentDetailContainer = true;
			
			 
			
		/*	switch (serviceName) {
        
			case "stripe":
						var handler = StripeCheckout.configure({
							key: 'pk_test_7WeMMrZ1Slh1QzRO7Nk53mqs',
							image: '/img/documentation/checkout/marketplace.png',
							token: function(token) { 
								//Updating paramters accordingly
								var dataObject= {
									paymentType : "CREDIT_CARD",
									paymentReferenceId : token.id,
									paymentResponseCode:"OK",
									amount:"25",
									productName:"PCN",
									currency:"USD",
									paymentGateway: "Test"
								};
								var apiUrl = {postUrl : 'processPayment?cspCloudName=+testcsp'};
								commonServices.saveInfo1(dataObject,apiUrl).then(function(responseData){	
								if(responseData.paymentId != null){
										$scope.pageLoaded = true;					
										$scope.loading_contactsInfo=false;								  
										$scope.userDetailContainer = false;
										$scope.validUserContainer = false;		
										$scope.paymentContainer = true;
										$scope.registerCloudName(responseData.paymentId,"csp/+testscp/clouds/personalClouds");
									}
									else
									{
										$scope.errorMessageContainer = true;
										$scope.errorMessage = responseData[0].errorMessage;
									}
								});
							 }
						});
						
						handler.open({
						  name: 'Personal Cloud',
						  description: 'Payment detail',
						  amount: 2000
						});
						event.preventDefault();
						
						// Close Checkout on page navigation
						$(window).on('popstate', function() {
						handler.close();
						});
				break;
			default:
				throw "Unknown checkout service: " + serviceName;
			} 
			*/		
			
		}
		else
		{
			$scope.errorMessageContainer = true;
			$scope.user.hasErrorPay= true;
		}
	
	}
	$scope.getPaymentInfo = function()
	{  
		 
			$scope.errorMessageContainer = false;
			$scope.successMessageContainer = false;	
			 
			
			var dataObject= {
									paymentType : "CREDIT_CARD",
									paymentReferenceId : "abcde0123456789",
									paymentResponseCode:"OK",
									amount:"25",
									currency:"USD"
									};
					var apiUrl = {postUrl : 'products/PCN/payments'};
			
			commonServices.saveInfo(dataObject,apiUrl).then(function(responseData){	
			if(responseData.paymentId != null){
					$scope.pageLoaded = true;
					$scope.userDetailContainer = false;
					$scope.validUserContainer = false;		
					$scope.paymentContainer = false;		
					$scope.paymentDetailContainer = true;
					$scope.registerCloudName(responseData.paymentId,"csp/+testcsp/clouds/personalClouds");
				}
				else
				{
					$scope.errorMessageContainer = true;
					$scope.errorMessage = responseData[0].errorMessage;
				}
			});		
			 
	}
	
	$scope.registerCloudName = function(paymentID,posturl)
	{ 
			if(paymentID != null){
			$scope.errorMessageContainer = false;
			$scope.successMessageContainer = false;	
			$scope.loading_contactsInfo = true;
			 
			 var apiUrl = {postUrl : posturl};
			 
			 
			//Updating paramters accordingly
			var dataObject= {
								properties: 
								{
									cloudName: $scope.user.cloudName,
									requestType: "PERSONAL",
									paymentId: paymentID,
									rnPolicyConsent: $scope.user.I_Agree,
									cspPolicyConsent: $scope.user.I_Agree
								},
								personalCloudInfo: 
								{
									phoneNumber: $scope.user.userTel,
									emailAddress: $scope.user.userEmail,
									password: $scope.user.password
								}};
								
								
			commonServices.saveInfo(dataObject,apiUrl).then(function(responseData){	
			
				if(responseData.message == "Success"){
					$scope.pageLoaded = true;					
					$scope.loading_contactsInfo=false;								  
					$scope.userDetailContainer = false;
					$scope.validUserContainer = false;		
					$scope.paymentDetailContainer = false;
					$scope.registrationcontainer = false;
					$scope.paymentContainer = false;
					$scope.CongratulationContainer = true;
				}
				else
				{
					$scope.errorMessageContainer = true;
					$scope.errorMessage = responseData[0].errorMessage;
				}
			});
		}
		else
		{
			$scope.errorMessageContainer = true;
			$scope.loading_contactsInfo = false;
			$scope.errorMessage = "Error: Invalid Request";
		}
	
	}
	
	
});