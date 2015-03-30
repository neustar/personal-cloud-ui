'use strict'
angular.module('cloudServices', [])
.factory("commonServices", ["$http", function ($http) {
	
	// Return public API.
	return({
		getInfo: getInfo,
		saveInfo: saveInfo,
		getProxyInfo: getProxyInfo,
		saveProxyInfo: saveProxyInfo,
		deleteProxyInfo: deleteProxyInfo
	});			
	
	 
	// Get all of the Contact Information in the remote collection.
	function getInfo(getUrl) {  
												 
		var request = $http({
			method: "GET",
			url: 'https://54.84.28.139:443/v1/'+getUrl,
			headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization' : 'Bearer 277fbd8101054c1d8380698331b38e60'
					 }
		
		});
		  
		return( request.then( handleSuccess, handleError ) );
	}
	
	// Get all of the Contact Information in the remote collection.
	function getProxyInfo(getUrl) {  
												 
		var request = $http({
			method: "GET",
			url: 'https://54.172.108.151:8443/'+getUrl,
			headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Connection' : 'keep-alive'
					 }
		
		});
		  
		return( request.then( handleSuccess, handleError ) );
	}
	
	
	function deleteProxyInfo( saveObject,getUrl) {  
												 
		var request = $http({
			method: "DELETE",
			url: 'https://54.172.108.151:8443/'+getUrl,
			headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Connection' : 'keep-alive'
					 },
			data:saveObject
		});
		  
		return( request.then( handleSuccess, handleError ) );
	}
	
	//Save all the Contact Information 
	function saveInfo( saveObject) {   
		var request = $http({
			method: "POST",
			url: 'https://54.84.28.139:443/v1/'+saveObject.postUrl,
			headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization' : 'Bearer 277fbd8101054c1d8380698331b38e60'
					 },
			data:{
				"emailAddress": saveObject.userEmail,
				"phoneNumber": saveObject.userTel,
				"password": saveObject.password,
				"confirmPassword": saveObject.password_c,
				"identifier":"1234"
			}

		});

		return( request.then( handleSuccess, handleError ) );

	}
	
	//Save all the Contact Information 
	function saveProxyInfo( saveObject,postUrl) {   
	 
		var request = $http({
			method: "POST",
			url: 'https://54.172.108.151:8443'+postUrl,
			headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						
					 },
			data:saveObject

		});

		return( request.then( handleSuccess, handleError ) );

	}
	
	
	// ---
	// PRIVATE METHODS.
	// ---
	function handleError( response ) {  
 		 
		// Otherwise, use expected error message.
		return( response.data );

	}


	// I transform the successful response, unwrapping the application data
	// from the API response payload.
	function handleSuccess( response ) {
		
		return( response.data );

	}
	
	
}]);
