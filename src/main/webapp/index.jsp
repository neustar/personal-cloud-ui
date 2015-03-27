<!doctype html>
<html lang="en" ng-app="myApp">
<head>
	<meta charset="utf-8">
 	<TITLE>Cloud Service Provider</TITLE>
	<link rel="stylesheet" href="css/ng-grid.css">
	<!-- Bootstrap core CSS -->
	<link rel="stylesheet" type="text/css" media="all" href="css/bootstrap.css"> 
	<link rel="stylesheet" type="text/css" href="css/style.css">
 	<link rel="stylesheet" href="css/intlTelInput.css"> 
	<link data-require="angular-block-ui@*" data-semver="0.1.1" rel="stylesheet" href="css/angular-block-ui.min.css" />
</head>
<body>
<!-- Common JS Resources -->
<script src="vendor/angular/1.3.0/jquery.js"></script>
<script src="vendor/angular/1.3.0/jquery-1.11.2.min.js"></script>
<script src="vendor/angular/1.3.0/angular.min.js"></script>
<script src="vendor/angular/1.3.0/angular-route.min.js"></script>
<script data-require="angular-block-ui@*" data-semver="0.1.1" src="vendor/angular/1.3.0/angular-block-ui.min.js"></script>
<script src="vendor/bootstrap/ui-bootstrap-tpls-0.10.0.min.js"></script>
<script src="vendor/angular/1.3.0/ng-grid-2.0.11.min.js"></script>
<script type="text/javascript" src="vendor/js/intlTelInput.js"></script>
 
<script src="angular/directives/tabset.js"></script>
<script src="angular/app.js"></script>

<!-- Cloud name Resources -->
<script src="angular/controller/home.js"></script>
<script src="angular/controller/registration.js"></script>
<script src="angular/services/commonServices.js"></script>

<!-- MAIN CONTENT AND INJECTED VIEWS -->
 
	<section id="main" class="container-fluid bg-img-one">
		<!-- HEADER -->
		<div class="header">  
		  <div class="header-logo"><img alt="Respect Network" src="images/respect-network-logo.png"></div> 
		</div>
		
		<!-- angular templating -->
        <!-- this is where content will be injected -->
		<div class="container" ng-view>
		    
		</div>
		
		<!-- FOOTER -->		
		<footer>
			<div class="row-fluid">
				<div class="cspMain ">YOUR CLOUD SERVICE PROVIDER | <img src="images/respect-network-logo.png"> &nbsp;
				</div>
			</div>
		</footer>
	</section>
 
<div class="headerStyle">
	 
	
</div> 
 

</body>
</html>