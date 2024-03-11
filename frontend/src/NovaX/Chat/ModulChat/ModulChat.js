import {ChatBox, ChatInput, StorageSave, StorageLoad} from "../../index";
import React, {useEffect, useState} from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import SockJs from "sockjs-client";
import Stomp from "stompjs";

const ModulChat = ({roomId, userId}) => {
    const [wiadomosci, ustawWiadomosci] = useState([]);
    const [wyslijWiadomosc, ustawWyslijWiadomosc] = useState("");
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
        console.log("Connected to websocket")
    }

    //WYSYŁANIE WIADOMOŚCI
    useEffect(() => {

    }, []);

    const onMessageReceived = (msg) => {
        console.log("Received message: ", msg);
    }

    useEffect(() => {
        if (connected && stompClient) {
            const subscribtion = stompClient.subscribe(`/topic/rooms/${roomId}`, onMessageReceived);
            console.log("subscribed -----------")
            return () => {
                subscribtion.unsubscribe();
            }
        }
    }, [connected, stompClient]);

    // Ładowanie wiadomości przy montowaniu komponentu
    useEffect(() => {
        const zaladowaneWiadomosci = StorageLoad(roomId) || []; // Ładuje zapisane wiadomości lub pusty array, jeśli nic nie znajdzie
        ustawWiadomosci(zaladowaneWiadomosci); // Ustawia stan wiadomości na załadowane dane
    }, [roomId]); // Efekt zależny od zmian roomId, aby ponownie ładować przy zmianie pokoju

    const dodajWiadomosc = (e) => {
        if (e.key === 'Enter' && wyslijWiadomosc.trim()) {
            const nowaWiadomosc = {
                userId: userId,
                content: wyslijWiadomosc,
                timestamp: new Date().toISOString() // Zmiana na ISOString dla lepszej kompatybilności
            };
            const aktualizowaneWiadomosci = [...wiadomosci, nowaWiadomosc];
            ustawWiadomosci(aktualizowaneWiadomosci);
            StorageSave(roomId, aktualizowaneWiadomosci); // Zapis do localStorage
            ustawWyslijWiadomosc(""); // Reset pola wprowadzania
        }
    };

    const ustawWiadomoscMi = (event) => {
        ustawWyslijWiadomosc(event.target.value);
    };

    return (
        <>
            <ChatBox>
                {wiadomosci.map((msg, index) => (
                    <ChatMessage key={index} title={loginData.nickname} text={msg.content}/>
                ))}
            </ChatBox>
            <ChatInput value={wyslijWiadomosc} onChange={ustawWiadomoscMi} onKeyDown={dodajWiadomosc}/>
        </>
    );
};

export default ModulChat;
