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
* run application on local host using live server in VS code

### Server app
* Go to server folder
* run npm install
* run npm install nodemon -g
* run nodemon app.js

Back end server of the app will be started at port 4000


### How to use the App

1. Go to Client app home page.Click on Signup on navigation bar
2. Sign up as admin( need to check the checkbox to sign up as admin
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


