import React, {createRoot} from 'react-dom/client';
import {WindowModul, Imput} from "../../index";

const WindowTest = () =>
{
    // Przykładowy Moduł.
    const renderZawartosc = (zamknij) => (
        <div>
            <Imput type={"text"} placeholder={"dsad"}/><br/>
            <Imput type={"password"}/><br/>

            <Imput type={"submit"} value={"Zaloguj Się"}/>
            <Imput type={"submit"} value={"Zamknij"} onClick={zamknij}/>
        </div>
    );

    // Sprawdź, czy już istnieje root
    const root = createRoot(document.getElementById("test"));

    // Użyj root.render zamiast createRoot, jeśli root już istnieje
    root.render(<WindowModul zawartosc={renderZawartosc}/>);
}

export default WindowTest;
