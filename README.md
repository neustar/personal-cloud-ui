Project Description
-------------------

In Personal Cloud UI, the individual controls the information and the processes, that operate on the information.Personal Cloud can be described as a virtual entity, which can do one or more of the following things :
- Any user can register a personal cloud name for himself.
- Registered user can login to personal cloud ui, manage and use functionality provided like: 	register dependent cloud name, register additional cloud name, use proxy services.
- Registered user can change password.
- Personal Cloud user can start his proxy server and manage proxy services of his dependent.
- To manage dependent proxy first proxy server for dependent is needed to be started.
- After starting the proxy server for dependent, guardian can add access record against particular dependent e.g URL to be allowed or blocked.
- Guardian can also see the dependent logs, which shows all the websites  accessed by dependent.
- User can also view list of additional and dependent cloud name registered under his/her profile.

Project Setup
-------------
This project is based on the angularJs javascript library(open-source web application framework maintained by Google ,extends HTML with new attributes, perfect for Single Page Applications (SPAs)) . This library will be automatically retrieved upon launch of project.

Project also access Bootstrap(web application framework), HTML and CSS-based design templates for typography, forms, buttons, navigation and other interface components, as well as optional JavaScript extensions.This library too will be automatically retrieved upon launch of project.

Deploying
---------
- Using command prompt window first reach inside project folder personal-cloud-ui.
- Then build personal-cloud-ui project using "mvn clean install" command.
- Place personal-cloud-ui.war from project target folder in your tomcat webapps folder.
- Start your tomcat.
- After successfully starting your tomcat server, access project by simply loading the http://localhost:port/personal-cloud-ui/index.jsp in your browser.

Contributors
------------
If you find a bug or would like to suggest improvements, please use the issue
tracker available on GitHub.

License
-------
This tool is made available under the [MIT license] (https://github.com/twbs/bootstrap/blob/master/LICENSE).

 

 
