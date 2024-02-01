import React, { useState, useEffect } from 'react';
import { Chat, ChatInput } from "../../index";

const ModulChat = ({ roomId, userId }) => {
    const [ws, setWs] = useState(null);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Inicjalizacja połączenia WebSocket
        const websocket = new WebSocket(`ws://localhost:8086/ws`);

        websocket.onopen = () => {
            console.log('WebSocket Connected');
            setConnected(true);
            // Dołącz do pokoju (wymaga obsługi po stronie serwera)
            websocket.send(JSON.stringify({ action: 'join', roomId, userId }));
        };

        websocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.roomId === roomId) {
                // Aktualizacja stanu wiadomości
                setMessages(prev => [...prev, message.content]);
            }
        };

        websocket.onclose = () => {
            console.log('WebSocket Disconnected');
            setConnected(false);
        };

        setWs(websocket);

        // Czyszczenie przy odmontowywaniu komponentu
        return () => {
            websocket.close();
        };
    }, [roomId, userId]);

    const sendMessage = (content) => {
        if (content && roomId && userId && ws && connected) {
            const chatMessage = { roomId, userId, content, type: 'CHAT' };
            ws.send(JSON.stringify(chatMessage));
        }
    };

    // Przykład użycia `sendMessage`
    // Można by było przekazać `sendMessage` do komponentu `ChatInput` jako prop
    // aby umożliwić wysyłanie wiadomości z tego komponentu.

    return (
        <>
            <Chat>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </Chat>
            <ChatInput onSend={sendMessage} />
        </>
    );
};

export default ModulChat;
