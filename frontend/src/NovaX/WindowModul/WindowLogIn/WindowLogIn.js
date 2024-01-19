import React, {createRoot} from 'react-dom/client';
import {WindowModul, Input, Button} from "../../index";
import './WindowLogIn.css';

const WindowLogIn = () =>
{
    // Przykładowy Moduł.
    const renderZawartosc = (zamknij) => (
        <div className={"WindowLogIn"}>
            <div className={"WindowLogIn-Top"}>
                <Button src={"./Ikonki/Wyłącz.png"} onClick={zamknij}/>
            </div>

            <div className={"WindowLogIn-Main"}>
                <form method={"post"} onSubmit={(event) => {event.preventDefault()}}>
                    <img src={"./Grafiki/Logo.png"} alt={""}/>
                    <Input type={"text"} placeholder={"Email"}/><br/>
                    <Input type={"password"} placeholder={"Hasło"}/><br/>
                    <Input type={"submit"} value={"Zaloguj Się"}/>
                </form>
            </div>

            <div className={"WindowLogIn-Bottom"}>
                Logowanie Nieudane
            </div>
        </div>
    );

    const root = createRoot(document.getElementById("test"));
    root.render(<WindowModul zawartosc={renderZawartosc}/>);
}

export default WindowLogIn;
