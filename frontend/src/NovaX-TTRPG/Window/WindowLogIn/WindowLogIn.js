import React, {useState, useEffect} from 'react';
import SHA256 from 'crypto-js/sha256';
import
{
    Window,
    Input,
    Button,
    storageSave,
    storageLoad,
    storageRemove,
    InputCheckbox2,
    iconClose
} from "../../../NovaX";
import './WindowLogIn.css';
import {WebsiteLogo, ServerAdres, WebsiteAdres} from "../../index";

const OknoLogowania = ({onClose}) =>
{
    // Status okna czyLogowanie, czyRejestracja.
    const [LogowanieCzyRejestracja, ustawLogowanieCzyRejestracja] = useState(true);

    // Statusy Logowanie/Rejestracji.
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [notification, setNotification] = useState(''); // Powiadomienia.
    const [checkbox, ustawCheckbox] = useState(false); // Zapamiętaj mnie.

    // Do logowanie.
    const pobierzEmail = (event) => // Email.
    {
        setEmail(event.target.value);
    };
    const pobierzHaslo = (event) => // Haslo.
    {
        setPassword(event.target.value);
    };
    // Dodatkowe do rejestracji.
    const pobierzNazwe = (event) => // Nazwa.
    {
        setNickname(event.target.value);
    };
    const pobierzHaslo2 = (event) => // Haslo2.
    {
        setConfirmPassword(event.target.value);
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
            setEmail('');
            setPassword('');
            setNickname('');
            setConfirmPassword('');
        }
        else if(LogowanieCzyRejestracja)
        {
            const ZapisanyEmail = storageLoad('loginEmail')
            // Wstawianie hasła, jeśli zostało zapisane.
            if(ZapisanyEmail)
            {
                ustawCheckbox(ZapisanyEmail.checkboxChecked);
                setEmail(ZapisanyEmail.email);
            }
            else
            {
                setEmail('');
            }
            setPassword('');
        }

        if(notification)
        {
            setNotification('');
        }
    }, [LogowanieCzyRejestracja]);

    // Logowanie.
    const przeslijLogowanie = async(event) =>
    {
        event.preventDefault();

        try
        {
            const hasloZahashowane = await SHA256(password).toString();

            const odpowiedz = await fetch(`${ServerAdres}/api/v1/auth/login`, {
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
                    setNotification(`${blad.message}`);
                }
                else if(odpowiedz.status === 403) window.location.href = `${WebsiteAdres}/Zbanowany`;
                else
                {
                    setNotification(`Błąd: ${odpowiedz.status}`);
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
                const loginData = await odpowiedz.json();
                if(loginData.banned === true)
                {
                    setNotification("Twoje konto zostało zbanowane.")
                }
                else
                {
                    storageSave('loginData', loginData);
                    onClose();
                }
            }
        }
        catch(blad)
        {
            setNotification(`Nieoczekiwany błąd: ${blad}`);
        }
    };


    // Rejestracja.
    const przeslijRejestracje = async(event) =>
    {
        event.preventDefault();

        if(password !== confirmPassword)
        {
            setNotification(`Hasła nie pokrywają się`);
            return;
        }

        // Asynchroniczne haszowanie hasła.
        const hasloZahashowane = await SHA256(password).toString();

        try
        {
            const odpowiedz = await fetch(`${ServerAdres}/api/v1/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: hasloZahashowane,
                    nickname: nickname
                })
            });

            // Reagowanie na odpowiedź.
            if(!odpowiedz.ok)
            {
                if(odpowiedz.status === 400)
                {
                    const blad = await odpowiedz.json();
                    setNotification(`${blad.message}`);
                }
                else if(odpowiedz.status === 403) window.location.href = `${WebsiteAdres}/Zbanowany`;
                else
                {
                    setNotification(`Błąd: ${odpowiedz.status}`);
                }
            }
            else
            {
                setNotification(`Rejestracja udana`);
            }
        }
        catch(blad)
        {
            setNotification(`Nieoczekiwany błąd: ${blad}`);
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
                                    <img src={WebsiteLogo} alt={""}/>

                                    <Input type={"text"}
                                           placeholder={"Email"}
                                           value={email}
                                           onChange={pobierzEmail}
                                           required
                                           autoFocus={true}
                                    />
                                    <Input type={"password"}
                                           placeholder={"Hasło"}
                                           value={password}
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
                                    <img src={WebsiteLogo} alt={""}/>

                                    <Input type={"text"} placeholder={"Nazwa"} value={nickname} onChange={pobierzNazwe}
                                           required/>
                                    <Input type={"text"} placeholder={"Email"} value={email} onChange={pobierzEmail}
                                           required/>
                                    <Input type={"password"} placeholder={"Hasło"} value={password} onChange={pobierzHaslo}
                                           required/>
                                    <Input type={"password"} placeholder={"Powtórz Hasło"} value={confirmPassword}
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
                        {notification}
                    </div>
                </div>
            </div>
        </Window>
    );
}

export default OknoLogowania;