const express = require('express');
const WebSocket = require('ws');
const cron = require('node-cron');
const bodyParser = require('body-parser');
const { getHabits, addHabit, updateHabit, getWeeklyReport } = require('./routes/habits');
const fs = require('fs');

const app = express();
const port = 3000; 
app.use(bodyParser.json());

const wss = new WebSocket.Server({ port: 4000 }); 

app.post('/habits', addHabit);
app.put('/habits/:id', updateHabit);
app.get('/habits', getHabits);
app.get('/habits/report', getWeeklyReport);

cron.schedule('0 9 * * *', () => {
  console.log('Sending daily reminders...');

 
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ message: 'Time to update your habit progress!' }));
    }
  });
});

wss.on('connection', (ws) => {
  console.log('Client connected via WebSocket');
  
  
  ws.on('message', (message) => {
    console.log(`Received via WebSocket: ${message}`);
  });

  
  ws.send(JSON.stringify({ message: 'Welcome to Habit Tracker WebSocket!' }));
});

app.listen(port, () => {
  console.log(`HTTP server running at http://localhost:${port}`);
});

console.log('WebSocket server and cron job are running...');
