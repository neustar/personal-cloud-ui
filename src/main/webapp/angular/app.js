'use strict';
// Declare app level module which depends on filters, and services
var app= angular.module('myApp', ['ngGrid', 'infotabset', 'ui.bootstrap', 'cloudServices','ngRoute','blockUI']);

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
			 
			.otherwise({
				templateUrl : 'angular/views/home.html',
                controller  : 'homeController'
		 
			 });
	});
	
	app.config(function(blockUIConfig) {
	  // Tell blockUI not to mark the body element as the main block scope.
	  blockUIConfig.autoInjectBodyBlock = false;  
	});