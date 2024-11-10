<template>
  <div id="app">
    <h1>Wisal Chat App</h1>
    <div class="chat-container">
      <div
        class="client"
        v-for="client in clients"
        :key="client.id"
        :style="{ backgroundColor: client.color }"
      >
        <h2 :style="{ color: client.headerColor }">Client {{ client.id }}</h2>
        <div class="chat-log">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            class="chat-message"
          >
            {{ msg }}
          </div>
        </div>
        <input
          v-model="client.message"
          placeholder="Type a message..."
          @keyup.enter="sendMessage(client)"
        />
        <button @click="sendMessage(client)">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socket: null,
      clients: [
        { id: 1, message: "", color: "#fce4ec", headerColor: "#e91e63" }, // Pink Theme
        { id: 2, message: "", color: "#e3f2fd", headerColor: "#2196f3" }, // Blue Theme
        { id: 3, message: "", color: "#e8f5e9", headerColor: "#4caf50" }, // Green Theme
      ],
      messages: [],
    };
  },
  methods: {
    sendMessage(client) {
      if (client.message.trim() !== "") {
        const chatMessage = `Client ${client.id}: ${client.message}`;
        this.socket.send(JSON.stringify(chatMessage));
        client.message = "";
      }
    },
  },
  mounted() {
    this.socket = new WebSocket("ws://localhost:3000");

    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      this.messages.push(message);
    });

    this.socket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap");

#app {
  font-family: "Poppins", sans-serif;
  text-align: center;
  background-color: #f4f7fa;
  color: #333;
  padding: 30px;
  padding-bottom: 50px;
  border-radius: 10px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 30px;
  font-size: 2.5rem;
  font-weight: 700;
}

.chat-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.client {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.client:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
  transition: color 0.3s;
}

input {
  padding: 10px 15px;
  margin-top: 15px;
  width: 90%;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #333;
  outline: none;
}

button {
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s, transform 0.3s;
}

button:hover {
  background-color: #555;
  transform: translateY(-2px);
}

.chat-log {
  margin-top: 20px;
  width: 100%;
  max-height: 250px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 15px;
  background-color: #fafafa6c;
}

.chat-message {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  font-size: 0.9rem;
}

.chat-message:last-child {
  border-bottom: none;
}
</style>
