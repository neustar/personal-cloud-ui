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
angular.module('myApp').controller("homeController", function ($scope, $filter,$location,$cookies, commonServices,globalInfo) {
	  
	$scope.pageLoaded = true;
	$scope.errorMessageContainer = false;
	$scope.successMessageContainer = false;	
	$scope.userlogin={};
	$cookies.test='';
	$scope.hasErrorCond = false;
	$scope.cspName = globalInfo.cspName;
	
	$scope.resetForm = function(item, event) {
		$scope.pageLoaded = false;											
		 
	}
	
	$scope.appendSign = function()
	{ 
		if($scope.userlogin.cloudName && !($scope.userlogin.cloudName.charAt(0) == "="))
		{
			$scope.userlogin.cloudName = '='+$scope.userlogin.cloudName;
			
		} 
		 
	
	}
	
	$scope.login = function(postUrl)
	{
		
		var password = $scope.userlogin.secretToken;
		if($scope.userlogin.cloudName &&password){
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
		}else{
				$scope.userlogin.hasErrorCond = true;
				
			}
	
	}
	
	 
	
});