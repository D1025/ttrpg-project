import React, {useState, useEffect} from 'react';
import SHA256 from 'crypto-js/sha256';
import
{
    Window,
    Input,
    Button,
    storageSave, storageLoad, storageRemove, InputCheckbox, iconEdit, iconClose, InputCheckbox2
} from "../../../NovaX";
import './WindowLogIn.css';

const OknoLogowania = ({onClose}) =>
{
    // Status okna czyLogowanie, czyRejestracja.
    const [LogowanieCzyRejestracja, ustawLogowanieCzyRejestracja] = useState(true);

    // Statusy Logowanie/Rejestracji.
    const [nazwa, ustawNazwe] = useState('');
    const [email, ustawEmail] = useState('');
    const [haslo, ustawHaslo] = useState('');
    const [haslo2, ustawHaslo2] = useState('');
    const [powiadomienie, ustawPowiadomienie] = useState(''); // Powiadomienia.
    const [checkbox, ustawCheckbox] = useState(false); // Zapamiętaj mnie.

    // Do logowanie.
    const pobierzEmail = (event) => // Email.
    {
        ustawEmail(event.target.value);
    };
    const pobierzHaslo = (event) => // Haslo.
    {
        ustawHaslo(event.target.value);
    };
    // Dodatkowe do rejestracji.
    const pobierzNazwe = (event) => // Nazwa.
    {
        ustawNazwe(event.target.value);
    };
    const pobierzHaslo2 = (event) => // Haslo2.
    {
        ustawHaslo2(event.target.value);
    };
    // Zapamiętaj email.
    const pobierzCheckbox = (event) => // Checkbox.
    {
        ustawCheckbox(event.target.checked);
    };

    // Usuwanie wartości input [Logowanie/Rejestracja].
    useEffect(() =>
    {
        if(!LogowanieCzyRejestracja)
        {
            ustawEmail('');
            ustawHaslo('');
            ustawNazwe('');
            ustawHaslo2('');
        }
        else if(LogowanieCzyRejestracja)
        {
            const ZapisanyEmail = storageLoad('loginEmail')
            // Wstawianie hasła, jeśli zostało zapisane.
            if(ZapisanyEmail)
            {
                ustawCheckbox(ZapisanyEmail.checkboxChecked);
                ustawEmail(ZapisanyEmail.email);
            }
            else
            {
                ustawEmail('');
            }
            ustawHaslo('');
        }

        if(powiadomienie)
        {
            ustawPowiadomienie('');
        }
    }, [LogowanieCzyRejestracja]);

    // Logowanie.
    const przeslijLogowanie = async(event) =>
    {
        event.preventDefault();

        try
        {
            const hasloZahashowane = await SHA256(haslo).toString();

            const odpowiedz = await fetch('http://localhost:8086/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: hasloZahashowane,
                })
            });

            // Reagowanie na odpowiedź.
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
                // Zapisuje email na przyszłość.
                if(checkbox === true)
                {
                    const zapamietajEmail = {
                        checkboxChecked: checkbox,
                        email: email
                    };

                    storageSave('loginEmail', zapamietajEmail);
                }
                else
                {
                    storageRemove('loginEmail');
                }

                // Zapisuje dane logowania.
                const dane = await odpowiedz.json();
                storageSave('loginData', dane);
                onClose();
            }
        }
        catch(blad)
        {
            ustawPowiadomienie(`Nieoczekiwany błąd: ${blad}`);
        }
    };


    // Rejestracja.
    const przeslijRejestracje = async(event) =>
    {
        event.preventDefault();

        if(haslo !== haslo2)
        {
            ustawPowiadomienie(`Hasła nie pokrywają się`);
            return;
        }

        // Asynchroniczne haszowanie hasła.
        const hasloZahashowane = await SHA256(haslo).toString();

        try
        {
            const odpowiedz = await fetch('http://localhost:8086/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: hasloZahashowane,
                    nickname: nazwa
                })
            });

            // Reagowanie na odpowiedź.
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
                ustawPowiadomienie(`Rejestracja udana`);
            }
        }
        catch(blad)
        {
            ustawPowiadomienie(`Nieoczekiwany błąd: ${blad}`);
        }
    };


    return (
        <Window>
            <div>
                {/* Pole wyboru Rejestracja/Logowanie. */}
                <div className={"WindowLogIn-Choice"}>
                    <Button title={"Logowanie"} colorNumber={LogowanieCzyRejestracja === true ? 1 : 0}
                            onClick={() => ustawLogowanieCzyRejestracja(true)}/>
                    <Button title={"Rejestracja"} colorNumber={LogowanieCzyRejestracja !== true ? 1 : 0}
                            onClick={() => ustawLogowanieCzyRejestracja(false)}/>
                </div>

                <div className={"WindowLogIn"}>
                    <div className={"WindowLogIn-Top"}>
                        <Button src={iconClose} onClick={onClose} marginLeftRight={false}/>
                    </div>

                    <div className={"WindowLogIn-Main"}>
                        {LogowanieCzyRejestracja ? (
                            // Logowanie.
                            <form onSubmit={przeslijLogowanie}>
                                <div>
                                    <img src={"/Grafiki/Logo.png"} alt={""}/>

                                    <Input type={"text"}
                                           placeholder={"Email"}
                                           value={email}
                                           onChange={pobierzEmail}
                                           required
                                           autoFocus={true}
                                    />
                                    <Input type={"password"}
                                           placeholder={"Hasło"}
                                           value={haslo}
                                           onChange={pobierzHaslo}
                                           required
                                    />

                                    <div className={"WindowLogIn-Checkbox"}>
                                        <InputCheckbox2
                                            title={"Zapamiętaj mnie"}
                                            onChange={pobierzCheckbox}
                                            value={checkbox}
                                        />
                                    </div>

                                    <Input type={"submit"} value={"Zaloguj się"}/>
                                </div>
                            </form>
                        ) : (
                            // Rejestracja.
                            <form onSubmit={przeslijRejestracje}>
                                <div>
                                    <img src={"/Grafiki/Logo.png"} alt={""}/>

                                    <Input type={"text"} placeholder={"Nazwa"} value={nazwa} onChange={pobierzNazwe}
                                           required/>
                                    <Input type={"text"} placeholder={"Email"} value={email} onChange={pobierzEmail}
                                           required/>
                                    <Input type={"password"} placeholder={"Hasło"} value={haslo} onChange={pobierzHaslo}
                                           required/>
                                    <Input type={"password"} placeholder={"Powtórz Hasło"} value={haslo2}
                                           onChange={pobierzHaslo2}
                                           required/>

                                    <div className={"WindowLogIn-Checkbox"}>
                                        <InputCheckbox2 title={"Regulamin"} required/>
                                    </div>

                                    <Input type={"submit"} value={"Zarejestruj się"}/>
                                </div>
                            </form>
                        )}
                    </div>

                    <div className={"WindowLogIn-Bottom"}>
                        {powiadomienie}
                    </div>
                </div>
            </div>
        </Window>
    );
}

export default OknoLogowania;