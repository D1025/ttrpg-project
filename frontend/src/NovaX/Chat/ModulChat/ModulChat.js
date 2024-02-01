import {ChatBox, ChatInput, StorageSave, StorageLoad} from "../../index";
import React, {useEffect, useState} from "react";
import ChatMessage from "../ChatMessage/ChatMessage";

const ModulChat = ({roomId, userId}) => {
    const [wiadomosci, ustawWiadomosci] = useState([]);
    const [wyslijWiadomosc, ustawWyslijWiadomosc] = useState("");
    const loginData = StorageLoad('loginData');

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
