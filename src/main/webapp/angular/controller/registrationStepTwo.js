/*
The MIT License (MIT)
	
Copyright (c) 2015 Neustar Inc.
	
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
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