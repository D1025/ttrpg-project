import './WindowAccount.css';
import {
    Button,
    Input,
    Window,
    iconClose,
    storageSave
} from "../../../NovaX";
import React, {useState} from "react";
import {websiteAdres} from "../../index";

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
            const odpowiedz = await fetch(`${websiteAdres}/api/v1/users/` + userData.id, {
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
                storageSave("loginData", data)
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
            <div className={"WindowAccount"}>

                <form onSubmit={stworzLobby}>
                    <div className={"WindowAccount-Top"}>
                        <div>
                            Zmiana nazwy
                        </div>
                        <div>
                            <Button src={iconClose} onClick={onClose} marginLeftRight={false}/>
                        </div>
                    </div>

                    <div className={"WindowAccount-Main"}>
                        <Input value={nickname} type={"text"} placeholder={"Nazwa"} onChange={takeNickname} marginBottom={true} autoFocus={true} required/><br/>
                    </div>

                    <div className={"WindowAccount-Bottom"}>
                        <div>
                            <div><Input type={"submit"} value={"Potwierdzam zmianę"} width={3}/></div>
                            {powiadomienie && <div>{powiadomienie}</div>}
                        </div>
                    </div>

                </form>

            </div>
        </Window>
    );
}

export default WindowAccountNickname;