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
'use strict';
// Declare app level module which depends on filters, and services
var app= angular.module('myApp', ['ngGrid', 'angularModalService', 'ui.bootstrap','internationalPhoneNumber','ng-bootstrap-datepicker','cloudServices','ngCookies','ngRoute','blockUI']);

app.value('globalInfo', {
    proxyApiUrl: 'https://54.172.108.151:8443/',
    cspName: '+testcsp' 
    
});

 
 // configure our routes
    app.config(function($routeProvider) {
        $routeProvider
			
			
            // route for the home page
            .when('/home', {
                templateUrl : 'angular/views/home.html',
                controller  : 'homeController'
            })
			
			// route for the registration step one page
            .when('/registration', {
                templateUrl : 'angular/views/registration.html',
                controller  : 'registration'
            })
			
			 // route for the user home page after login
            .when('/userhome', {
                templateUrl : 'angular/views/userHome.html',
                controller  : 'userHome',
				resolve:{
                	load:function($location, $q, $cookies){
                		var def = $q.defer();
                		if ($cookies.guardianCloudName == undefined) {
                			$location.path("/home");
                		}
                		else{
                			def.resolve();
                		}
                		return def.promise;
                	}
                }
            })
									
			// route for the guardian dependent list
            .when('/guardianProxy', {
                templateUrl : 'angular/views/dependentList.html',
                controller  : 'userHome',
				resolve:{
                	load:function($location, $q, $cookies){
                		var def = $q.defer();
                		if ($cookies.guardianCloudName == undefined) {
                			$location.path("/home");
                		}
                		else{
                			def.resolve();
                		}
                		return def.promise;
                	}
                }
            })
			
			.when('/addDependent', {
                templateUrl : 'angular/views/manageDependent.html',
                controller  : 'userHome',
				resolve:{
                	load:function($location, $q, $cookies){
                		var def = $q.defer();
                		if ($cookies.guardianCloudName == undefined) {
                			$location.path("/home");
                		}
                		else{
                			def.resolve();
                		}
                		return def.promise;
                	}
                }
            })
			
			// route for the guardian dependent list
            .when('/dependentRequestList', {
                templateUrl : 'angular/views/allowedBlockRequestList.html',
                controller  : 'dependentList'
            })
			
			// route for the additional cloud list
            .when('/additionalCloud', {
                templateUrl : 'angular/views/additionalCloud.html',
                controller  : 'userHome',
				resolve:{
                	load:function($location, $q, $cookies){
                		var def = $q.defer();
                		if ($cookies.guardianCloudName == undefined) {
                			$location.path("/home");
                		}
                		else{
                			def.resolve();
                		}
                		return def.promise;
                	}
                }
            })
			.otherwise({
				templateUrl : 'angular/views/home.html',
                controller  : 'homeController'
		 
			 });
	});
	
	app.config(function(blockUIConfig) {
	  // Tell blockUI not to mark the body element as the main block scope.
	  blockUIConfig.autoInjectBodyBlock = false;  
	});