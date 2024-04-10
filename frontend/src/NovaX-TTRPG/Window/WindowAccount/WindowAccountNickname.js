import './WindowAccount.css';
import {
    Button,
    Input,
    Window,
    iconClose,
    StorageSave
} from "../../../NovaX";
import React, {useState} from "react";

const WindowAccountNickname = ({onClose, userData}) =>
{
    // Do Przetwozenia.
    const [nickname, setNickname] = useState(userData.nickname);

    // Pobieranie z formulaża.
    const takeNickname = (event) => // Nickname.
    {
        setNickname(event.target.value);
    };

    // Edytuj dane użytkownika.
    const [powiadomienie, ustawPowiadomienie] = useState('');
    const stworzLobby = async(event) =>
    {
        event.preventDefault();

        try
        {
            const odpowiedz = await fetch('http://localhost:8086/api/v1/users/' + userData.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userData.token
                },
                body: JSON.stringify({
                    "nickname": nickname,
                })
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
                const data = await odpowiedz.json();
                StorageSave("loginData", data)
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
                            Edycja nazwy: {'"' + (userData.nickname.length > 15 ? userData.nickname.substring(0, 15) + '...' : userData.nickname) + '"'}
                        </div>
                        <div>
                            <Button src={iconClose} onClick={onClose}/>
                        </div>
                    </div>

                    <div className={"WindowCreateRoom-Main"}>
                        <Input value={nickname} type={"text"} placeholder={"Nazwa"} onChange={takeNickname} marginBottom={true} autoFocus={true} required/><br/>
                    </div>

                    <div className={"WindowCreateRoom-Bottom"}>
                        <div>
                            <div><Input type={"submit"} value={"Potwierdzam zmianę"} width={0}/></div>
                            {powiadomienie && <div>{powiadomienie}</div>}
                        </div>
                    </div>

                </form>

            </div>
        </Window>
    );
}

export default WindowAccountNickname;