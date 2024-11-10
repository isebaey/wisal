<template>
  <div id="app">
    <h1>Wisal Chat App</h1>
    <input
      v-model="message"
      placeholder="Enter your message"
      @keyup.enter="sendMessage"
    />
    <button @click="sendMessage">Send</button>
    <div class="chat-log">
      <div v-for="(msg, index) in messages" :key="index">{{ msg }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socket: null,
      message: "",
      messages: [],
    };
  },
  methods: {
    sendMeessage() {
      if (this.message.trim() != "") {
        // Send it as a string
        this.socket.send(JSON.stringify(this.message));
        this.message = "";
      }
    },
  },
  mounted() {
    // Establish WebSocket Connection
    this.socket = new WebSocket("ws://localhost:3000");

    // Listen for messages from the server
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      this.messages.push(message);

      // Handle connection closure
      this.socket.addEventListener("close", () => {
        console.log("WebSocket connection closed");
      });
    });
  },
};
</script>

<style></style>
