import React, {useState, useEffect} from 'react';
import bcrypt from 'bcryptjs';
import {Input, Label, Button} from "../../index";
import './WindowLogIn.css';

const OknoLogowania = ({onClose}) =>
{
    const [czyLogRejestr, ustawCzyLogRejestr] = useState(true);

    // Logowanie.
    const [email, ustawEmail] = useState('');
    const [haslo, ustawHaslo] = useState('');
    const pobierzEmail = (event) => // Email.
    {
        ustawEmail(event.target.value);
    };
    const pobierzHaslo = (event) => // Haslo.
    {
        ustawHaslo(event.target.value);
    };

    // Rejestracja.
    const [nazwaRejestracja, ustawNazweRejestracja] = useState('');
    const [emailRejestracja, ustawEmailRejestracja] = useState('');
    const [hasloRejestracja, ustawHasloRejestracja] = useState('');
    const pobierzNazweRejestracja = (event) => // Nazwa.
    {
        ustawNazweRejestracja(event.target.value);
    };
    const pobierzEmailRejestracja = (event) => // Email.
    {
        ustawEmailRejestracja(event.target.value);
    };
    const pobierzHasloRejestracja = (event) => // Haslo.
    {
        ustawHasloRejestracja(event.target.value);
    };

    // Wspólne.
    const [zaznaczCheckbox, ustawCheckbox] = useState(false);
    const [statusLogowania, ustawStatusLogowania] = useState(false);
    const [blad, ustawBlad] = useState('');

    // Usuwanie powiadomienia błędu jak zmienimy pole Logowanie/Rejestracja.
    useEffect(() => {
        if (blad) {
            ustawBlad('');
        }
    }, [czyLogRejestr]);

    const pobierzCheckbox = (event) =>
    {
        ustawCheckbox(event.target.checked);
    };

    // Przesyłanie Logowania.
    const przeslijLogowanie = async(event) =>
    {
        event.preventDefault();

        try
        {
            const odpowiedz = await fetch('http://localhost:8086/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: bcrypt(haslo, 50),
                    rememberMe: zaznaczCheckbox
                })
            });

            if(!odpowiedz.ok)
            {
                throw new Error(`Błąd sieciowy: status ${odpowiedz.status}`);
            }

            const dane = await odpowiedz.json();
            // Dane Zwrotne.
            console.log(dane);
            ustawStatusLogowania(true); // Stan logowania na true.
        }
        catch(blad)
        {
            ustawBlad(`Błąd logowania: ${blad.message}`);
            ustawStatusLogowania(false); // Stan logowania na false.
        }
    };

    // Przesyłanie Rejestracji.
    const przeslijRejestracje = async(event) =>
    {
        event.preventDefault();
        // TODO: Implementacja rejestracji.
    };

    return (
        <div className={"WindowModul"}>
            <div>
                <div className={"WindowChoice"}>
                    <Button title={"Logowanie"} active={czyLogRejestr} onClick={() => ustawCzyLogRejestr(true)}/>
                    <Button title={"Rejestracja"} active={!czyLogRejestr} onClick={() => ustawCzyLogRejestr(false)}/>
                </div>

                <div className={"WindowLogIn"}>
                    <div className={"WindowLogIn-Top"}>
                        <Button src={"./Ikonki/Wyłącz.png"} onClick={onClose}/>
                    </div>

                    <div className={"WindowLogIn-Main"}>
                        {czyLogRejestr ? (
                            // Logowanie.
                            <form onSubmit={przeslijLogowanie}>
                                <div>
                                    <img src={"./Grafiki/Logo.png"} alt={""}/>

                                    <Input type={"text"} name={"email"} placeholder={"Email"} onChange={pobierzEmail}
                                           required/>
                                    <Input type={"password"} name={"password"} placeholder={"Hasło"}
                                           onChange={pobierzHaslo} required/>

                                    <div className={"WindowLogIn-Checkbox"}>
                                        <Input id={"rememberMe"} type={"checkbox"} onChange={pobierzCheckbox} required/>
                                        <Label htmlFor={"rememberMe"}>Zapamiętaj mnie</Label>
                                    </div>

                                    <Input type={"submit"} value={"Zaloguj się"}/>
                                </div>
                            </form>
                        ) : (
                            // Rejestracja.
                            <form onSubmit={przeslijRejestracje}>
                                <div>
                                    <img src={"./Grafiki/Logo.png"} alt={""}/>

                                    <Input type={"text"} name={"name"} placeholder={"Nazwa"}
                                           onChange={pobierzNazweRejestracja} required/>
                                    <Input type={"text"} name={"email"} placeholder={"Email"}
                                           onChange={pobierzEmailRejestracja} required/>
                                    <Input type={"password"} name={"password"} placeholder={"Hasło"}
                                           onChange={pobierzHasloRejestracja} required/>

                                    <div className={"WindowLogIn-Checkbox"}>
                                        <Input id={"regulamin"} type={"checkbox"} onChange={pobierzCheckbox} required/>
                                        <Label htmlFor={"regulamin"}>Regulamin</Label>
                                    </div>

                                    <Input type={"submit"} value={"Zarejestruj się"}/>
                                </div>
                            </form>
                        )}
                    </div>

                    <div className={"WindowLogIn-Bottom"}>
                        {blad}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OknoLogowania;