import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const ModulChat = ({ roomId }) => {
    const [client, setClient] = useState(null);
    const [connected, setConnected] = useState(false);
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Czyszczenie wiadomości przy zmianie roomId
        setMessages([]);
    }, [roomId]);

    const connect = () => {
        if (!roomId || !userId) {
            alert('Room ID and User ID are required');
            return;
        }

        const sock = new SockJS('/spring-boot-tutorial');
        const stompClient = Stomp.over(sock);

        stompClient.connect({}, frame => {
            setConnected(true);
            console.log('Connected: ' + frame);

            stompClient.subscribe(`/topic/rooms/${roomId}`, message => {
                const messageContent = JSON.parse(message.body).content;
                setMessages(prevMessages => [...prevMessages, messageContent]);
            });

            // Join the room
            stompClient.send(`/app/chat/${roomId}/addUser`, {}, JSON.stringify({ userId: userId }));
            setClient(stompClient);
        });
    };

    const disconnect = () => {
        if (client) {
            client.disconnect();
        }
        setConnected(false);
        console.log("Disconnected");
    };

    const sendMessage = () => {
        if (message && roomId && userId && client) {
            const chatMessage = {
                content: message,
                userId: userId,
                type: 'CHAT',
            };
            client.send(`/app/chat/${roomId}/sendMessage`, {}, JSON.stringify(chatMessage));
            setMessage('');
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={e => setUserId(e.target.value)}
                disabled={connected}
            />
            <button onClick={connect} disabled={connected}>Connect</button>
            <button onClick={disconnect} disabled={!connected}>Disconnect</button>
            <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                disabled={!connected}
            />
            <button onClick={sendMessage} disabled={!connected}>Send</button>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
        </div>
    );
};

export default ModulChat;
