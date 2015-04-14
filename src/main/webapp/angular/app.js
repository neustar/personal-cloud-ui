'use strict';
// Declare app level module which depends on filters, and services
var app= angular.module('myApp', ['ngGrid', 'angularModalService', 'ui.bootstrap','internationalPhoneNumber','ng-bootstrap-datepicker','cloudServices','ngCookies','ngRoute','blockUI']);
 
app.controller('AppCtrl', function($scope) {
            $scope.datepickerOptions = {
                format: 'mm/dd/yyyy',
				language: 'en',
				autoclose: true,
				weekStart: 0
            }
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
                controller  : 'userHome'
            })
									
			// route for the guardian dependent list
            .when('/guardianProxy', {
                templateUrl : 'angular/views/dependentList.html',
                controller  : 'userHome'
            })
			
			.when('/addDependent', {
                templateUrl : 'angular/views/manageDependent.html',
                controller  : 'userHome'
            })
			
			// route for the guardian dependent list
            .when('/dependentRequestList', {
                templateUrl : 'angular/views/allowedBlockRequestList.html',
                controller  : 'dependentList'
            })
			
			// route for the additional cloud list
            .when('/additionalCloud', {
                templateUrl : 'angular/views/additionalCloud.html',
                controller  : 'userHome'
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