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
/*'use strict';

describe("Unit Test : Contact Information", function () {
		var scope;
        var commonServices;
        var controller;
        var q;
        var deferred;
		
		beforeEach(module('myApp'));
		beforeEach(module('myProfileServices'));

		// define the mock people service
        beforeEach(function() {
            commonServices = {
				contactinfo : {
					"lastName": "Kumar",
					"zipcode": "600045",
					"first_address": "ICS,MEPZ123",
					"state": "TamilNadu",
					"companyName": "Infinite",
					"primaryEmail": "invalidemail##@a.xa",
					"country": "IND",
					"secondaryEmail": "invalidemail##@a.xa",
					"city": "Chennai",
					"phoneNo": "073112345a",
					"second_address": "Tambaram",
					"countrynamelist": [
						{
							"COUNTRY_ID": 2,
							"COUNTRY_DESC": "Afghanistan",
							"COUNTRY_CODE": "AFG"
						}],
					"faxNo": "vikas.dube@impetus.co.im",
					"firstName": "Senthil",
					"mobileNo": "9740823564"			
				},
                getInfo: function() {
                    deferred = q.defer();
                    return deferred.promise;
                }
            };
        });

		// inject the required services and instantiate the controller
        beforeEach(inject(function($rootScope, $controller, $q) {
            scope = $rootScope.$new();
            q = $q;
            spyOn(commonServices, 'getInfo').and.callThrough();			
            controller = $controller('contactInfoCtrl', { $scope:scope, commonServices: commonServices });
        }));

		it('contact information page should load successfully', function() {
			//																		 
            //expect(scope.pageLoaded).toEqual(true);
        });
		
		it('should get contact information from the Commonservices when loadContactInfo is called', function() {
			deferred.resolve();
            scope.$root.$digest();	
			expect(commonServices.getInfo).toHaveBeenCalled();
        });

		it('should populate the Contact information when loadContactInfo is called', function() {
            scope.loadContactInfo();
			deferred.resolve();
            scope.$root.$digest();											
			console.log(scope.contactinfo.length);			
            expect(scope.contactinfo.length).not.toBe(0);
        });


});*/
'use strict';

describe('Controller: contactInfoCtrl', function() {

// load the controller's module
beforeEach(module('myApp'));
beforeEach(module('myProfileServices'));

var contactInfoCtrl,
    scope,
    commonServicesMock,
    ajaxMock,
    q;

// Initialize the controller and a mock scope
beforeEach( inject(function($controller, $rootScope, _commonServices_, $q) {
        commonServicesMock = _commonServices_;
        q = $q;

        scope = $rootScope.$new();
        contactInfoCtrl = $controller('contactInfoCtrl', {
            $scope: scope
        });
    }));

it('should call loadContactInfo', function() {
        var deferred = q.defer();
        //spyOn( commonServicesMock, 'getInfo').and.returnValue(deferred.promise);
		spyOn( commonServicesMock, 'getInfo' ).and.returnValue(deferred.promise);
		scope.loadContactInfo();
		deferred.resolve( {} )
		scope.$root.$digest();	
		expect( commonServicesMock.getInfo ).toHaveBeenCalled();
        /*scope.getInfo({
			"lastName": "Kumar",
			"zipcode": "600045",
			"first_address": "ICS,MEPZ123",
			"state": "TamilNadu",
			"companyName": "Infinite",
			"primaryEmail": "invalidemail##@a.xa",
			"country": "IND",
			"secondaryEmail": "invalidemail##@a.xa",
			"city": "Chennai",
			"phoneNo": "073112345a",
			"second_address": "Tambaram",
			"countrynamelist": [
				{
					"COUNTRY_ID": 2,
					"COUNTRY_DESC": "Afghanistan",
					"COUNTRY_CODE": "AFG"
				}],
			"faxNo": "vikas.dube@impetus.co.im",
			"firstName": "Senthil",
			"mobileNo": "9740823564"			
		});
        deferred.reject({});
        expect( commonServicesMock.getInfo ).toHaveBeenCalled();*/

        //expect( ajaxMock.login).toHaveBeenCalled(); //Expect the second service call
    });
});