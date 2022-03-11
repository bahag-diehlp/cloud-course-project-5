# Microservices: Udacity capstone project

### Phone-Book

![ScreenShot](/screenshots/Frontend_Website.png)

The phone book is a simple single application of angular and is following the principle of the course "Monolith to Microservices at Scale". It allows to add user to the phone book list and getting some more information. The User Input is sotred in a postgres database
1. Frontend - Angular Web Application
2. Backend API - Node-Express application

### Archievments

1. Creating the Dockefiles for the frontend and backend application
![ScreenShot](/screenshots/DockerHub_Repos.png)

2. I wanted to build an CICD Pipeline but Travis-CI suspended my account and in the support they said it can not be reactivated
But i also added the travis.yml with the right commands for an Deployment.
![ScreenShot](/screenshots/Cannot_Use_Travis_Ci.png)

3. 
I created the Kubernetes Cluster and added the HPA / Services and the Pod to the Screenshots folder
![ScreenShot](/screenshots/get_pods.png)
![ScreenShot](/screenshots/kubectl_describe_services.png)
![ScreenShot](/screenshots/kubectl_get_services.png)


### Prerequisite
I have used a angular frontend with the copy based udagram-api-feed backend

### What does my App do
It will show the Users that are added to the database and u can look at more Informations for the user

#### Environment Script
A file named `set_env.sh` has been prepared as an optional tool to help you configure these variables on your local development environment.
 
We do _not_ want your credentials to be stored in git. After pulling this `starter` project, run the following command to tell git to stop tracking the script in git but keep it stored locally. This way, you can use the script for your convenience and reduce risk of exposing your credentials.
`git rm --cached set_env.sh`

Afterwards, we can prevent the file from being included in your solution by adding the file to our `.gitignore` file.

### 1. Database
Create a PostgreSQL database either locally or on AWS RDS. The database is used to store the application's metadata.
The credentials are fixed in the set_env.sh


### 2. S3
Created an AWS S3 bucket. Set the config values for environment variables in `set_env.sh`.

### 3. Backend API
Launch the backend API locally. The API is the application's interface to S3 and the database.

* To download all the package dependencies, run the command from the directory `phone-book-user/`:
    ```bash
    npm install .
    ```
* To run the application locally, run:
    ```bash
    npm run dev
    ```
* You can visit `http://localhost:8080/api/v0/user` in your web browser to verify that the application is running. You should see a JSON payload. Feel free to play around with Postman to test the API's.

### 4. Frontend App
Launch the frontend app locally.

* To download all the package dependencies, run the command from the directory `phone-book-frontend`:
    ```bash
    npm install .
    ```
* Run the application locally using files created from the command.
    ```bash
    npm start
    ```
* You can visit `http://localhost:4200` in your web browser to verify that the application is running. You should see a web interface.

** Note: Unfortunately, I had to terminate all my AWS resources to avoid AWS costs.