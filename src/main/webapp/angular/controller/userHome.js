'use strict'
angular.module('myApp').controller("userHome", function ($scope,ModalService,$cookies,$location,commonServices,blockUI,globalInfo) {

$scope.dependentData = {};
$scope.requestData = {};
$scope.dpName = "";
$scope.actCloudName="";
$scope.dependentDetail = {};
$scope.errorMessageContainer = false;
$scope.errorMessageContaineruserModal = false;
$scope.errorMessageContainerRecordModal = false;
$scope.errorMessageContainerAddDep = false;
$scope.successMessageContainerAddDep = false;
$scope.successMessageContainer = false;
$scope.successReqContainer = false;
$scope.successMessageContainerChangePass=false;
$scope.errorMessageContainerChangePass = false;
$scope.userlogin = {};	 
$scope.addDepedent={};
$scope.guardianCloudName = $cookies.guardianCloudName;
$scope.cloudName = "";
$scope.addRecordType = "";
$scope.uuid="";
$scope.additionalCloud = {};
$scope.changePassword = {};
$scope.additionalCloudList = {};	
$scope.dependentcloudlist = {};
$scope.user= {};	
$scope.errorPaymentContainer = false;
$scope.guardiandata = {};
$scope.cspName = globalInfo.cspName;

// avaiable registration form container
$scope.dependentContainer = false;
$scope.requestContainer = false;
$scope.rejectedContainer = false;
$scope.error = true;
$scope.user.hasErrorCond = false;
$scope.addCloudFirstContainer = true;
$scope.addCloudPayContainer = false;
$scope.addDepCloudFirstContainer = true;
$scope.addDepCloudPayContainer = false;

$scope.userlogin.cloudName = $cookies.guardianCloudName; 
$scope.userlogin.guardianPassword = $cookies.guardianPassword;

$scope.requestActive = true;
$scope.blockedActive = false;
$scope.allowedActive = false;


$scope.activityContainer = false;
$scope.numberRequested = {};
$scope.numberBlocked = {};
$scope.numberAllowed = {};

$scope.guardianName = $scope.guardianCloudName;
$scope.changepass = {};
$scope.changepass.show = false;


	
	//function is called to allow a request 
	$scope.allowBlockUrl = function(type,urlHost,requestlist,requestType)
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
				if(requestType=="old"){
				$scope.deleteProxyRecord(accesstype,urlHost,requestlist);				
				}
				else if(requestType=="new"){
				$('#addRecordModal').modal('hide');
				$scope.showRequestList(type,$scope.cloudName);
				}
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
				$scope.deleteProxyRecord(accesstype,urlHost,requestlist);
			}
			else
			{
				$scope.errorMessageContainer = false;
			}
		});
	}
	
	$scope.enableTab = function(type,cloudName)
	{
		$scope.user.selectedCloudName =  cloudName;
		$scope.errorMessageContainer = false;
		$scope.successMessageContainer = false;
		if(type=='requestActive'){
			$scope.blockedActive = false;
			$scope.allowedActive = false;
			$scope.requestActive = true;
			
			$scope.showRequestList("requested",cloudName);
		}else if(type=='blockedActive'){
			$scope.requestActive = false;
			$scope.allowedActive = false;
			$scope.blockedActive = true;
			
			$scope.showRequestList("blocked",cloudName);
		} else if(type=='allowedActive'){
			$scope.blockedActive = false;
			$scope.requestActive = false;
			$scope.allowedActive = true;
			$scope.showRequestList("allowed",cloudName);
		}
			 
	}

	//function is called to load request list of dependents
	$scope.showRequestList = function(type,cloudName)
	{
		if(type=="requested")
		{
			$scope.requestContainer = true;
			// $scope.allowedContainer = false;
			// $scope.blockedContainer = false;
			
		}
		else if(type=="allowed")
		{
			// $scope.allowedContainer = true;
			// $scope.blockedContainer = false;
			// $scope.requestContainer = false;
			$scope.addRecordType = type;
		}
		else if(type=="blocked")
		{
			// $scope.blockedContainer = true;
			// $scope.requestContainer = false;
			// $scope.allowedContainer = false;
			$scope.addRecordType = type;
		}
		$scope.dependentContainer = false;
		$scope.cloudName = cloudName; 
		blockUI.start();
		var dataObject= {
							"cloud_name": $scope.guardianCloudName,
							"secret_token":$scope.userlogin.guardianPassword
						};
		commonServices.putProxyInfo(dataObject,'proxies/dependents/'+cloudName+'/access/'+type).then(function(result)
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
			$scope.activityContainer = false;
			$scope.blockedContainer = false;
			$scope.requestContainer = false;
			$scope.allowedContainer = false;
			$scope.errorMessageContainer = false;
			$scope.successMessageContainer = false;
			
			blockUI.start();
			var dataObject= {
								"cloud_name": $scope.guardianCloudName,
								"secret_token":$scope.userlogin.guardianPassword
							};
			//checking first guardian is login or not
			commonServices.putProxyInfo(dataObject,'proxies/guardian').then(function(result)
			{
				if(!result.error)
				{
					$scope.guardiandata.guardianName = result.cloud_name;
					$scope.guardiandata.guardianTimeStarted = result.time_started;
					
					commonServices.putProxyInfo(dataObject,'proxies/dependents').then(function(result)
						{	
							if(result)
							{  
								$scope.dependentData = result ;
							}
							else
							{
								$scope.error = false;
							}
							
						});
				}else{
						$scope.guardianName = $scope.guardianCloudName;
						$scope.guardiandata.guardianTimeStarted ="";
						$scope.dependentData = {};
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
			$scope.errorMessageContaineruserModal = true;
			$scope.errorMessageuserModal = "Error: Invalid Request";
		}
	}

	//function to open modal popup 
	$scope.show = function(dependentList)
	{ 
			$('#userModal').modal();
			var index= $scope.dependentData.indexOf(dependentList);
			$scope.dpName = $scope.dependentData[index].cloud_name;
			
			$scope.dependentDetail.dependentForm.$setPristine();
			$scope.errorMessageContaineruserModal= false;
			$scope.dependentDetail.dependentPass = '';
	};
	
	$scope.startGuardian = function()
	{ 
			var dataObject= {
								"cloud_name": $scope.guardianCloudName,
								"secret_token":$scope.userlogin.guardianPassword
							};
			
			commonServices.saveProxyInfo(dataObject,'proxies/guardian').then(function(result)
			{ 
					if(result.cloud_name!='' && result.cloud_name!=undefined)
					{
						$scope.initiateList();
					}else{
					 
						$scope.errorMessageContainer= true;
						$scope.errorMessage = result.error;
					}
				
			});
	};
	
	$scope.stopGuardian = function()
	{ 
	var dataObject= {
								"cloud_name": $scope.guardianCloudName,
								"secret_token":$scope.userlogin.guardianPassword
							};
	commonServices.deleteProxyInfo(dataObject,'proxies/guardian').then(function(responseData)
					{ 
						if(responseData.error!='' && responseData.error!= undefined){
							$scope.errorMessageContainer= true;
							$scope.errorMessage = responseData.error;
						}else{
							$scope.initiateList();
						}
						 
					});
	};
	
	$scope.datepickerOptions = {
			format: 'yyyy-mm-dd',
			language: 'en',
			autoclose: true,
			weekStart: 0
		}
	$scope.addDepedent.depCloudDOB = null;
	
	$scope.addRecord = function(modalName)
	{ 
			
			$('#'+modalName).modal();
			$scope.addCloudFirstContainer = true;
			$scope.addCloudPayContainer = false;
			$scope.errorMessageContainerAddDep = false;
			$scope.successMessageContainerAddDep = false;
			$scope.addDepCloudFirstContainer = true;
			$scope.addDepCloudPayContainer = false;
			$scope.errorPaymentContainer = false;
			$scope.user.hasErrorCond = false;
			$scope.changepass.show = false;
			
			$scope.additionalCloud.cloudName1 = "";
			$scope.changePassword.currentPassword = "";
			$scope.changePassword.newPassword ="";
			$scope.changePassword.confNewPassword="";
			$scope.addDepedent.depCloudName = "";	
			$scope.addDepedent.depCloudpass = "";	
			$scope.addDepedent.depCloudconfPass = "";	
			//$scope.addDepedent.datepicker = null;	
			$scope.addDepedent.depCloudDOB = null;
			$scope.addDepedent.I_AgreeAddDep = "";
			$("#dateActualId").val(''); 
			if($location.path() == "/guardianProxy")
			{
				$scope.dependentDetail.addRecordForm.$setPristine();
				$scope.dependentDetail.urlAllowBlock = "";
			}
			
			
	};
	/* //not need now //
	$scope.addDependent = function()
	{ 
			$('#addDependent').modal();
	};
    */

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
				'secret_token' : $scope.userlogin.guardianPassword
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
			'secret_token' : $scope.userlogin.guardianPassword
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
					"secret_token" : $scope.userlogin.guardianPassword
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
				"secret_token" : $scope.userlogin.guardianPassword
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
	//this function append "=" sign to cloud Name
	$scope.appendSign = function()
	{ 
		if($scope.additionalCloud.cloudName1 && !($scope.additionalCloud.cloudName1.charAt(0) == "="))
		{
			$scope.additionalCloud.cloudName1 = '='+$scope.additionalCloud.cloudName1;
			
		} 
		if($scope.addDepedent.depCloudName && !($scope.addDepedent.depCloudName.charAt(0) == "="))
		{
			$scope.addDepedent.depCloudName = '='+$scope.addDepedent.depCloudName;
			
		} 
	
	}
	
	$scope.cloudCheckDep = function(cloudAvailUrl) {
		blockUI.start();
		if(cloudAvailUrl){
			cloudAvailUrl = 'clouds/personalClouds/'+cloudAvailUrl+'/available';
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
					if(responseData.errorMessage){
					$scope.errorMessageAddDep = responseData.errorMessage;
					}
					else if(responseData.message){
					$scope.errorMessageAddDep = responseData.message;
					}
					else if(responseData[0].errorMessage){
					$scope.errorMessageAddDep = responseData[0].errorMessage;
					}
					else {
					$scope.errorMessageAddDep = "Error : Invalid request.";
					} 					
					$scope.error = true;
	 
				}
			
			});
		} 
	
	}
	
	
	$scope.submitPayCloud = function() {
	
					var dataObject= {
									paymentType : "CREDIT_CARD",
									paymentReferenceId : "abcde0123456789",
									paymentResponseCode:"OK",
									amount:"10",
									currency:"USD"
									};
					var apiUrl = {postUrl : 'products/SCN/payments'};
					commonServices.saveInfo(dataObject,apiUrl).then(function(responseData){	 
					 
						if(responseData.paymentId != null){
											
							$scope.registerAdtCloudName(responseData.paymentId,'csp/'+globalInfo.cspName+'/clouds/personalClouds/'+$scope.userlogin.cloudName+'/synonyms');
																
						}
						else
						{
							$scope.errorPaymentContainer = true;
							$scope.errorPaymentMessage = "Error: Invalid request";
						}
					});
	}
	
	// function to submit additional cloud 
	$scope.submitAdnCloud = function(isValid,event,serviceName) {
	
		if(isValid){
			$scope.errorMessageContainer = false;
			$scope.successMessageContainer = false;	
			$scope.addCloudFirstContainer = false;
			$scope.addCloudPayContainer = true;				 
			
		}else{
			$scope.errorMessageContainer = true;
			$scope.errorMessage = "Error: Invalid Request";
			$scope.error = true;
		}
	}
	
	
	$scope.registerAdtCloudName = function(paymentID,posturl)
	{ 
			if(paymentID != null){
			$scope.errorMessageContainer = false;
			$scope.successMessageContainer = false;	
			$scope.loading_contactsInfo = true;
			 
			 var apiUrl = {postUrl : posturl};
			 
			var additionalCloudArray = [];
			if($scope.additionalCloud.cloudName1)
			additionalCloudArray.push($scope.additionalCloud.cloudName1);
									 
									
			//Updating paramters accordingly
			var dataObject= {
				paymentId : paymentID,
				personalCloudPassword :$scope.userlogin.guardianPassword,
				rnPolicyConsent : true,
				cspPolicyConsent : true,
				synonymCloudNames: additionalCloudArray
			};
			 
								
			commonServices.saveInfo(dataObject,apiUrl).then(function(responseData){	
			
				if(responseData.message == "Success"){
					$scope.successMessageContainerAddDep = true;
					$scope.errorMessageContainerAddDep = false;
					$scope.successMessageAddDep = "This cloud name is registered successfully.";
					$scope.CongratulationContainer = true;
					$('#addCloudModal').modal('hide');
					$scope.additionalCldList();
				}
				else
				{
					$scope.errorMessageContainer = true;
					$scope.errorMessage = responseData[0].errorMessage;
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
	
	//function is called when page loads
	$scope.additionalCldList = function()
	{
		if($location.path() == "/additionalCloud")
		{
			
			
			blockUI.start();
			commonServices.getInfo('csp/'+globalInfo.cspName+'/clouds/personalClouds/'+$scope.userlogin.cloudName+'/synonyms').then(function(result)
			{	
				if(result)
				{  
					$scope.additionalCloudList = result.synonymCloudNames;
				}else{
					
					$scope.additionalCloudList.totalrow = 0 ; 	
					
				}
				 
				
				blockUI.stop();
			});
		}
		 
	}
	
	
	$scope.dependentCldList = function()
	{
		if($location.path() == "/addDependent")
		{
			
			
			blockUI.start();
			commonServices.getInfo('csp/+cynja/clouds/personalClouds/=cynjapersonal1/dependents').then(function(result)
			{	
				if(result)
				{  
					$scope.dependentcloudlist = result.dependents ;
				}else{
					
					$scope.dependentcloudlist.totalrow = 0; 				
				}
				 
				 
				blockUI.stop();
			});
		}
		 
	}
	
	
	$scope.submitDepPayCloud = function(){
	
		//Updating paramters accordingly
			var dataObject= {
				paymentType : "CREDIT_CARD",
				paymentReferenceId : "abcde0123456789",
				paymentResponseCode:"OK",
				amount:"15",
				currency:"USD"
			};
			var apiUrl = {postUrl : 'products/DCN/payments'};
			commonServices.saveInfo(dataObject,apiUrl).then(function(responseData){	
			if(responseData.paymentId != null){
					$scope.pageLoaded = true;					
					$scope.loading_contactsInfo=false;								  
					$scope.userDetailContainer = false;
					$scope.validUserContainer = false;		
					$scope.paymentContainer = true;
					$scope.registerDepCloudName(responseData.paymentId,'csp/'+globalInfo.cspName+'/clouds/personalClouds');
				}
				else
				{
					$scope.errorPaymentContainer = true;
					$scope.errorPaymentMessage = "Error: Invalid request";
				}
			});
	
	}
	$scope.getPaymentID = function(isValid,posturl,event,serviceName)
	{ 
		
		if(isValid){
				if($scope.addDepedent.depCloudpass!=undefined && !($scope.addDepedent.depCloudpass===$scope.addDepedent.depCloudconfPass)){
				
					$scope.errorMessageContainerAddDep = true;
					$scope.successMessageContainerAddDep = false;				 
					$scope.errorMessageAddDep = "Password don't match";
					return false;
				
				}
			$scope.errorMessageContainer = false;
			$scope.successMessageContainer = false;	
			$scope.addDepCloudFirstContainer = false;
			$scope.addDepCloudPayContainer = true; 
		}
		else
		{
			$scope.user.hasErrorCond = true;
			
		}
	
	}
	
	$scope.registerDepCloudName = function(paymentID,posturl)
	{ 
			if(paymentID != null){
			$scope.errorMessageContainerAddDep = false;
			$scope.successMessageContainerAddDep = false;	
			$scope.loading_contactsInfo = true;
			 
			 var apiUrl = {postUrl : posturl};
			 
			 
			//Updating paramters accordingly
			var dataObject= {
								properties: 
								{
									cloudName: $scope.addDepedent.depCloudName,
									requestType: "DEPENDENT",
									paymentId: paymentID,
									rnPolicyConsent: $scope.addDepedent.I_AgreeAddDep,
									cspPolicyConsent: $scope.addDepedent.I_AgreeAddDep
								},
								dependentCloudInfo: 
								{
									guardianCloudName: $scope.userlogin.cloudName,
									guardianCloudPassword: $scope.userlogin.guardianPassword,
									dependentCloudDOB: $scope.addDepedent.depCloudDOB,
									dependentCloudPassword:$scope.addDepedent.depCloudpass,
									guardianConsent: $scope.addDepedent.I_AgreeAddDep
							}};
								
								
			commonServices.saveInfo(dataObject,apiUrl).then(function(responseData){	
			
				if(responseData.message == "Success")
				{
							$scope.addDependentContainer = true;
							$scope.successMessageContainerAddDep=true;
							$scope.successMessageAddDep="Dependent Cloud Added Successfully";
							$('#addDependent').modal('hide');
				}
				else
				{
					$scope.errorMessageContainer = true;
					$scope.errorMessage = responseData[0].errorMessage;
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
	
	$scope.changePassword = function(isvalid,apiurl)
	{
		if(isvalid)
		{	
			if($scope.changePassword.newPassword!=undefined && !($scope.changePassword.newPassword===$scope.changePassword.confNewPassword))
			{
		
			$scope.errorMessageContainerChangePass = true;
			$scope.errorMessageChangePass = "New Password and Confirm Password doesn't match";
			return false;
		
			}
		
			var dataObject = {
								currentPassword:$scope.changePassword.currentPassword,
								password:$scope.changePassword.newPassword,
								confirmPassword:$scope.changePassword.confNewPassword
			
			
								};
								var apiUrl = {postUrl : apiurl};
								
			commonServices.saveInfo(dataObject,apiUrl).then(function(responseData){	
			
				if(responseData.message == "Success")
				{
							$scope.addDependentContainer = true;
							$scope.successMessageContainerChangePass=false;
							$scope.successMessageChangePass="Password Changed Successfully Successfully";
							//$('#changePassword').modal('hide');
							$scope.changepass.show = true;
							$scope.errorMessageContainerChangePass = false;
							$cookies.guardianPassword = $scope.changePassword.newPassword;
							$scope.userlogin.guardianPassword = $cookies.guardianPassword;
				
				
				}
				else
				{
					$scope.errorMessageContainerChangePass = true;
					$scope.errorMessageChangePass = responseData[0].errorMessage;
				}
			});
		
		
		}
		else
		{
				$scope.user.hasErrorCond = true;
		}
			
	
	}
	
	$scope.activityMonitor = function(dependentList)
	{
			
			var index= $scope.dependentData.indexOf(dependentList);
			$scope.actCloudName = $scope.dependentData[index].cloud_name;
			$scope.numberRequested = $scope.dependentData[index].number_of_requests;
			$scope.numberBlocked = $scope.dependentData[index].number_of_requests_blocked;
			$scope.numberAllowed = $scope.dependentData[index].number_of_requests_allowed;
			
			var apiURl = "/proxies/dependents/"+$scope.actCloudName+"/access/log";
			$scope.blockedContainer = false;
			$scope.requestContainer = false;
			$scope.allowedContainer = false;
			$scope.dependentContainer = false;
			$scope.activityContainer = true;
			
			var dataObject= {
								"cloud_name": $scope.guardianCloudName,
								"secret_token":$scope.userlogin.guardianPassword
							};
	 
			commonServices.putProxyInfo(dataObject,apiURl).then(function(result)
			{	
				if(result)
				{  
					$scope.dependentlog = result ;
				}
				else
				{
					$scope.error = false;
				}
				blockUI.stop();
			});
	};
	
	$scope.logout = function()
	{
			delete $cookies['guardianCloudName'];
			delete $cookies['guardianPassword'];
			$location.path('home');
	}
	
	$scope.closeModal = function(modalName)
	{
		$('#'+modalName).modal('hide');
	}
	
	
	$scope.initiateList();
	$scope.additionalCldList();
	$scope.dependentCldList();

	});
