import appLogo from './Grafiki/Logo.png';
import './App.css';
import './funkcje.js';
import ustawTittle from "./funkcje";

function App()
{
	ustawTittle("Naglowek");
    return (
        <div className="App">
            <header className="App_header">

                <div className="Flex">
                    <img src={appLogo} className="App_logo" alt="Nie załadowano obrazka."/>
                    <p>Nazwa Strony</p>
                </div>

            </header>
        </div>
    );
}

export default App;
