# User management Dashbaord

A comprehensive user management dashboard utilizing React, Vite, and Tailwind CSS, implementing CRUD functionality (Create, Read, Update, Delete) for user management.
This project demonstrates the ability to design, implement, and integrate a user-friendly dashboard UI using React.js, Vite, Axios, and Tailwind CSS. The dashboard allows for full CRUD operations on user data using a provided API endpoint.

#Installation
Clone the repository:  git clone https://github.com/fiokee/assesment-test.git

run : npm install


run: npm run dev or npm start

#Usage
Create User:

Navigate to the 'Users' section.
Click on the 'Add User' button.
Fill in the user details in the form and submit.
A POST request will be sent to the API to create a new user.
Read Users:

The users' list is displayed on the 'Users' section.
The app sends a GET request to the API to fetch and display the list of users.
Update User:

In the users' list, click on the 'Edit' button next to a user.
Update the user details in the form and submit.
A PUT request will be sent to the API to update the user details.
Delete User:

In the users' list, click on the 'Delete' button next to a user.
Confirm the deletion in the modal dialog.
A DELETE request will be sent to the API to delete the user.
Features
Create User: Form to add a new user.
Read Users: Fetch and display a list of users.
Update User: Form to edit user details.
Delete User: Functionality to delete a user with confirmation.
API
The project uses the following API endpoint for CRUD operations:

Base URL: https://beeceptor.com/crud-api/
