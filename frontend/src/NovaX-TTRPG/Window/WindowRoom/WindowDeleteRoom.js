import './WindowRoom.css';
import {
    Button,
    Input,
    InputFile,
    Label,
    Window,
    Select,
    StorageLoad,
    Textarea,
    iconClose
} from "../../../NovaX";
import React, {useState} from "react";

const WindowEditRoom = ({onClose, danePokoju}) =>
{
    // Usuń lobby.
    const [powiadomienie, ustawPowiadomienie] = useState('');
    const stworzLobby = async(event) =>
    {
        event.preventDefault();
        const loginData = StorageLoad('loginData');

        try
        {
            const odpowiedz = await fetch('http://localhost:8086/api/v1/room/' + danePokoju.id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': loginData.token
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
                            Usuwanie: {'"' + (danePokoju.name.length > 10 ? danePokoju.name.substring(0, 10) + '...' : danePokoju.name) + '"'}
                        </div>
                        <div>
                            <Button src={iconClose} onClick={onClose}/>
                        </div>
                    </div>

                    <div className={"WindowCreateRoom-Bottom"}>
                        <div>
                            <div>
                                <Input type={"submit"} width={4} value={"Potwierdzam Usunięcie"}
                                       className={"BackgroundColor-4"}/>
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