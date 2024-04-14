import {Button, setTittle, StorageLoad} from "../../NovaX";
import {useEffect, useState} from "react";

const InvitePage = () => {
    setTittle("./Grafiki/Logo.png", "TTRPG | Join");
    const idParam = window.location.pathname.split('/').pop();
    const [roomData, setRoomData] = useState(null);

    const loginData = StorageLoad('loginData');

    const backToHome = () => {
        window.location.href = '/';
    }

    const uuidv4Regex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

    useEffect(() => {
        if (uuidv4Regex.test(idParam)) {
            getInvitationData();
        } else {
            //if not, redirect to main page
            backToHome();
        }
    }, [idParam]);

    // Pobieranie danych pokoju
    const getInvitationData = async () => {
        try {
            const response = await fetch(`http://localhost:8086/api/v1/room/join/${idParam}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status === 400) {
                    const error = await response.json();
                    console.log(`${error.message}`);
                } else {
                    console.log(`Error: ${response.status}`);
                }
            } else {
                const data = await response.json();
                setRoomData(data);
            }
        } catch (error) {
            console.log(`Unexpected error: ${error}`);
        }
    }

    const joinToRoom = async () => {
        try {
            const response = await fetch(`http://localhost:8086/api/v1/room/join/${idParam}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': loginData.token
                }
            });

            if (!response.ok) {
                if (response.status === 400) {
                    const error = await response.json();
                    console.log(`${error.message}`);
                } else {
                    console.log(`Error: ${response.status}`);
                }
            } else {
                window.location.href = '/Gra?id='+roomData.id;
            }
        } catch (error) {
            console.log(`Unexpected error: ${error}`);
        }
    }


    return (
        <div>
            <h1>{roomData ? roomData.name : ""}</h1>
            <Button title={"Dołącz"} onClick={joinToRoom}/>
            <Button title={"Wróć"} onClick={backToHome}/>
        </div>
    );
}

export default InvitePage;