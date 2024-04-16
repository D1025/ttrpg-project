import './WindowRoom.css';
import {
    Button,
    Window,
    StorageLoad,
    iconClose, Label, Input, iconSend
} from "../../../NovaX";
import React, {useEffect, useState} from "react";

const WindowInviteSettings = ({onClose, danePokoju}) =>
{
    const [powiadomienie, ustawPowiadomienie] = useState('');
    const [invitationLink, setInvitationLink] = useState('');
    const userData = StorageLoad('loginData');

    const fetchInvitationLink = async() =>
    {
        try
        {
            const odpowiedz = await fetch(`http://localhost:8086/api/v1/room/${danePokoju.id}/invitations`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userData.token
                }
            });

            if(!odpowiedz.ok)
            {
                if(odpowiedz.status === 400)
                {
                    const blad = await odpowiedz.json();
                    ustawPowiadomienie(`${blad.message}`);
                }
                else
                {
                    ustawPowiadomienie(`Błąd: ${odpowiedz.status}`);
                }
            }
            else
            {
                const dane = await odpowiedz.json();
                console.log(dane)
                setInvitationLink(dane.link);
            }
        }
        catch(blad)
        {
            console.log(`Nieoczekiwany błąd: ${blad}`);
            ustawPowiadomienie(`Wystąpił błąd: ${blad.message}`);
        }
    };

    useEffect(() =>
    {
        fetchInvitationLink();
    }, [danePokoju.id]);

    const sendRegenerateInvitationLink = async() =>
    {
        try
        {
            const odpowiedz = await fetch(`http://localhost:8086/api/v1/room/${danePokoju.id}/invitations`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userData.token
                }
            });

            if(!odpowiedz.ok)
            {
                if(odpowiedz.status === 400)
                {
                    const blad = await odpowiedz.json();
                    ustawPowiadomienie(`${blad.message}`);
                }
                else
                {
                    ustawPowiadomienie(`Błąd: ${odpowiedz.status}`);
                }
            }
            else
            {
                const dane = await odpowiedz.json();
                setInvitationLink(dane.link);
            }
        }
        catch(blad)
        {
            console.log(`Nieoczekiwany błąd: ${blad}`);
            ustawPowiadomienie(`Wystąpił błąd: ${blad.message}`);
        }
    }

    const deleteInvitationLink = async() =>
    {
        try
        {
            const odpowiedz = await fetch(`http://localhost:8086/api/v1/room/${danePokoju.id}/invitations`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userData.token
                }
            });

            if(!odpowiedz.ok)
            {
                if(odpowiedz.status === 400)
                {
                    const blad = await odpowiedz.json();
                    ustawPowiadomienie(`${blad.message}`);
                }
                else
                {
                    ustawPowiadomienie(`Błąd: ${odpowiedz.status}`);
                }
            }
            else
            {
                setInvitationLink('');
            }
        }
        catch(blad)
        {
            console.log(`Nieoczekiwany błąd: ${blad}`);
            ustawPowiadomienie(`Wystąpił błąd: ${blad.message}`);
        }
    }

    return (
        <Window>
            <div className={"WindowCreateRoom"}>

                <div className={"WindowCreateRoom-Top"}>
                    <div>
                        Zaproszenia
                    </div>
                    <div>
                        <Button src={iconClose} onClick={onClose}/>
                    </div>
                </div>

                <div className={"WindowCreateRoom-Main"}>
                    <div>
                        <div style={{textAlign: "left", paddingBottom: 10}}>
                            <Label marginBottom={true}>Link do zaproszenia:</Label><br/>
                            <Input
                                type={"text"}
                                value={invitationLink ? "http://localhost:3000/invite/" + invitationLink : ""}
                                style={{width: '20vw'}}
                                placeholder={"Link do zaproszenia"}
                            />
                        </div>
                    </div>
                </div>

                <div className={"WindowCreateRoom-Bottom"}>
                    <Button title={"Wygeneruj"} onClick={sendRegenerateInvitationLink}/>
                    <Button title={"Usuń"} onClick={deleteInvitationLink} active={invitationLink !== ''}/>
                    <div>
                        {powiadomienie && <div>{powiadomienie}</div>}
                    </div>
                </div>
            </div>
        </Window>
    );
}

export default WindowInviteSettings;