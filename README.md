# Flurn_assignment
This is a Booking Service which allows you to choose seats and book

# These are routes created , documented using postman
[Routes](https://documenter.getpostman.com/view/24325307/2s93z5A5Sv) go through the link for api Points

# Tech Stack used 
``MySql , Express.js , Nodejs , Sequilze , Sequilize-cli ``

# Steps to set up this application in ur Docker 
`note: please,Follow the steps exactly ` 


1.  Clone the Repositorty using this command
 
 `git pull (github url)`

2. Update the MySQL credentials in `config/config.json` (in development only).

3 .start local Mysql Server ,Create a database using this command 

 `CREATE DATABASE bookingservice`

 Open the file in the  terminal

4. Use the below command in terminal: 

`docker-compose up --build`

5. It will create a Docker image and run it automatically.

6. If you stop the application and want to use it again, you can use this command:

`docker run -p 3000:3000 <DOCKER IMAGE ID>`

7. Export .csv data to Mysql databases 

8. Your Set to go  

# challenges faced 

--> New to Docker 

--> facing chanllenges while connecting local Mysql server with Docker 

--> Exporting csv file into Mysql and creating Schema for the Tables. 

# What i have learned 


1.Usage of Docker 

2.More Clarity on Creating Mysql data base


