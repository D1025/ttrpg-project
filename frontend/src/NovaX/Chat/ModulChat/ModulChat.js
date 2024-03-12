import React, { useEffect, useState } from "react";
import SockJs from "sockjs-client";
import Stomp from "stompjs";
import { ChatBox, ChatInput, StorageLoad } from "../../index";
import ChatMessage from "../ChatMessage/ChatMessage";

const ModulChat = ({roomId, userId}) => {
    const [wiadomosci, ustawWiadomosci] = useState([]);
    const [wyslijWiadomosc, ustawWyslijWiadomosc] = useState("");
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [usersInRoom, setUsersInRoom] = useState([]);
    const loginData = StorageLoad('loginData');

    const [stompClient, setStompClient] = useState(undefined);
    const [connected, setConnected] = useState(false);

    const connect = () => {
        const socket = new SockJs('http://localhost:8086/ws');
        const temp = Stomp.over(socket);
        setStompClient(temp);

        const headers = {
            'Authorization': 'Bearer ' + loginData.token
        }

        temp.connect(headers, onConnected, onError);
    }

    useEffect(() => {
        connect()
    }, []);

    const onError = (error) => {
        console.log("Error", error)
    }

    const onConnected = () => {
        setConnected(true);
    }
    useEffect(() => {
        ustawWiadomosci([...wiadomosci, ...receivedMessages]);
    }, [receivedMessages]);

    //WYSYŁANIE WIADOMOŚCI
    const sendMessage = (msg) => {
        stompClient.send(`/app/chat/${roomId}/sendMessage`, {}, JSON.stringify({content: msg, userId: userId, type: "CHAT"}));
    }

    let onMessageReceived = (msg, wiadomosci) => {
        const message = JSON.parse(msg.body);
        if (message.type === "CHAT") {
            const nowaWiadomosc = {
                userId: message.userId,
                content: message.content,
                timestamp: new Date().toISOString() // Zmiana na ISOString dla lepszej kompatybilności
            };
        setReceivedMessages([nowaWiadomosc]);

        }
        if (message.type === "JOIN") {
            //get users in room
            const users = message.users;
            console.log(users);
            // setUsersInRoom(users);
            const messages = message.messages;
            // there is not messages
            if (messages === null) {
                return;
            }
            let noweWiadomosci = messages.map(msg => {
                return {
                    userId: msg.userId,
                    content: msg.content,
                    timestamp: msg.timestamp
                }
            });
            //sort messages by timestamp backwards
            noweWiadomosci.sort((a, b) => {
                return new Date(b.timestamp) - new Date(a.timestamp);
            });
            //set them backwords
            noweWiadomosci = noweWiadomosci.reverse();
            setReceivedMessages(noweWiadomosci);
        }
    }

    useEffect(() => {
        if (connected && stompClient) {
            const subscribtion = stompClient.subscribe(`/topic/rooms/${roomId}`, msg => onMessageReceived(msg, wiadomosci));
            console.log("subscribed -----------")
            stompClient.send(`/app/chat/${roomId}/addUser`, {}, JSON.stringify({id: userId}));
            return () => {
                subscribtion.unsubscribe();
            }
        }
    }, [connected, stompClient]);

    // // Ładowanie wiadomości przy montowaniu komponentu
    // useEffect(() => {
    //     const zaladowaneWiadomosci = StorageLoad(roomId) || []; // Ładuje zapisane wiadomości lub pusty array, jeśli nic nie znajdzie
    //     ustawWiadomosci(zaladowaneWiadomosci); // Ustawia stan wiadomości na załadowane dane
    // }, [roomId]); // Efekt zależny od zmian roomId, aby ponownie ładować przy zmianie pokoju

    const dodajWiadomosc = (e) => {
        if (e.key === 'Enter' && wyslijWiadomosc.trim()) {
            const nowaWiadomosc = {
                userId: userId,
                content: wyslijWiadomosc,
                timestamp: new Date().toISOString() // Zmiana na ISOString dla lepszej kompatybilności
            };
            sendMessage(wyslijWiadomosc);
            // const aktualizowaneWiadomosci = [...wiadomosci, nowaWiadomosc];
            // ustawWiadomosci(aktualizowaneWiadomosci);
            // StorageSave(roomId, aktualizowaneWiadomosci); // Zapis do localStorage
            ustawWyslijWiadomosc(""); // Reset pola wprowadzania
        }
    };

    const ustawWiadomoscMi = (event) => {
        ustawWyslijWiadomosc(event.target.value);
    };

    const getUserNameById = (id) => {
        // console.log(usersInRoom, id)
        const user = usersInRoom.find(user => user.id === id);
        return user ? user.nickname : "Unknown";
    }
    return (
        <>
            <ChatBox>
                {wiadomosci.map((msg, index) => (
                    <ChatMessage key={index} title={getUserNameById(msg.userId)} text={msg.content}/>
                ))}
            </ChatBox>
            <ChatInput value={wyslijWiadomosc} onChange={ustawWiadomoscMi} onKeyDown={dodajWiadomosc}/>
        </>
    );
};

export default ModulChat;
