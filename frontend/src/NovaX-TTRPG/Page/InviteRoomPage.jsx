import {
    AccountBar,
    Button,
    Label,
    setTittle,
    storageLoad,
    Window,
    iconClose,
    storageRemove,
} from "../../NovaX";
import React, {useEffect, useState} from "react";
import {
    imgBase64,
    ServerAdres,
    verifyUser,
    WebsiteLogo,
    WebsiteName
} from "../index";

const InviteRoomPage = () =>
{
    setTittle(WebsiteLogo, `${WebsiteName} | Zaproszenie`);
    const idParam = window.location.pathname.split('/').pop();
    const [roomData, setRoomData] = useState(null);

    // Dane logowania.
    const userData = (storageLoad('loginData'));
    if(userData !== '') verifyUser(userData);

    const backToHome = () =>
    {
        window.location.href = '/';
    }

    const uuidv4Regex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

    useEffect(() =>
    {
        if(uuidv4Regex.test(idParam))
        {
            getInvitationData();
        }
        else
        {
            //if not, redirect to main page
            backToHome();
        }
    }, [idParam]);

    // Pobieranie danych pokoju
    const getInvitationData = async() =>
    {
        try
        {
            const response = await fetch(`${ServerAdres}/api/v1/room/join/${idParam}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(!response.ok)
            {
                if(response.status === 400)
                {
                    const error = await response.json();
                    console.log(`${error.message}`);
                }
                else
                {
                    console.log(`Error: ${response.status}`);
                }
            }
            else
            {
                const data = await response.json();
                setRoomData(data);
            }
        }
        catch(error)
        {
            console.log(`Unexpected error: ${error}`);
        }
    }

    const joinToRoom = async() =>
    {
        try
        {
            const response = await fetch(`${ServerAdres}/api/v1/room/join/${idParam}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userData.token
                }
            });

            if(!response.ok)
            {
                if(response.status === 400)
                {
                    const error = await response.json();
                    console.log(`${error.message}`);
                }
                else
                {
                    console.log(`Error: ${response.status}`);
                }
            }
            else
            {
                window.location.href = '/Gra?id=' + roomData.id;
            }
        }
        catch(error)
        {
            console.log(`Unexpected error: ${error}`);
        }
    }

    // Sprawdza logowanie i odświeża dynamiczne elementy po zmianie.
    useEffect(() =>
    {
        // Czy zalogowany.
        const loginData = storageLoad('loginData');
        if(!loginData)
        {
            window.location.href = '/';
        }
        else if(loginData.banned === true)
        {
            storageRemove('loginData');
            window.location.href = '/';
        }
    }, []);

    return (
        <Window style={{zIndex: '1 !important'}}>
            <div className={"WindowCreateRoom"}>
                <div className={"WindowCreateRoom-Top"}>
                    <div>
                        Pokuj: "{roomData && roomData.name}"
                    </div>
                    <div>
                        <Button src={iconClose} onClick={backToHome} marginLeftRight={false}/>
                    </div>
                </div>
                <div className={"WindowCreateRoom-Main"}>
                    <div style={{textAlign: "left"}}>
                        <Label style={{fontWeight: 'bold'}}>Właściciel</Label><br/>
                        <AccountBar title={roomData ? roomData.ownerNickname : ''}
                                    src={roomData && imgBase64(roomData.ownerAvatarExtension, roomData.ownerAvatar)}/>
                        <br/>

                        {/*{console.log(roomData)}*/}
                    </div>
                </div>
                <div className={"WindowCreateRoom-Bottom"}>
                    <Button title={"Dołącz"} onClick={joinToRoom}/>
                </div>
            </div>
        </Window>
    );
}

export default InviteRoomPage;