import React, {useState} from 'react';
import bcrypt from 'bcryptjs';
import {Input, Label, Button, LogIn} from "../../index";
import './WindowLogIn.css';

const WindowLogIn = ({onClose}) =>
{
    const [email, setEmail] = useState('');
    const [haslo, setHaslo] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const pobierzEmail = (event) =>
    {
        setEmail(event.target.value);
    };

    const pobierzHaslo = (event) =>
    {
        setHaslo(event.target.value);
    };

    const pobierzRememberMe = (event) =>
    {
        setHaslo(event.target.value);
    };

    const submit = async(event) =>
    {
        event.preventDefault();
        // Haszowanie hasła.
        const hashedPassword = bcrypt.hashSync(haslo, 10);

        try
        {
            const serverURL = 'https://example.com/login';
            const method = 'POST';

            const response = await LogIn(serverURL, method, email, hashedPassword, false);
            console.log("Logowanie udane", response);
            onClose();
        }
        catch(error)
        {
            setLoginFailed(true);
            setErrorMessage(error.message || 'Błąd podczas logowania');
        }
    };

    return (
        <div className={"WindowModul"}>
            <div>
                <div className={"WindowChoice"}>
                    <Button title={"Logowanie"} active={true}/>
                    <Button title={"Rejestracja"}/>
                </div>

                <div className={"WindowLogIn"}>
                    <div className={"WindowLogIn-Top"}>
                        <Button src={"./Ikonki/Wyłącz.png"} onClick={onClose}/>
                    </div>

                    <div className={"WindowLogIn-Main"}>
                        <form onSubmit={submit}>
                            <img src={"./Grafiki/Logo.png"} alt={""}/>
                            <Input type={"text"} name={"email"} placeholder={"Email"} value={email}
                                   onChange={pobierzEmail}/><br/>
                            <Input type={"password"} name={"password"} placeholder={"Hasło"} value={haslo}
                                   onChange={pobierzHaslo}/><br/>
                            <div className={"WindowLogIn-Checkbox"}>
                                <Input id={"rememberMe"} type={"checkbox"}/>
                                <Label htmlFor={"rememberMe"}>Zapamiętaj mnie</Label>
                            </div>
                            <Input type={"submit"} value={"Zaloguj Się"}/>
                        </form>
                    </div>

                    {loginFailed && (
                        <div className={"WindowLogIn-Bottom"}>
                            {errorMessage}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WindowLogIn;
