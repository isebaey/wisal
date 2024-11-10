const WebSocket = require("ws");

// Create a WebSocket server on port 3000
const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", (ws) => {
  console.log("New client connected");

  // Send a welcome message to the client
  ws.send(JSON.stringify("Welcome to the Wisal Chat Server!"));

  // Handle incoming messages from the client
  ws.on("message", (message) => {
    const parsedMessage = JSON.parse(message);
    console.log(`Received: ${parsedMessage}`);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsedMessage));
      }
    });
  });

  // Handle client disconnect
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server running on ws://localhost:3000");
