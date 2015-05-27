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
 	<TITLE>Cloud Service Home</TITLE>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">	
	<!-- Common JS Resources -->
	<script src="vendor/angular/1.3.0/jquery.js"></script>
	<script src="vendor/bootstrap/bootstrap.min.js"></script>
	<script src="vendor/angular/1.3.0/angular.min.js"></script>
	<script src="vendor/angular/1.3.0/angular-route.min.js"></script>
	<script data-require="angular-block-ui@*" data-semver="0.1.1" src="vendor/angular/1.3.0/angular-block-ui.min.js"></script>
	<script src="vendor/js/angular-modal-service.js"></script>
	<link rel="stylesheet" type="text/css" media="all" href="css/bootstrap.min.css"> 
	<link rel="stylesheet" href="css/ng-grid.css">
	<link rel="stylesheet" type="text/css" href="css/userStyle.css"> 	 
	<link data-require="angular-block-ui@*" data-semver="0.1.1" rel="stylesheet" href="css/angular-block-ui.min.css" />
</head>
<body>





<script src="vendor/bootstrap/ui-bootstrap-tpls-0.10.0.min.js"></script>
<script src="vendor/angular/1.3.0/ng-grid-2.0.11.min.js"></script>

 
  


<script src="angular/directives/tabset.js"></script>
<script src="angular/app.js"></script>

<!-- Cloud name Resources -->
<script src="angular/controller/userHome.js"></script>
<script src="angular/services/commonServices.js"></script>

<!-- MAIN CONTENT AND INJECTED VIEWS -->
 
<section class="bg-img clearfix">    
    <!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">
                    <img src="images/respect-network-logo.png" alt="">
                </a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">Contact Us</a>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="glyphicon glyphicon-user"></i>Test User <span class="caret"></span></a>
                      <ul class="dropdown-menu" role="menu">
                        <li><a href="#">USer First</a></li>
                        <li><a href="#">USer Second</a></li>
                        <li><a href="#">User Third</a></li>
                      </ul>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

    <!-- Page Content -->
    <div class="container" ng-view>
		    
		</div>
   <footer>
            
                <div class="col-lg-12 align">
                    <p style="text-align=center";>YOUR CLOUD SERVICE PROVIDER | <img src="images/home/csp_footer.png"></p>
                </div>
            
        </footer>

    <!-- /.container -->
</section>
  
</body>

</html>