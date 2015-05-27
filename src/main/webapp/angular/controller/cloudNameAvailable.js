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
angular.module('myApp').controller("cloudNameCtrl", function ($scope, $filter, commonServices) {
	 
	$scope.pageLoaded = true;
	$scope.errorMessageContainer = false;
	$scope.successMessageContainer = false;	
	$scope.loading_contactsInfo = false;	
	$scope.cloudInfoData = {};
	$scope.cloudInfo = {};
	/*$scope.loadContactInfo = function() {
		$scope.errorMessageContainer = false;
		$scope.successMessageContainer = false;	
		$scope.loading_contactsInfo = true;		
		$scope.contactinfo = {};
		$scope.countryList = {};	
		
		//Get contact information from server
		commonServices.getInfo("isCloudAvailable").then(function(cloudInfoData){
		alert("cloudInfoData"+cloudInfoData);
			$scope.cloudInfoData = cloudInfoData;
			if(typeof(cloudInfoData) !== "undefined"){
				if (angular.isObject( cloudInfoData[1] )) {
					// cloudInfoData[1].countryDropDown = $filter('filter')(cloudInfoData[1].countrynamelist, function (d) {return d.COUNTRY_CODE === cloudInfoData[1].country;})[0];
					$scope.contactinfo = cloudInfoData[1];
					$scope.countryList = cloudInfoData[1].countrynamelist;	
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
	}*/

	$scope.submitTheForm = function(isValid) {alert(isValid);
		if(isValid){
			$scope.errorMessageContainer = false;
			$scope.successMessageContainer = false;	
			$scope.loading_contactsInfo = true;
			
			//Updating paramters accordingly  
			 
			var dataObject = $scope.cloudInfo;
			dataObject.cloudName = dataObject.cloudName;		
		 
		 		
			
			//Send request for saving the data
			commonServices.saveInfo( dataObject ).then(function( responseData ) {
				$scope.loading_contactsInfo=false;								  
				if(responseData[0].status == "FAILURE") {
					$scope.errorMessageContainer = true;
					$scope.errorMessage = responseData[0].errors;
				}else if(responseData[0].status == "Success"){
					$scope.pageLoaded = true;					
					$scope.loading_contactsInfo=false;								  
					$scope.successMessageContainer = true;
					$scope.successMessage = "Contact Information Updated Sucessfully";
				}
			});
		}
	}
	
	$scope.resetForm = function(item, event) {
		$scope.pageLoaded = false;											
		 
	}
	
	 
	
});