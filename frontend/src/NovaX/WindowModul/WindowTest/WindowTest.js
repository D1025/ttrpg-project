import React, {createRoot} from 'react-dom/client';
import {WindowModul, Input} from "../../index";

const WindowTest = () =>
{
    // Przykładowy Moduł.
    const renderZawartosc = (zamknij) => (
        <div>
            <Input type={"text"} placeholder={"Email"}/><br/>
            <Input type={"password"} placeholder={"Hasło"} /><br/>

            <Input type={"submit"} value={"Zaloguj Się"}/>
            <Input type={"submit"} value={"Zamknij"} onClick={zamknij}/>
        </div>
    );

    const root = createRoot(document.getElementById("test"));
    root.render(<WindowModul zawartosc={renderZawartosc}/>);
}

export default WindowTest;
