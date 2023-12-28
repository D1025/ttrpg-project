import './App.css';
import {ustawNaglowek, XHeader, XHeaderLewy, XHeaderSrodek, XHeaderPrawy, XPMaly, XRObiekt} from "./NovaX";

function App()
{
	ustawNaglowek("./Grafiki/Logo.png", "TTRPG");
    return (
        <div className="App">
            <XHeader styl={4}>
                <XHeaderLewy>
                    <img src={"./Grafiki/Logo.png"} className="XHeaderLogo" alt=""/>
                </XHeaderLewy>

                <XHeaderSrodek>
                    1,2,3
                </XHeaderSrodek>

                <XHeaderPrawy>
                    <XPMaly obraz={"./Grafiki/Logo.png"}/>
                    <XPMaly obraz={"./Grafiki/Logo.png"}/>
                    <XPMaly obraz={"./Grafiki/Logo.png"}/>
                    <XPMaly obraz={"./Grafiki/Logo.png"}/>
                </XHeaderPrawy>
            </XHeader>
            <main>

                <XRObiekt>
                    <div nazwa="TTRPG" obraz="" opis="W krainie wyobraźni, w grze stołowej, Gdzie bohaterowie walczą,cby zwyciężyć zło. RPG nas uczy, jak tworzyć światy, Gdzie każdy może być kim chce, w tej grze bratniej."/>
                    <div nazwa="Różowy Diament" obraz="./NewRoseGem2.webp" opis="Klejnot Stevena, który pojawia się na jego połowie klejnotu. "/>
                    <div nazwa="Klejnot" obraz={"./NewRoseGem2.webp"} opis=""/>
                </XRObiekt>

                <XRObiekt>
                    <div nazwa="TTRPG" obraz="" opis="W krainie wyobraźni, w grze stołowej, Gdzie bohaterowie walczą,cby zwyciężyć zło. RPG nas uczy, jak tworzyć światy, Gdzie każdy może być kim chce, w tej grze bratniej."/>
                    <div nazwa="TTRPG" obraz="" opis="W krainie wyobraźni, w grze stołowej, Gdzie bohaterowie walczą,cby zwyciężyć zło. RPG nas uczy, jak tworzyć światy, Gdzie każdy może być kim chce, w tej grze bratniej."/>
                    <div nazwa="TTRPG" obraz="" opis="W krainie wyobraźni, w grze stołowej, Gdzie bohaterowie walczą,cby zwyciężyć zło. RPG nas uczy, jak tworzyć światy, Gdzie każdy może być kim chce, w tej grze bratniej."/>
                </XRObiekt>

                <XRObiekt>
                    <div nazwa="Logo Strony" obraz={"./Grafiki/Logo.png"} opis="Platforma do gier TTRPG"/>
                </XRObiekt>

                {/*<XPMaly obraz={"./Ikonki/Strzałka_Prawo.png"}/>*/}

            </main>
        </div>
    );
}

export default App;
