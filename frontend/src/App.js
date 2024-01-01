import './App.css';
import {ustawNaglowek, XHeader, XHeaderLewy, XHeaderSrodek, XHeaderPrawy, XPMaly, XRObiekt, XPSzeroki} from "./NovaX";
import React from "react";
import XNav from "./NovaX/XNav/XNav";

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
                    {/*<XPSzeroki styl={1} pion={false} aktywny={false} nazwa={"Cosiek 1"}/>*/}
                    {/*<XPSzeroki styl={2} pion={false} aktywny={false} nazwa={"Cosiek 2"}/>*/}
                    {/*<XPSzeroki styl={3} pion={false} aktywny={false} nazwa={"Cosiek 2"}/>*/}
                    <XNav>
                        <li>1</li>
                        <li>2
                            <XNav>
                                <li>2.1</li>
                                <li>2.2</li>
                            </XNav>
                        </li>
                        <li>3</li>
                    </XNav>
                </XHeaderSrodek>

                <XHeaderPrawy>
                    <XPMaly aktywny={false} obraz={"./Ikonki/Style.png"}/>
                    <XPMaly aktywny={false} obraz={"./Ikonki/Konto.png"}/>
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
            </main>
        </>
    );
}

export default App;
