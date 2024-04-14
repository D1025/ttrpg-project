import './WindowRoom.css';
import {
    Button,
    Window,
    StorageLoad,
    iconClose
} from "../../../NovaX";
import React, {useEffect, useState} from "react";

const WindowInviteSettings = ({onClose, danePokoju}) => {
    const [powiadomienie, ustawPowiadomienie] = useState('');
    const [invitationLink, setInvitationLink] = useState('');
    const userData = StorageLoad('loginData');

    const fetchInvitationLink = async () => {
        try {
            const odpowiedz = await fetch(`http://localhost:8086/api/v1/room/${danePokoju.id}/invitations`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userData.token
                }
            });

            if (!odpowiedz.ok) {
                if (odpowiedz.status === 400) {
                    const blad = await odpowiedz.json();
                    ustawPowiadomienie(`${blad.message}`);
                } else {
                    ustawPowiadomienie(`Błąd: ${odpowiedz.status}`);
                }
            } else {
                const dane = await odpowiedz.json();
                console.log(dane)
                setInvitationLink(dane.link);
            }
        } catch (blad) {
            console.log(`Nieoczekiwany błąd: ${blad}`);
            ustawPowiadomienie(`Wystąpił błąd: ${blad.message}`);
        }
    };

    useEffect(() => {
        fetchInvitationLink();
    }, [danePokoju.id]);

    const sendRegenerateInvitationLink = async () => {
        try {
            const odpowiedz = await fetch(`http://localhost:8086/api/v1/room/${danePokoju.id}/invitations`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userData.token
                }
            });

            if (!odpowiedz.ok) {
                if (odpowiedz.status === 400) {
                    const blad = await odpowiedz.json();
                    ustawPowiadomienie(`${blad.message}`);
                } else {
                    ustawPowiadomienie(`Błąd: ${odpowiedz.status}`);
                }
            } else {
                const dane = await odpowiedz.json();
                setInvitationLink(dane.link);
            }
        } catch (blad) {
            console.log(`Nieoczekiwany błąd: ${blad}`);
            ustawPowiadomienie(`Wystąpił błąd: ${blad.message}`);
        }
    }

    const deleteInvitationLink = async () => {
        try {
            const odpowiedz = await fetch(`http://localhost:8086/api/v1/room/${danePokoju.id}/invitations`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userData.token
                }
            });

            if (!odpowiedz.ok) {
                if (odpowiedz.status === 400) {
                    const blad = await odpowiedz.json();
                    ustawPowiadomienie(`${blad.message}`);
                } else {
                    ustawPowiadomienie(`Błąd: ${odpowiedz.status}`);
                }
            } else {
                setInvitationLink('');
            }
        } catch (blad) {
            console.log(`Nieoczekiwany błąd: ${blad}`);
            ustawPowiadomienie(`Wystąpił błąd: ${blad.message}`);
        }
    }

    return (
        <Window>
            <div className={"WindowCreateRoom"}>

                    <div className={"WindowCreateRoom-Top"}>
                        <div>
                            Ustawienia zaproszeń
                        </div>
                        <div>
                            <Button src={iconClose} onClick={onClose}/>
                        </div>
                    </div>

                    <div className={"WindowCreateRoom-Bottom"}>
                        <div>
                            <div>
                                <div style={{paddingBottom: 10}}>
                                    Link do zaproszenia: <a>{invitationLink ? "http://localhost:3000/invite/"+invitationLink : ""}</a>
                                </div>
                                <Button title={"Wygeneruj"} onClick={sendRegenerateInvitationLink}/>
                                <Button title={"Usuń"} onClick={deleteInvitationLink}/>
                            </div>
                            {powiadomienie && <div>{powiadomienie}</div>}
                        </div>
                    </div>
            </div>
        </Window>
    );
}

export default WindowInviteSettings;