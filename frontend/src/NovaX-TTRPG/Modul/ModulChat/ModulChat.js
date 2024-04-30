import React, {useEffect, useState} from "react";
import SockJs from "sockjs-client";
import Stomp from "stompjs";
import {Chat, storageLoad, ChatMessage} from "../../../NovaX";
import {imgBase64, ModulUserList} from "../../index";
import './ModulChat.css';
import dayjs from "dayjs";

const ModulChat = ({roomId, userId}) =>
{
    const [wiadomosci, ustawWiadomosci] = useState([]);
    const [wyslijWiadomosc, ustawWyslijWiadomosc] = useState("");
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [userLeft, setUserLeft] = useState("");
    const [userJoined, setUserJoined] = useState("");
    const [initialActiveUsers, setInitialActiveUsers] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);
    const [usersInRoom, setUsersInRoom] = useState([]);
    const [loadInitialMessages, setLoadInitialMessages] = useState(true);
    const loginData = storageLoad('loginData');

    const [stompClient, setStompClient] = useState(undefined);
    const [connected, setConnected] = useState(false);

    const connect = () =>
    {
        const socket = new SockJs('http://localhost:8086/ws');
        const temp = Stomp.over(socket);
        setStompClient(temp);

        const headers = {
            'Authorization': 'Bearer ' + loginData.token
        }

        temp.connect(headers, onConnected, onError);
    }

    const onConnected = () =>
    {
        setConnected(true);
    }

    useEffect(() =>
    {
        connect()
    }, []);

    //SUBSKRYBCJA
    useEffect(() =>
    {
        if(connected && stompClient)
        {
            const subscribtion = stompClient.subscribe(`/topic/rooms/${roomId}`, onMessageReceived);
            stompClient.send(`/app/chat/${roomId}/addUser`, {}, JSON.stringify({id: userId}));
            return () =>
            {
                subscribtion.unsubscribe();
            }
        }
    }, [connected, stompClient]);


    const onError = (error) =>
    {
        setConnected(false);
        if(stompClient)
        {
            stompClient.disconnect();
        }
        setStompClient(undefined);
        setTimeout(() =>
        {
            connect();
        }, 5000);
    }

    //Ładowanie wiadomości z serwera
    useEffect(() =>
    {
        if(loadInitialMessages && receivedMessages !== undefined && receivedMessages.length > 0)
        {
            ustawWiadomosci(receivedMessages);
            setLoadInitialMessages(false);
        }
        else if(receivedMessages.length === 1)
        {
            ustawWiadomosci([...wiadomosci, ...receivedMessages]);
        }
    }, [receivedMessages]);

    //Ktoś wyszedł z pokoju
    useEffect(() =>
    {
        if(userLeft !== "")
        {
            let temp = activeUsers.filter(user => user !== userLeft);
            setActiveUsers(temp);
            console.log("USER LEFT:", getUserNameById(userLeft));
        }
    }, [userLeft]);

    //Ktoś wszedł do pokoju
    useEffect(() =>
    {
        if(userJoined !== "")
        {
            console.log("USER JOINED:", getUserNameById(userJoined));
        }
    }, [userJoined]);

    //Inicjalizowanie użytkowników w pokoju
    useEffect(() =>
    {
        if(initialActiveUsers.length > 0)
        {
            setActiveUsers(initialActiveUsers);
        }
    }, [initialActiveUsers]);

    useEffect(() =>
    {
        console.log("ACTIVE USERS:", activeUsers);
    }, [activeUsers]);


    //WYSYŁANIE WIADOMOŚCI
    const sendMessage = (msg) =>
    {
        if(stompClient)
            stompClient.send(`/app/chat/${roomId}/sendMessage`, {}, JSON.stringify({
                content: msg,
                userId: userId,
                type: "CHAT"
            }));
    }

    let onMessageReceived = (msg) =>
    {
        const message = JSON.parse(msg.body);
        if(message.type === "CHAT")
        {
            const nowaWiadomosc = {
                userId: message.userId,
                content: message.content,
                timestamp: new Date().toISOString()
            };
            setReceivedMessages([nowaWiadomosc]);

        }
        if(message.type === "JOIN")
        {
            setUserJoined(message.userId);
            setInitialActiveUsers(message.activeUsers)
            const users = message.users;
            setUsersInRoom(users);
            const messages = message.messages;
            if(messages === null)
            {
                return;
            }
            let noweWiadomosci = messages.map(msg =>
            {
                return {
                    userId: msg.userId,
                    content: msg.content,
                    timestamp: msg.time
                }
            });
            noweWiadomosci.sort((a, b) =>
            {
                return new Date(a.timestamp) - new Date(b.timestamp);
            });
            setReceivedMessages(noweWiadomosci);
        }
        if(message.type === "LEAVE")
        {
            setUserLeft(message.userId);
        }
    }
    const dodajWiadomoscEnter = (e) =>
    {
        if(e.key === 'Enter' && wyslijWiadomosc.trim())
        {
            sendMessage(wyslijWiadomosc);
            ustawWyslijWiadomosc("");
        }
    };
    const dodajWiadomoscPrzycisk = () =>
    {
        if(wyslijWiadomosc.trim())
        {
            sendMessage(wyslijWiadomosc);
            ustawWyslijWiadomosc("");
        }
    };

    const ustawWiadomoscMi = (event) =>
    {
        ustawWyslijWiadomosc(event.target.value);
    };

    //funckja zwracająca nazwę użytkownika na podstawie id
    const getUserNameById = (id) =>
    {
        const user = usersInRoom.find(user => user.id === id);
        return user ? user.nickname : "Unknown";
    }
    return (
        <div className={"ObszarGry"}>
            <div className={"ListaGraczy"}>
                <div>
                    <ModulUserList allUsers={usersInRoom} activeUsers={activeUsers}/>
                </div>
            </div>

            <Chat
                value={wyslijWiadomosc}
                onChange={ustawWiadomoscMi}
                onKeyDown={dodajWiadomoscEnter}
                onClick={dodajWiadomoscPrzycisk}
                inputPlaceholder={"Wyślij wiadomość"}
            >
                {wiadomosci.map((msg, index) => (
                    <ChatMessage
                        key={index}
                        title={getUserNameById(msg.userId)}
                        text={msg.content}
                        src={imgBase64(usersInRoom.find(user => user.id === msg.userId).avatarE, usersInRoom.find(user => user.id === msg.userId).avatar)}
                        timestamp={dayjs(msg.timestamp).format("HH:mm")}
                        design={msg.userId === loginData.id ? 2 : 1}
                    />
                ))}
            </Chat>
        </div>
    );
};

export default ModulChat;
