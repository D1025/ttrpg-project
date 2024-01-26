import React, {useState, useEffect} from 'react';
import SHA256 from 'crypto-js/sha256';
import
{
    Input, Label, Button, Modul,
    StorageSave, StorageLoad, StorageFind, StorageRemove
} from "../../index";
import './ModulLogIn.css';
import localStorageRemove from "../../Funkcion/LocalStorage/StorageRemove";

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
            // Wstawianie hasła, jeśli zostało zapisane.
            if(StorageFind('loginEmail') === true)
            {
                const statusStorage = StorageLoad('loginEmail');
                ustawCheckbox(statusStorage.checkboxZaznaczony);
                ustawEmail(statusStorage.email);
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

    // Przesyłanie Logowania.
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
                        checkboxZaznaczony: checkbox,
                        email: email
                    };

                    StorageSave('loginEmail', zapamietajEmail);
                }
                else
                {
                    StorageRemove('loginEmail');
                }

                // Zapisuje dane logowania.
                const dane = await odpowiedz.json();
                StorageSave('loginData', dane);
                console.log(dane);
                onClose();
            }
        }
        catch(blad)
        {
            ustawPowiadomienie(`Nieoczekiwany błąd: ${blad}`);
        }
    };


    // Przesyłanie Rejestracji.
    const przeslijRejestracje = async(event) =>
    {
        event.preventDefault();

        if(haslo !== haslo2)
        {
            ustawPowiadomienie(`Hasła nie pokrywają się`);
            return;
        }

        // Asynchroniczne haszowanie hasła
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
        <Modul>
            <div>
                {/* Pole wyboru Rejestracja/Logowanie. */}
                <div className={"ModulLogIn-Choice"}>
                    <Button title={"Logowanie"} active={LogowanieCzyRejestracja}
                            onClick={() => ustawLogowanieCzyRejestracja(true)}/>
                    <Button title={"Rejestracja"} active={!LogowanieCzyRejestracja}
                            onClick={() => ustawLogowanieCzyRejestracja(false)}/>
                </div>

                <div className={"ModulLogIn"}>
                    <div className={"ModulLogIn-Top"}>
                        <Button src={"./Ikonki/Zamknij.png"} onClick={onClose}/>
                    </div>

                    <div className={"ModulLogIn-Main"}>
                        {LogowanieCzyRejestracja ? (
                            // Logowanie.
                            <form onSubmit={przeslijLogowanie}>
                                <div>
                                    <img src={"./Grafiki/Logo.png"} alt={""}/>

                                    <Input type={"text"} placeholder={"Email"} value={email} onChange={pobierzEmail}
                                           required/>
                                    <Input type={"password"} placeholder={"Hasło"} value={haslo} onChange={pobierzHaslo}
                                           required/>

                                    <div className={"ModulLogIn-Checkbox"}>
                                        <Input id={"regulamin"} type={"checkbox"} checked={checkbox}
                                               onChange={pobierzCheckbox}/>
                                        <Label htmlFor={"regulamin"}>Zapamiętaj email</Label>
                                    </div>

                                    <Input type={"submit"} value={"Zaloguj się"}/>
                                </div>
                            </form>
                        ) : (
                            // Rejestracja.
                            <form onSubmit={przeslijRejestracje}>
                                <div>
                                    <img src={"./Grafiki/Logo.png"} alt={""}/>

                                    <Input type={"text"} placeholder={"Nazwa"} value={nazwa} onChange={pobierzNazwe}
                                           required/>
                                    <Input type={"text"} placeholder={"Email"} value={email} onChange={pobierzEmail}
                                           required/>
                                    <Input type={"password"} placeholder={"Hasło"} value={haslo} onChange={pobierzHaslo}
                                           required/>
                                    <Input type={"password"} placeholder={"Powtórz Hasło"} value={haslo2}
                                           onChange={pobierzHaslo2}
                                           required/>

                                    <div className={"ModulLogIn-Checkbox"}>
                                        <Input id={"regulamin"} type={"checkbox"} required/>
                                        <Label htmlFor={"regulamin"}>Regulamin</Label>
                                    </div>

                                    <Input type={"submit"} value={"Zarejestruj się"}/>
                                </div>
                            </form>
                        )}
                    </div>

                    <div className={"ModulLogIn-Bottom"}>
                        {powiadomienie}
                    </div>
                </div>
            </div>
        </Modul>
    );
}

export default OknoLogowania;