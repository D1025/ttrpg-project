import './App.css';
import {ustawNaglowek, XHeader, XHeaderLewy, XHeaderSrodek, XHeaderPrawy, XRObiekt, XPPrzycisk} from "./NovaX";
import React from "react";
import XMMenu from "./NovaX/XMenu/XMMenu/XMMenu";

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
                    <XMMenu>
                    <li>1</li>
                        <li>2
                            <XMMenu>
                                <li>2.1</li>
                                <li>2.2</li>
                            </XMMenu>
                        </li>
                        <li>3</li>
                    </XMMenu>
                </XHeaderSrodek>

                <XHeaderPrawy>
                    <XPPrzycisk active={false} src={"./Ikonki/Konto.png"}/>
                    <XPPrzycisk active={false} tittle={"Sam"} width={1}/>
                    <XPPrzycisk active={false} tittle={"Nie Sam"} src={"./Ikonki/Konto.png"}/>
                </XHeaderPrawy>
            </XHeader>

            <main>
                <XRObiekt>
                    <div tittle={"TTRPG"} describe={"W krainie wyobraźni, w grze stołowej, Gdzie bohaterowie walczą,cby zwyciężyć zło. RPG nas uczy, jak tworzyć światy, Gdzie każdy może być kim chce, w tej grze bratniej."}/>
                    <div tittle={"TTRPG"} src={"./Grafiki/Logo.png"} describe={"W krainie wyobraźni, w grze stołowej, Gdzie bohaterowie walczą,cby zwyciężyć zło. RPG nas uczy, jak tworzyć światy, Gdzie każdy może być kim chce, w tej grze bratniej."}/>
                    <div tittle={"TTRPG"} src={"./Grafiki/Logo.png"}/>
                </XRObiekt>

                <XRObiekt>
                    <div tittle={"Logo Strony"} src={"./Grafiki/Logo.png"} describe={"Platforma do gier TTRPG"}/>
                </XRObiekt>
            </main>
        </>
    );
}

export default App;
