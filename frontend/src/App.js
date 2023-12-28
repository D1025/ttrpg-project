import './App.css';
import {ustawNaglowek, XHeader, XHeaderLewy, XHeaderSrodek, XHeaderPrawy, XPMaly, XRObiekt} from "./NovaX";

function App()
{
	ustawNaglowek("./Grafiki/Logo.png", "TTRPG");
    return (
        <>
            <XHeader styl={3}>
                <XHeaderLewy>
                    <img src={"./Grafiki/Logo.png"} className="XHeaderLogo" alt=""/>
                </XHeaderLewy>

                <XHeaderSrodek>
                    1,2,3
                </XHeaderSrodek>

                <XHeaderPrawy>
                    <XPMaly obraz={"./Ikonki/Style.png"}/>
                    <XPMaly obraz={"./Ikonki/Konto.png"}/>
                </XHeaderPrawy>
            </XHeader>

            <main>
                <XRObiekt>
                    <div nazwa={"TTRPG"} opis={"W krainie wyobraźni, w grze stołowej, Gdzie bohaterowie walczą,cby zwyciężyć zło. RPG nas uczy, jak tworzyć światy, Gdzie każdy może być kim chce, w tej grze bratniej."}/>
                    <div nazwa={"TTRPG"} obraz={"./Grafiki/Logo.png"} opis={"W krainie wyobraźni, w grze stołowej, Gdzie bohaterowie walczą,cby zwyciężyć zło. RPG nas uczy, jak tworzyć światy, Gdzie każdy może być kim chce, w tej grze bratniej."}/>
                    <div nazwa={"TTRPG"} obraz={"./Grafiki/Logo.png"}/>
                </XRObiekt>

                <XRObiekt>
                    <div nazwa={"Logo Strony"} obraz={"./Grafiki/Logo.png"} opis={"Platforma do gier TTRPG"}/>
                </XRObiekt>

                {/*<XPMaly obraz={"./Ikonki/Strzałka_Prawo.png"}/>*/}
            </main>
        </>
    );
}

export default App;
