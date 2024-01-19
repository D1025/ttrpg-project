import React, {createRoot} from 'react-dom/client';
import {WindowModul} from "../../index";

const WindowTest = () =>
{
    // Przykładowy Moduł.
    const renderZawartosc = (zamknij) => (
        <div>
            <p>Test Modulu!</p>
            <button onClick={zamknij}>Zamknij</button>
        </div>
    );

    const container = document.getElementById("test");

    // Sprawdź, czy już istnieje root
    const root = createRoot(container);

    // Użyj root.render zamiast createRoot, jeśli root już istnieje
    root.render(<WindowModul zawartosc={renderZawartosc}/>);
}

export default WindowTest;
