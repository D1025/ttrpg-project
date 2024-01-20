import React from 'react';
import XModul from '../XModul/XModul';

const ModulTest = ({isOpen}) => {

    // Przykłdowy Moduł.
    const renderZawartosc = (zamknij) => (
        <div>
            <p>Test Modulu!</p>
            <button onClick={zamknij}>Zamknij</button>
        </div>
    );

    return (
        !isOpen ? {} : <XModul zawartosc={renderZawartosc}/>
    );
}

export default ModulTest;
