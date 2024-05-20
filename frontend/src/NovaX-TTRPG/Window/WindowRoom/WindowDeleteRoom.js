import './WindowRoom.css';
import {
    Button,
    Input,
    Window,
    storageLoad,
    iconClose
} from "../../../NovaX";
import React, {useState} from "react";
import {ServerAdres, WebsiteAdres} from "../../index";

const WindowEditRoom = ({onClose, roomData}) =>
{
    // Usuń lobby.
    const [powiadomienie, ustawPowiadomienie] = useState('');
    const stworzLobby = async(event) =>
    {
        event.preventDefault();
        const userData = storageLoad('loginData');

        try
        {
            const odpowiedz = await fetch(`${ServerAdres}/api/v1/room/${roomData.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userData.token
                },
                body: JSON.stringify()
            });

            // Reagowanie na odpowiedź
            if(!odpowiedz.ok)
            {
                if(odpowiedz.status === 400)
                {
                    const blad = await odpowiedz.json();
                    // Ustawienie powiadomienia o błędzie
                    ustawPowiadomienie(`${blad.message}`);
                }
                else if(odpowiedz.status === 403) window.location.href = `${WebsiteAdres}/Zbanowany`;
                else
                {
                    ustawPowiadomienie(`Błąd: ${odpowiedz.status}`);
                }
            }
            else
            {
                // Sukces - obsługa odpowiedzi
                onClose();
            }
        }
        catch(blad)
        {
            console.log(`Nieoczekiwany błąd: ${blad}`);
            ustawPowiadomienie(`Wystąpił błąd: ${blad.message}`);
        }
    };

    return (
        <Window>
            <div className={"WindowCreateRoom"}>

                <form onSubmit={stworzLobby}>
                    <div className={"WindowCreateRoom-Top"}>
                        <div>
                            Usuwanie: {'"' + (roomData.name.length > 10 ? roomData.name.substring(0, 10) + '...' : roomData.name) + '"'}
                        </div>
                        <div>
                            <Button src={iconClose} onClick={onClose} marginLeftRight={false}/>
                        </div>
                    </div>

                    <div className={"WindowCreateRoom-Bottom"}>
                        <div>
                            <div>
                                <Input
                                    type={"submit"}
                                    width={4}
                                    value={"Potwierdzam Usunięcie"}
                                    className={"BackgroundColor-4"}
                                    autoFocus={true}
                                />
                            </div>
                            {powiadomienie && <div>{powiadomienie}</div>}
                        </div>
                    </div>

                </form>

            </div>
        </Window>
    );
}

export default WindowEditRoom;