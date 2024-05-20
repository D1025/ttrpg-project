import './WindowAccount.css';
import {
    Button,
    Input,
    Window,
    iconClose
} from "../../../NovaX";
import React, {useState} from "react";
import {ServerAdres, WebsiteAdres} from "../../index";

const WindowAccountBan = ({onClose, userData, userAuthorization, banned = false}) =>
{
    // Edytuj dane użytkownika.
    const [powiadomienie, ustawPowiadomienie] = useState('');
    const stworzLobby = async(event) =>
    {
        event.preventDefault();

        try
        {
            const odpowiedz = await fetch(`${ServerAdres}/api/v1/admin/users/${userData.id}/${banned ? 'unban' : 'ban'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userAuthorization.token
                },
                body: JSON.stringify({})
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
                            Blokowanie Użytkownika
                        </div>
                        <div>
                            <Button src={iconClose} onClick={onClose} marginLeftRight={false}/>
                        </div>
                    </div>

                    <div className={"WindowAccount-Main"}>
                        Nazwa: {userData.nickname}
                    </div>

                    <div className={"WindowAccount-Bottom"}>
                        <div>
                            <div><Input type={"submit"} value={!userData.banned  ? "Potwierdzam Zablokowanie" : "Potwierdzam Odblokowanie"} width={0} style={{backgroundColor: !userData.banned ? 'var(--Kolor-Negatywny)' : 'var(--Kolor-Informacji)'}} autoFocus={true}/></div>
                            {powiadomienie && <div>{powiadomienie}</div>}
                        </div>
                    </div>

                </form>

            </div>
        </Window>
    );
}

export default WindowAccountBan;