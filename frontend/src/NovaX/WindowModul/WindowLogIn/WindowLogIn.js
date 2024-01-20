import React, {useState} from 'react';
import bcrypt from 'bcryptjs';
import {Input, Label, Button} from "../../index";
import './WindowLogIn.css';

const WindowLogIn = ({onClose}) =>
{
    const [isLoginView, setIsLoginView] = useState(true); // Logowanie/Rejestracja
    // Logowanie.
    const [email, setEmail] = useState('');
    const [haslo, setHaslo] = useState('');

    // Rejestracja.
    const [nazwa1, setNazwe1] = useState('');
    const [email1, setEmail1] = useState('');
    const [haslo1, setHaslo1] = useState('');

    // Wspólne.
    const [checkbox, setcheckbox] = useState(false);
    const [logowanieStatus, setLogowanieStatus] = useState(false);
    const [bladWykonania, setBladWykonania] = useState('');

    // Pobieranie danych z inputów.
    const pobierzEmail = (event) =>
    {
        setEmail(event.target.value);
    };
    const pobierzHaslo = (event) =>
    {
        setHaslo(event.target.value);
    };
    const pobierzCheckbox = (event) => {
        setcheckbox(event.target.checked);
    };
    const pobierzNazwe = (event) =>
    {
        setNazwe1(event.target.value);
    };

    // Wykonywanie Logowania.
    const submitLogin = async(event) =>
    {
        event.preventDefault();
        const hashedPassword = bcrypt.hashSync(haslo, 50);
    };
    // Wykonywanie Rejestracji.
    const submitRegister = async(event) =>
    {
        event.preventDefault();
        // Implementacja rejestracji
    };

    return (
        <div className={"WindowModul"}>
            <div>
                <div className={"WindowChoice"}>
                    <Button title={"Logowanie"} active={isLoginView} onClick={() => setIsLoginView(true)}/>
                    <Button title={"Rejestracja"} active={!isLoginView} onClick={() => setIsLoginView(false)}/>
                </div>

                <div className={"WindowLogIn"}>
                    <div className={"WindowLogIn-Top"}>
                        <Button src={"./Ikonki/Wyłącz.png"} onClick={onClose}/>
                    </div>

                    <div className={"WindowLogIn-Main"}>
                        {isLoginView ? (
                            // Formularz logowania.
                            <form onSubmit={submitLogin}>
                                <div>
                                    <img src={"./Grafiki/Logo.png"} alt={""}/>

                                    <Input type={"text"} name={"email"} placeholder={"Email"} onChange={pobierzEmail} required/>
                                    <Input type={"password"} name={"password"} placeholder={"Hasło"} onChange={pobierzHaslo} required/>

                                    <div className={"WindowLogIn-Checkbox"}>
                                        <Input id={"rememberMe"} type={"checkbox"} onChange={pobierzCheckbox} required/>
                                        <Label htmlFor={"rememberMe"}>Zapamiętaj mnie</Label>
                                    </div>

                                    <Input type={"submit"} value={"Zaloguj Się"}/>
                                </div>
                            </form>
                        ) : (
                            // Formularz rejestracji
                            <form onSubmit={submitRegister}>
                                <div>
                                    <img src={"./Grafiki/Logo.png"} alt={""}/>

                                    <Input type={"text"} name={"name"} placeholder={"Nazwa"} onChange={pobierzNazwe} required/>
                                    <Input type={"text"} name={"email"} placeholder={"Email"} onChange={pobierzEmail} required/>
                                    <Input type={"password"} name={"password"} placeholder={"Hasło"} onChange={pobierzHaslo} required/>

                                    <div className={"WindowLogIn-Checkbox"}>
                                        <Input id={"regulamin"} type={"checkbox"} onChange={pobierzCheckbox} required/>
                                        <Label htmlFor={"regulamin"}>Regulamin</Label>
                                    </div>

                                    <Input type={"submit"} value={"Zarejestruj Się"}/>
                                </div>
                            </form>
                        )}
                    </div>

                    <div className={"WindowLogIn-Bottom"}>
                        {bladWykonania}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default WindowLogIn;
