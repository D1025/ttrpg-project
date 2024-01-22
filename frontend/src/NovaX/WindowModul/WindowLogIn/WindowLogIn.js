import React, {useState, useEffect} from 'react';
import bcrypt from 'bcryptjs';
import {Input, Label, Button} from "../../index";
import './WindowLogIn.css';

const OknoLogowania = ({onClose}) =>
{
    const [LogowanieCzyRejestracja, ustawLogowanieCzyRejestracja] = useState(true);

    // Statusy.
    const [nazwa, ustawNazwe] = useState('');
    const [email, ustawEmail] = useState('');
    const [haslo, ustawHaslo] = useState('');
    const [haslo2, ustawHaslo2] = useState('');

    // Logowanie.
    const pobierzEmail = (event) => // Email.
    {
        ustawEmail(event.target.value);
    };
    const pobierzHaslo = (event) => // Haslo.
    {
        ustawHaslo(event.target.value);
    };

    // Rejestracja.
    const pobierzNazwe = (event) => // Nazwa.
    {
        ustawNazwe(event.target.value);
    };
    const pobierzHaslo2 = (event) => // Haslo2.
    {
        ustawHaslo2(event.target.value);
    };

    const [statusLogowania, ustawStatusLogowania] = useState(false);
    const [blad, ustawBlad] = useState('');

    // Usuwanie wartości input [Logowanie/Rejestracja].
    useEffect(() =>
    {
        if(!LogowanieCzyRejestracja)
        {
            ustawEmail('');
            ustawHaslo('');
        }
        else
        {
            ustawEmail('');
            ustawHaslo('');
            ustawNazwe('');
            ustawHaslo2('');
        }

        if(blad)
        {
            ustawBlad('');
        }
    }, [LogowanieCzyRejestracja]);

    // Przesyłanie Logowania.
    const przeslijLogowanie = async(event) =>
    {
        event.preventDefault();

        try
        {
            const hasloZahashowane = await bcrypt.hash(haslo, 10);

            const odpowiedz = await fetch('http://localhost:8086/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: hasloZahashowane,
                    rememberMe: true
                })
            });

            if(!odpowiedz.ok)
            {
                // Pobieranie szczegółowego opisu błędu, jeśli jest dostępny
                const errorText = await odpowiedz.text();
                throw new Error(errorText || `Błąd serwera: status ${odpowiedz.status}`);
            }

            const dane = await odpowiedz.json();
            console.log("Dane zwrotne:", dane);
            ustawStatusLogowania(true); // Stan logowania na true
        }
        catch(blad)
        {
            console.error('Błąd podczas logowania:', blad);
            ustawBlad(`Błąd logowania: ${blad.message}`);
            ustawStatusLogowania(false); // Stan logowania na false
        }
    };


    // Przesyłanie Rejestracji.
    const przeslijRejestracje = async(event) =>
    {
        event.preventDefault();

        if(haslo !== haslo2)
        {
            ustawBlad(`Hasła nie pokrywają się`);
            return;
        }

        try
        {
            // Asynchroniczne haszowanie hasła
            const hasloZahashowane = await bcrypt.hash(haslo, 10);

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

            if(!odpowiedz.ok)
            {
                throw new Error(`Błąd sieciowy: status ${odpowiedz.status}`);
            }

            const dane = await odpowiedz.json();
            console.log(dane);
            // Tutaj możesz zaimplementować odpowiednią logikę po pomyślnej rejestracji
            ustawStatusLogowania(true);
        }
        catch
            (blad)
        {
            ustawBlad(`Błąd rejestracji: ${blad.message}`);
            ustawStatusLogowania(false);
        }
    };

    return (
        <div className={"WindowModul"}>
            <div>
                <div className={"WindowChoice"}>
                    <Button title={"Logowanie"} active={LogowanieCzyRejestracja}
                            onClick={() => ustawLogowanieCzyRejestracja(true)}/>
                    <Button title={"Rejestracja"} active={!LogowanieCzyRejestracja}
                            onClick={() => ustawLogowanieCzyRejestracja(false)}/>
                </div>

                <div className={"WindowLogIn"}>
                    <div className={"WindowLogIn-Top"}>
                        <Button src={"./Ikonki/Wyłącz.png"} onClick={onClose}/>
                    </div>

                    <div className={"WindowLogIn-Main"}>
                        {LogowanieCzyRejestracja ? (
                            // Logowanie.
                            <form onSubmit={przeslijLogowanie}>
                                <div>
                                    <img src={"./Grafiki/Logo.png"} alt={""}/>

                                    <Input type={"text"} placeholder={"Email"} value={email} onChange={pobierzEmail}
                                           required/>
                                    <Input type={"password"} placeholder={"Hasło"} value={haslo} onChange={pobierzHaslo}
                                           required/>

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

                                    <div className={"WindowLogIn-Checkbox"}>
                                        <Input id={"regulamin"} type={"checkbox"} required/>
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