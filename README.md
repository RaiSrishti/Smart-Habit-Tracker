Smart Habit Tracker with Daily Updates
A simple habit tracker application built with Node.js, Express, and WebSocket to help users maintain daily habits by logging their progress and receiving reminders. The app tracks habits, sends daily reminders, and generates weekly reports.

Features
Add a habit: Create new habits with a name and a daily goal (e.g., "Drink 8 glasses of water").
Track habit completion: Mark habits as complete for the day.
Send daily reminders: Automated reminders to complete habits via WebSocket.
Weekly report: Generate a progress report for the last week.
Daily updates: Set daily reminders at a specific time for users to update their habits.
Requirements
Node.js (v14 or above)
npm (Node Package Manager)
Installation
1. Clone the repository
Clone the repository to your local machine:

bash
Copy code
git clone https://github.com/yourusername/habit-tracker.git
2. Install dependencies
Navigate to the project directory and install the required dependencies:

bash
Copy code
cd habit-tracker
npm install
This will install the following dependencies:

express: Framework for creating the API.
ws: WebSocket library for real-time communication.
node-cron: For scheduling daily reminders.
body-parser: Middleware for parsing incoming request bodies.
fs: File system module to store and retrieve habit data in a JSON file.
3. Run the application
Start the application by running:

bash
Copy code
npm start
The application will run on:

HTTP API: http://localhost:3000
WebSocket server: ws://localhost:4000
API Endpoints
1. Add a Habit (POST /habits)
Add a new habit with a name and a daily goal. The habit is saved in a JSON file.

Request Body:

json
Copy code
{
  "name": "Drink 8 glasses of water",
  "goal": "8 glasses"
}
Response:

json
Copy code
{
  "status": "success",
  "data": {
    "id": "1632429142743",
    "name": "Drink 8 glasses of water",
    "goal": "8 glasses",
    "completed": false,
    "date": "2024-12-04T00:00:00Z"
  }
}
2. Update Habit (PUT /habits/:id)
Mark a habit as complete for the day.

Request Body:

json
Copy code
{
  "completed": true
}
Response:

json
Copy code
{
  "status": "success",
  "data": {
    "id": "1632429142743",
    "name": "Drink 8 glasses of water",
    "goal": "8 glasses",
    "completed": true,
    "date": "2024-12-04T00:00:00Z"
  }
}
3. Get All Habits (GET /habits)
Fetch all active habits and their completion status.

Response:

json
Copy code
{
  "status": "success",
  "data": [
    {
      "id": "1632429142743",
      "name": "Drink 8 glasses of water",
      "goal": "8 glasses",
      "completed": false,
      "date": "2024-12-04T00:00:00Z"
    }
  ]
}
4. Weekly Report (GET /habits/report)
Generate a progress report for the last week, showing which habits were completed during the past 7 days.

Response:

json
Copy code
{
  "status": "success",
  "data": [
    {
      "id": "1632429142743",
      "name": "Drink 8 glasses of water",
      "goal": "8 glasses",
      "completed": true,
      "date": "2024-12-03T00:00:00Z"
    }
  ]
}
WebSocket Notifications
A WebSocket server is running on port 4000 and sends daily reminders to all connected clients at 9:00 AM every day. The reminders are sent to users to encourage them to update their habit progress.

WebSocket Connection Example
To connect to the WebSocket server, use the following URL:

ws
Copy code
ws://localhost:4000
Once connected, you will receive a welcome message:

json
Copy code
{
  "message": "Welcome to Habit Tracker WebSocket!"
}
At 9:00 AM every day, you will receive a reminder to update your habit progress:

json
Copy code
{
  "message": "Time to update your habit progress!"
}
How It Works
Add Habit: When a user adds a habit, it is saved in the habits.json file with a unique ID and the specified goal.
Update Habit: When a user marks a habit as completed, the habit's status is updated in the habits.json file.
Cron Job: The app runs a cron job every day at 9:00 AM to send reminders to all active WebSocket clients.
Weekly Report: The app tracks habits and provides a report for the last 7 days, showing completed habits.
Data Storage
Habit data is stored in a JSON file (data/habits.json). This file is read and updated each time a habit is added, updated, or requested.

Sample habits.json:
json
Copy code
[
  {
    "id": "1632429142743",
    "name": "Drink 8 glasses of water",
    "goal": "8 glasses",
    "completed": false,
    "date": "2024-12-04T00:00:00Z"
  }
]

Development Notes
Node.js is used to build the backend, with Express for handling HTTP requests.
WebSocket is used for sending real-time notifications to connected clients.
node-cron schedules daily reminders to be sent via WebSocket at 9:00 AM.
fs is used to store habits in a local JSON file (data/habits.json).
Future Improvements
Implement user authentication (e.g., using JWT tokens) for tracking habits per user.
Switch to a database (e.g., MongoDB, SQLite) for storing habits persistently.
Add a frontend interface to visualize habits and progress.
License
This project is open-source and available under the MIT License. See the LICENSE file for more details.

Conclusion
This README provides a clear overview of how the Smart Habit Tracker works, what it does, and how to get started. With these instructions, users can easily understand how to set up, use, and expand upon the project.
