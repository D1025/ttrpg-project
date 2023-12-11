import React from 'react';
import appLogo from './Logo.png';
import './App.css';

function App()
{
    return (
        <div className="App">
            <header className="App_header">

                <img src={appLogo} className="App_logo" alt="logo"/>
                <p>Test</p>
                <p>Jak dodać obrazek? xD</p>

            </header>
        </div>
    );
}

export default App;
