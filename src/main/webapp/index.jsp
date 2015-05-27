<!--
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
-->
<!doctype html>
<html lang="en" ng-app="myApp">
<head>
	<meta charset="utf-8">
 	<TITLE>Cloud Service Provider</TITLE>
	<link rel="stylesheet" href="css/ng-grid.css">
	<!-- Bootstrap core CSS -->
	
	<script src="vendor/angular/1.3.0/jquery.js"></script>
	<script src="vendor/bootstrap/bootstrap.min.js"></script>
<script src="vendor/angular/1.3.0/angular.min.js"></script>
<script src="vendor/angular/1.3.0/angular-route.min.js"></script>
 <script src="vendor/angular/1.3.0/angular-cookies.min.js"></script>
<script data-require="angular-block-ui@*" data-semver="0.1.1" src="vendor/angular/1.3.0/angular-block-ui.min.js"></script>
 <script src="vendor/js/angular-modal-service.js"></script>	
<script src="vendor/js/angular-bootstrap-datepicker.js" charset="utf-8"></script>
	
	 
	 <link rel="stylesheet" type="text/css" href="css/angular-bootstrap-datepicker.css">
	<link rel="stylesheet" type="text/css" media="all" href="css/bootstrap.min.css"> 
	<link rel="stylesheet" type="text/css" href="css/style.css">
 	<link rel="stylesheet" href="css/intlTelInput.css"> 
	<link data-require="angular-block-ui@*" data-semver="0.1.1" rel="stylesheet" href="css/angular-block-ui.min.css" />
	
	
	</head>
<body>
<!-- Common JS Resources -->

<script src="vendor/bootstrap/ui-bootstrap-tpls-0.10.0.min.js"></script>
<script src="vendor/angular/1.3.0/ng-grid-2.0.11.min.js"></script>
<script type="text/javascript" src="vendor/js/intlTelInput.js"></script>

<script src="angular/directives/tabset.js"></script>
<script src="angular/app.js"></script>

<!-- Cloud name Resources -->
<script src="angular/controller/home.js"></script>
<script src="angular/controller/registration.js"></script>

<script src="angular/controller/userHome.js"></script>
<script src="angular/services/commonServices.js"></script>
<script src="angular/services/international-phone-number.js"></script>
<!--script src='https://checkout.stripe.com/checkout.js'></script-->
<!-- MAIN CONTENT AND INJECTED VIEWS -->
 
	<section id="main" class="container-fluid bg-img-one clearfix">
		<!-- HEADER -->
		
		
		<!-- angular templating -->
        <!-- this is where content will be injected -->
		<div  ng-view>
		    
		</div>
		
		<!-- FOOTER -->		

	</section>
 
<div class="headerStyle">
	 
	
</div> 
 

</body>
</html>