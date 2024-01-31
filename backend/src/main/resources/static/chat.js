const websocketUrl = "/ws";
const topic = "/topic/rooms/";
const app = "/app/chat/";
var client = null;
var currentRoom = '';

function connectToRoom(roomId) {
    currentRoom = roomId;
    const sock = new SockJS(websocketUrl);
    client = Stomp.over(sock);
    client.connect({}, () => {
        setConnected(true);
        client.subscribe(topic + roomId, payload => {
            showMessage(JSON.parse(payload.body).content);
        });
    });
    console.log("Connected to room " + roomId);
};

function disconnect() {
    if (client !== null) {
        client.disconnect();
        setConnected(false);
        console.log("Disconnected");
    }
}

function sendMessage() {
    let messageContent = messageInput.value;
    if (messageContent && client) {
        var chatMessage = {
            content: messageContent,
            sender: "User" // Możesz tu dodać logikę dla nazwy użytkownika
        };
        client.send(app + currentRoom + "/sendMessage", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
}

function showMessage(message) {
    messages.innerHTML += "<tr><td>" + message + "</td></tr>";
}

function setConnected(connected) {
    buttonConnect.disabled = connected;
    buttonDisconnect.disabled = !connected;
    buttonSend.disabled = !connected;
    if (connected) {
        conversation.style.display = "block";
    } else {
        conversation.style.display = "none";
    }
    messages.innerHTML = "";
}

document.addEventListener("DOMContentLoaded", function() {
    buttonConnect = document.getElementById("connect");
    buttonDisconnect = document.getElementById("disconnect");
    buttonSend = document.getElementById("send");
    conversation = document.getElementById("conversation");
    messages = document.getElementById("messages");
    roomInput = document.getElementById("room");
    messageInput = document.getElementById("message");
    buttonConnect.addEventListener("click", (e) => {
        connectToRoom(roomInput.value);
        e.preventDefault();
    });
    buttonDisconnect.addEventListener("click", (e) => {
        disconnect();
        e.preventDefault();
    });
    buttonSend.addEventListener("click", (e) => {
        sendMessage();
        e.preventDefault();
    });
    setConnected(false);
});
