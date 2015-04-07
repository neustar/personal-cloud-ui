'use strict'
angular.module('cloudServices', [])
.factory("commonServices", ["$http", function ($http) {
	
	// Return public API.
	return({
		getInfo: getInfo,
		saveInfo: saveInfo,
		getProxyInfo: getProxyInfo,
		saveProxyInfo: saveProxyInfo,
		deleteProxyInfo: deleteProxyInfo,
		setCloudName:setCloudName,
		getCloudName:getCloudName,
		userlogin:userlogin
		});	

	this.guardiancloudname ='';
	
	 
	// Get all of the Contact Information in the remote collection.
	function getInfo(getUrl) {  
												 
		var request = $http({
			method: "GET",
			url: 'https://54.84.28.139:443/v1/'+getUrl,
			headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization' : 'Bearer bffa5ae20e5148de880af26d9ebe6e53'
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
	function saveInfo(saveObject,apiUrl) {   
		var request = $http({
			method: "POST",
			url: 'https://54.84.28.139:443/v1/'+apiUrl.postUrl,
			headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization' : 'Bearer bffa5ae20e5148de880af26d9ebe6e53'
					 },
			data:saveObject

		});

		return( request.then( handleSuccess, handleError ) );

	}
	
	function userlogin(pass,apiUrl) {   
		var fd = new FormData();
        fd.append('password', 'test@123');
		var request = $http({
			method: "POST",
			url: 'https://54.84.28.139:443/v1/'+apiUrl,
			headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept': 'application/json',
						'Authorization' : 'Bearer bffa5ae20e5148de880af26d9ebe6e53'
					 },
			data: $.param({password: pass}),
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
	
	function setCloudName(cloudname)
	{
		this.guardiancloudname = cloudname;
		
	}
	
	function getCloudName()
	{
		return this.guardiancloudname;
	}
	
	
}]);
