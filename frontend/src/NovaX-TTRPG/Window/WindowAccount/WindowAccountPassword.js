import './WindowAccount.css';
import {
    Button,
    Input,
    Window,
    iconClose,
    storageSave
} from "../../../NovaX";
import React, {useState} from "react";
import SHA256 from "crypto-js/sha256";
import {ServerAdres} from "../../index";

const WindowAccountPassword = ({onClose, userData}) =>
{
    // Do Przetwozenia.
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPassword_2, setNewPassword_2] = useState('');

    // Pobieranie z formulaża.
    const takeOldPassword = (event) => // Stare hasło.
    {
        setOldPassword(event.target.value);
    };

    const takeNewPassword = (event) => // Nowe hasło.
    {
        setNewPassword(event.target.value);
    };

    const takeNewPassword_2 = (event) => // Nowe hasło 2.
    {
        setNewPassword_2(event.target.value);
    };

    // Edytuj dane użytkownika.
    const [powiadomienie, ustawPowiadomienie] = useState('');
    const stworzLobby = async(event) =>
    {
        event.preventDefault();

        // Sprawdzanie poprawności nowych haseł..
        if(newPassword !== newPassword_2)
        {
            ustawPowiadomienie(`Hasła nie pokrywają się`);
            return;
        }

        // Asynchroniczne haszowanie hasła
        const oldHashedPassword = await SHA256(oldPassword).toString();
        const newHashedPassword = await SHA256(newPassword).toString();

        try
        {
            const odpowiedz = await fetch(`${ServerAdres}/api/v1/users/${userData.id}/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userData.token
                },
                body: JSON.stringify({
                    password: oldHashedPassword,
                    newPassword: newHashedPassword
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
                            Zmiana hasła
                        </div>
                        <div>
                            <Button src={iconClose} onClick={onClose} marginLeftRight={false}/>
                        </div>
                    </div>

                    <div className={"WindowAccount-Main"} style={{display: 'block'}}>
                        <Input value={oldPassword} type={"password"} placeholder={"Obecne hasło"}
                               onChange={takeOldPassword} marginBottom={true} autoFocus={true} required/><br/>
                        <Input value={newPassword} type={"password"} placeholder={"Nowe hasło"}
                               onChange={takeNewPassword} marginBottom={true} autoFocus={false} required/><br/>
                        <Input value={newPassword_2} type={"password"} placeholder={"Nowe hasło"}
                               onChange={takeNewPassword_2} marginBottom={true} autoFocus={false} required/><br/>
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

export default WindowAccountPassword;