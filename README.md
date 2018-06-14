# Ticket Based Support system using MEAN Stack
A generic ticket based support system for resolving queries on a platform 
 
### Project Description
  Support is an essential feature for any platform, and dedicated support is best approach in case you are really concerned about the     user experience of your platform.   The Aim of the project is to create an online ticket based support system, just like the one         present on edwisor.com which should be usable by any kind of platform to get support queries from their users and resolve them.  
 
  This project should be a Single Page application with separate backend and frontend. The backend should have REST APIs with proper       documentation. Take documentation from your previous project as reference.  You are allowed to use any kind of angular module,           libraries or tool you want. APIs have to be developed by you. 
 
#### Frontend Technologies allowed
  HTML 5, CSS, Javascript , Jquery and AngularJS 
 
#### Backend Technologies allowed
  NodeJs, ExpressJS, MongoDB.  
 
You are free to use any libraries/modules in backend and frontend both.  
 
 
#### Features of the platform  
 
1. Ticket Raising panel - User facing 
2. Ticket Resolution panel - Admin

- Ticket Raising panel - user end 

1. A view to login and Signup.
2. A View to create a ticket. Get all the necessary information like name, email, phone number, Query title and Query details. ​File upload is optional.
3. A View to view all queries raised by the person.  d) A view to show the details of a particular query. It should include the original question as well as the answer from admin and person in form of a conversation (chat like UI). This view should also have the option to set the status of the ticket to ‘open’ or ‘closed’ depending on whether the query is resolved or not.  
 
 
- Ticket Resolution Panel - Admin end 
1. View to Display ticket by status - This should list all tickets received by the support system. There should be a drop down menu to filter through the status of ticket. Ticket can be of status ‘open’ or ‘closed’ depending on whether the query is resolved or not.
2. A view to show the details of a particular query. It should include the original question as well as the answer from admin and person in form of a conversation (chat like UI). This view should also have the option to set the status of the ticket to ‘open’ or ‘closed’ depending on whether the query is resolved or not. The answer created here 
 
#### Additional Features -  
 
1. On Status change of ticket, the person should receive an email notification.
2. When the person receives the answer or the admin receives the reply, an email notification should be sent to the person concerned.  3. For the sake of simplicity, treat the Admin as a user of the system. Don’t create special backend for admin.  
 
##### A few important points
1. Run the APIs in POSTMAN once to see the response format. That will enable you to easily use that in your Angular code. 
2. The frontend should be single page with well defined View, controllers, directives and services. 
3. Backend should follow MVC format and should have properly defined middlewares and libraries. Authentication should be done using JWT.  4. Follow modern design guidelines while creating the view.  
5. Admin can be less intuitive, but try to make user experience as intuitive as you can 

## Solution
Deployed on url: http://pushy-expansion.surge.sh/

## Project Description:

#### Project Folder has 2 sub folder 
1. Client
2. Server

Client folder contains the frontend part of the application(AngularJS ,HTML,CSS)and Server folder contains the back-end(NodeJS,Express, MongoDB

* FrontEnd Framework used : AngularJS,MaterializeCSS
* RealTime Communication: SocketIO
* BackEnd : ExpressJS
* DB : MongoDB

## Running the app

* First start the mongoDB by  running command mongoD in mongoDB/bin directory

### Client app
* Go to Client folder directory
* run npm install
* run application on local host (using live server in VS code or any http server)

### Server app
* Go to server folder
* run npm install
* run npm install nodemon -g
* run nodemon app.js

Back end server of the app will be started at port 4000

#### Assumption
Admin account to be created first with valid email id and that ID to be stored in server/libs/config.js file into admin property of module.exports object to receive the mails about any reply or answer on ticket

### How to use the App

1. Go to Client app home page.Click on Signup on navigation bar
2. Sign up as admin( need to check the checkbox to sign up as admin)
3. Email id used for admin user should be added(to recieve the emails in server/libs/config.js file into the admin property.
or you can add any email id where you want to recieve the emails as admin.
4. After this  sign up as normal user (dont check the checkbox on signup page.You will be redirected to home page.
5. Now here you can click on create ticket button to create a ticket or click on My Tickets to check your tickets
6. On My tickets page all your created tickets will be shown with their status.you can also create ticket from here by clicking on create ticket button.
7. Tickets can filtered using status dropdown menu.Select from All,Open,Closed to filter the tickets accordingly.
8. Ticket will be shown with their Title,PostedBy and On and their Status(Open or Closed
9. Click on view button to see the details of particular object.
10. On particular ticket project.All the ticket details will be shown like title,details,PostedBy,Posted on and Status.Also the reply and answers from Admin will be shown below in Chat like UI
11. On ticket page,edit and delete ticket buttons are present to modify the ticket title and details or completely remove the ticket.
12. Ticket status can be changed by clicking on Close the ticket button or reopen the ticket button
13. On every reply or answer concerned person recieves a mail(In Real Time.Person who raised the query also receives a mail when ticket status is changed.

##### Extra features
1. When user receive a reply or answer that solves the query then he/she can accept that reply/answer as an answer and it will close the ticket.And that reply will be marked as an answer by green check sign on bottom left of the reply
2. Forgot Password/Reset Password Functionality.
3. Used Materialize toast to give user alert messages.
4. AngularJs client side form validation
5. used NgAnimate for smooth and beautiful transition between routes and also in ngRepeat items   
6. Edit ticket functionality (usr can only edit ticket title and ticket details.Name, email and Mobile No. provided by user are fixed.


