import React from 'react';
import XModul from '../XModul/XModul';

function ModulTest()
{
    // Przykłdowy Moduł.
    const renderZawartosc = (zamknij) => (
        <div>
            <p>To jest zawartość modulu!</p>
            <button onClick={zamknij}>Zamknij</button>
        </div>
    );

    return (
        <XModul zawartosc={renderZawartosc}/>
    );
}

export default ModulTest;
