# WakanowInterviewProject - Sample Admin application

# Introduction

This is a sample administrative application which provides an admin the privileges of:

        i.  Approving a user for login
        ii. Changing the admin status of a user
        iii. Updating and deleting user records

# Getting Started

1. Installation process

Install the web app by cloning this repo using the git command "git clone #repoURL". Once cloned, include the environment variables typescript file, and run "npm install" to install all dependencies.

To build the web app, take the following steps

        i. Environment variables:

            Ensure the variables found in the environment.deploy.ts file as available;

            baseUrl - the url used to make http request to the backend resource.

            value - https://reqres.in/


        ii. Building the web app for a specific brand:

            To build the app, run the command "ng build" in the command line.


        iii. Test the deployed web app in a browser of your choice. Note that using an incognito browser tab will display the   latest build updates faster than a regular browser tab

        iv. The below information will be used to test and run the application
                •	Default admin email - michael.lawson@reqres.in
                •	Default admin password - qwerTy123!
                •	Users emails to be used for testing -
                        - lindsay.ferguson@reqres.in
                        - tobias.funke@reqres.in
                        - byron.fields@reqres.in
                        - george.edwards@reqres.in
                        - rachel.howell@reqres.in
                •	User passwords for testing - qwerTy123!

2. Software dependencies

   - rxjs

# Challenges

While tackling this sample project, I encountered some challenges, particularly in managing time effectively.

The implementation involved utilizing a queue data structure to track admins and their respective user privileges, incorporating CRUD methods akin to array methods.

Despite time constraints preventing the addition of intricate frontend UI elements like micro-interactions and route loading animations, I prioritized developing robust logic for admin approval processes, user management, and form input validations.
