import appLogo from './Grafiki/Logo.png';
import './App.css';

function App()
{
    return (
        <div className="App">
            <header className="App_header">

                <img src={appLogo} className="App_logo" alt="logo"/>

                <p>Paragraf</p>
                {/*<br/>*/}
                <p>lol</p>

            </header>
        </div>
    );
}

export default App;
