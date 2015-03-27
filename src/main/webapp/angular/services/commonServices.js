'use strict'
angular.module('cloudServices', [])
.factory("commonServices", ["$http", function ($http) {
	
	// Return public API.
	return({
		getInfo: getInfo,
		saveInfo: saveInfo
	});			
	
	 
	// Get all of the Contact Information in the remote collection.
	function getInfo(getUrl) {  
												 
		var request = $http({
			method: "GET",
			url: 'https://54.84.28.139:443/v1/'+getUrl,
			headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization' : 'Bearer fb02cbed6f904fb3afbba04cf866a560'
					 }
		
		});
		  
		return( request.then( handleSuccess, handleError ) );
	}
	
	//Save all the Contact Information 
	function saveInfo(saveObject,apiUrl) {   
		var request = $http({
			method: "POST",
			url: 'https://54.84.28.139:443/v1/'+apiUrl.postUrl,
			headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization' : 'Bearer fb02cbed6f904fb3afbba04cf866a560'
					 },
			data:saveObject

		});

		return( request.then( handleSuccess, handleError ) );

	}
	
	// ---
	// PRIVATE METHODS.
	// ---
	function handleError( response ) {  
 		if (! angular.isObject( response.data ) || ! response.data[0].errorMessage || response.status != 200 || response.status != 201) {
			
			return(response.data);
		}

		// Otherwise, use expected error message.
		return( response.data.errorMessage );

	}


	// I transform the successful response, unwrapping the application data
	// from the API response payload.
	function handleSuccess(response) {
		 
		return(response.data);

	}
	
}]);
