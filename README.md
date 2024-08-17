# MERN Exercise Tracker

**Project Overview:**
I used the MERN stack to create a Single Page Application (SPA) that tracked exercises completed by a user. For the frontend, I used React to build the UI. On the backend, I wrote a REST API using Node.js and Express to handle the server-side logic. MongoDB was my choice for persistence, storing user data and exercise records.

**Setting Up the Project:**
I started by creating a new project directory and set up the structure for both the frontend and backend.

**Backend Development:**
I initialized a Node.js project in the backend directory and installed dependencies like Express for the server framework, Mongoose for MongoDB interactions, and other essentials.

**Frontend Development:**
I used `npm create vite@latest exercises_ui -- --template react` to quickly set up my React project. This provided the foundation for building the user interface.

**Connecting the Frontend and Backend:**
I made sure that my React app could communicate with the Express server by setting up appropriate API routes and handling requests to the backend.

**Persisting Data:**
MongoDB handled data storage. I set up schemas and models to manage exercise records and user information.

**How to Run the App:**

1. Go to the root directory of the REST API, run `npm install` and then `npm start` to start the REST API and test it.
   
3. Go to the root directory of the React app, run `npm install` and then `npm run dev` to start the React app and test it.
