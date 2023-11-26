const express = require('express');
// const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3532;

// Define the URL to ping
const targetUrl = 'https://profile.malcmind.com';

// Function to make a request to the specified URL
const pingUrl = async () => {
  try {
    const response = await fetch(targetUrl);
    if (response.ok) {
      console.log(`Ping successful at ${new Date()}`, response);
    } else {
      console.error(`Ping failed with status ${response.status} at ${new Date()}`);
    }
  } catch (error) {
    console.error(`Error while pinging URL: ${error.message} at ${new Date()}`);
  }
};

// Schedule the initial ping and set up the interval
pingUrl(); // Initial ping
const pingInterval = setInterval(pingUrl, 4 * 60 * 1000); // Every 4 minutes

// Define a simple route to check if the server is running
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

// Handle cleanup when the server is stopped
process.on('SIGINT', () => {
  clearInterval(pingInterval); // Clear the interval when the server is stopped
  console.log('Server shutting down');
  process.exit();
});
