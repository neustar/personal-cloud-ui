'use strict'
angular.module('myApp').controller("userHome", function ($scope,ModalService,$location,commonServices,blockUI) {

$scope.dependentData = {};
$scope.requestData = {};
$scope.dpName = "";
$scope.dependentDetail = {};
$scope.errorMessageContainer = false;
$scope.errorMessageContaineruserModal = false;
$scope.errorMessageContainerRecordModal = false;
$scope.errorMessageContainerAddDep = false;
$scope.successMessageContainerAddDep = false;
$scope.successMessageContainer = false;
$scope.successReqContainer = false;
$scope.userlogin = {};	 
$scope.guardianCloudName = "=les-cynja-parent1";
$scope.cloudName = "";
$scope.addRecordType = "";
$scope.uuid="";


// avaiable registration form container
$scope.dependentContainer = false;
$scope.requestContainer = false;
$scope.rejectedContainer = false;
 
$scope.userlogin.cloudName = commonServices.getCloudName(); 
 
	//function is called to allow a request 
	$scope.allowBlockUrl = function(type,urlHost,requestlist)
	{

		var dataObject= {};
		var accesstype; //use delete record from the list 

		dataObject = $scope.getData(type,urlHost);

		if(type == 'allowed' )
		{
			accesstype = 'blocked';
			$scope.successMessage = "Request url allowed successfully.";
		}
		else if(type == 'blocked')
		{
			$scope.successMessage = "Request url blocked successfully.";
			accesstype = 'allowed';
		}

		var postUrl = "/proxies/dependents/"+$scope.cloudName+"/access";

		commonServices.saveProxyInfo(dataObject,postUrl).then(function(responseData)
		{					  
			if(responseData.uuid)
			{
				$scope.successMessageContainer = true;
				//$scope.deleteProxyRecord(accesstype,urlHost,requestlist);
				$('#addRecordModal').modal('hide');
			}
			else
			{
				$scope.errorMessageContainer = true;
			}
		});
	}


	$scope.allowBlockreqUrl = function(type,urlHost)
	{

		var dataObject= {};
		var accesstype;
		dataObject = $scope.getData(type,urlHost);

		if(type == 'allowed' )
		{
			accesstype = 'requested';
			$scope.successMessage = "Request url allowed successfully.";
		}
		else if(type == 'blocked')
		{
			$scope.successMessage = "Request url blocked successfully.";
			accesstype = 'allowed';
		}


		var postUrl = "/proxies/dependents/"+$scope.cloudName+"/access";

		commonServices.saveProxyInfo(dataObject,postUrl).then(function(responseData)
		{					  
			if(responseData.uuid)
			{
				$scope.successMessageContainer = true;
				//$scope.deleteProxyRecord(accesstype,urlHost,requestlist);
			}
			else
			{
				$scope.errorMessageContainer = false;
			}
		});
	}


	//function is called to load request list of dependents
	$scope.showRequestList = function(type,cloudName)
	{
		if(type=="requested")
		{
			$scope.requestContainer = true;
		}
		else if(type=="allowed")
		{
			$scope.allowedContainer = true;
			$scope.addRecordType = type;
		}
		else if(type=="blocked")
		{
			$scope.blockedContainer = true;
			$scope.addRecordType = type;
		}
		$scope.dependentContainer = false;
		$scope.cloudName = cloudName; 
		blockUI.start();

		commonServices.getProxyInfo('proxies/dependents/'+cloudName+'/access/'+type).then(function(result)
		{	
			if(result)
			{  
				$scope.requestData = result ;
				 
			}
			else
			{
				$scope.error = false;
			}
		 
			blockUI.stop();
		});
	}


	//function is called when page loads
	$scope.initiateList = function()
	{
		if($location.path() == "/guardianProxy")
		{
			
			$scope.dependentContainer = true;
			blockUI.start();
			commonServices.getProxyInfo('proxies/dependents').then(function(result)
			{	
				if(result)
				{  
					$scope.dependentData = result ;
				}
				else
				{
					$scope.error = false;
				}
				blockUI.stop();
			});
		}
		else if($location.path() == "/addDependent")
		{
			$scope.addDependentContainer = true;
		}
	}

	// function to start dependent service 
	$scope.dependentService = function(isValid,postUrl)
	{
		if(isValid)
		{
			//Updating paramters accordingly
				var dataObject= {
				"cloud_name" : $scope.dpName,
				"secret_token" : $scope.dependentDetail.dependentPass
				};
						
				commonServices.saveProxyInfo(dataObject,postUrl).then(function(responseData)
				{	
					if(responseData.cloud_name!='' && responseData.cloud_name!=undefined)
					{  
						$scope.initiateList();
						$('#userModal').modal('hide');
					}
					else
					{
						if(responseData.error!="")
						{
							$scope.errorMessageContaineruserModal = true;
							$scope.errorMessageuserModal = responseData.error;
						}
					}

				});
		}
		else
		{
			$scope.errorMessageContainer = true;
			$scope.loading_contactsInfo = false;
			$scope.errorMessage = "Error: Invalid Request";
		}
	}

	//function to open modal popup 
	$scope.show = function(dependentList)
	{ 
			$('#userModal').modal();
			var index= $scope.dependentData.indexOf(dependentList);
			$scope.dpName = $scope.dependentData[index].cloud_name;
	};

	$scope.addRecord = function(dependentList)
	{ 
			$('#addRecordModal').modal();
	};
	
	$scope.addDependent = function()
	{ 
			$('#addDependent').modal();
	};

	//this function will return data object as per type of request
	$scope.getData = function(type,urlHost)
	{
		var dataObject ={};
		if (type == 'allowed' || type == 'blocked')
		{

			dataObject = 
			{
				'guardian' : {
				'cloud_name': $scope.guardianCloudName,
				'secret_token' : 'respect123!'
				},
				'access' : {
				'type' : type,
				'url' : urlHost
			}
			};
		}
		else
		{
		dataObject = 
		{
			'dependent' : {
			'cloud_name': $scope.cloudName,
			'secret_token' : 'respect123!'
			},
			'access' : {
			'type' : type,
			'url' : urlHost
			}
			};
		}
		return dataObject;
	};

	//this function will delete the access record 
	$scope.deleteProxyRecord = function(accesstype,urlHost,requestList)
	{
	
			var index= $scope.requestData.indexOf(requestList);
			$scope.uuid = $scope.requestData[index].uuid;
		
	
						var dataobject1 = {};
					var deleteurl = "/proxies/dependents/"+$scope.cloudName+"/access/"+accesstype+"/uuid/"+$scope.uuid;
					dataobject1 ={
					"cloud_name" : $scope.guardianCloudName,
					"secret_token" : "respect123!"
					};

					commonServices.deleteProxyInfo(dataobject1,deleteurl).then(function(responseData)
					{
						$scope.showRequestList(accesstype,$scope.cloudName);
						 
					});
				
	};

	//funtion to stop dependent service
	
	$scope.stopDependentService = function(dependentList,deleteurl)
	{
	
		if(dependentList)
		{
			var index= $scope.dependentData.indexOf(dependentList);
			$scope.dpName = $scope.dependentData[index].cloud_name;
		
			//Updating paramters accordingly
				var dataObject= {
				"cloud_name" : $scope.dpName,
				"secret_token" : "respect123!"
				};

					commonServices.deleteProxyInfo(dataObject,deleteurl).then(function(responseData)
					{
						$scope.initiateList();
						 
					});
		}
		else
		{
			$scope.errorMessageContainer = true;
			$scope.loading_contactsInfo = false;
			$scope.errorMessage = "Error: Invalid Request";
		}
	}
	
	$scope.cloudCheckDep = function(cloudAvailUrl) {
		blockUI.start();
		if(cloudAvailUrl){
			$scope.loading_contactsInfo = true;
			commonServices.getInfo(cloudAvailUrl).then(function(responseData){	
				blockUI.stop();
				$scope.loading_contactsInfo = false;
				if(responseData.message =="true"){
					$scope.successMessageContainerAddDep = true;
					$scope.errorMessageContainerAddDep = false;
					$scope.successMessageAddDep = "This cloud name is available.";
					$scope.error = false;
				}else if((responseData.message =="false")){
					$scope.successMessageContainerAddDep = false;
					$scope.errorMessageContainerAddDep = true;
					$scope.errorMessageAddDep = "This cloud name is not available.";
					$scope.error = true;
				}
				else{
					$scope.errorMessageContainerAddDep = true;
					$scope.successMessageContainerAddDep = false;
					$scope.errorMessageAddDep = responseData[0].errorMessage;
					$scope.error = true;
	
				}
			
			});
		}else{
			$scope.errorMessageContainerAddDep = true;
			$scope.errorMessageAddDep = "Error: Invalid Request";
		}
	
	}
	
	$scope.registerDependent
	
	
	$scope.initiateList();
	

	});
