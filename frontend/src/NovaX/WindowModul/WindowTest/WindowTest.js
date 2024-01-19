import React, {createRoot} from 'react-dom/client';
import {WindowModul, Input} from "../../index";

const WindowTest = () =>
{
    // Przykładowy Moduł.
    const renderZawartosc = (zamknij) => (
        <div>
            <Input type={"text"} placeholder={"dsad"}/><br/>
            <Input type={"password"}/><br/>

            <Input type={"submit"} value={"Zaloguj Się"}/>
            <Input type={"submit"} value={"Zamknij"} onClick={zamknij}/>
        </div>
    );

    // Sprawdź, czy już istnieje root
    const root = createRoot(document.getElementById("test"));

    // Użyj root.render zamiast createRoot, jeśli root już istnieje
    root.render(<WindowModul zawartosc={renderZawartosc}/>);
}

export default WindowTest;
