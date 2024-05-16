import './WindowAccount.css';
import {
    Button,
    Input,
    Window,
    iconClose,
    storageSave
} from "../../../NovaX";
import React, {useState} from "react";
import {ServerAdres} from "../../index";

const WindowAccountEmail = ({onClose, userData, userAuthorization = userData}) =>
{
    // Do Przetwozenia.
    const [email, setEmail] = useState(userData.email);
    // Pobieranie z formulaża.
    const takeNickname = (event) => // Email.
    {
        setEmail(event.target.value);
    };

    // Edytuj dane użytkownika.
    const [powiadomienie, ustawPowiadomienie] = useState('');
    const stworzLobby = async(event) =>
    {
        event.preventDefault();

        try
        {
            const odpowiedz = await fetch(`${ServerAdres}/api/v1/users/${userData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userAuthorization.token
                },
                body: JSON.stringify({
                    "email": email
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
                if(userData.id === userAuthorization.id)
                {
                    const data = await odpowiedz.json();
                    storageSave("loginData", data)
                }
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
                            Zmiana email
                        </div>
                        <div>
                            <Button src={iconClose} onClick={onClose} marginLeftRight={false}/>
                        </div>
                    </div>

                    <div className={"WindowAccount-Main"}>
                        <Input value={email} type={"text"} placeholder={"Nowy email"} onChange={takeNickname} marginBottom={true} autoFocus={true} required/><br/>
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

export default WindowAccountEmail;