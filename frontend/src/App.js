import './App.css';
import {ustawNaglowek, XMMenu, XMLi, XHeader, XHeaderLewy, XHeaderSrodek, XHeaderPrawy, XRObiekt, XPPrzycisk, XImput} from "./NovaX";
import React from "react";

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
                    {/*<XPPrzycisk active={false} tittle={"Cosiek 1"}/>*/}
                    {/*<XPPrzycisk active={false} tittle={"Cosiek 2"}/>*/}
                    {/*<XPPrzycisk active={false} tittle={"Cosiek 2"}/>*/}
                    <XMMenu>
                    <XMLi>Pokoje</XMLi>
                        <XMLi>Wiadomości
                            <XMMenu>
                                <li>2.1</li>
                                <li>2.2</li>
                            </XMMenu>
                        </XMLi>
                        <XMLi>O Nas</XMLi>
                    </XMMenu>
                </XHeaderSrodek>

                <XHeaderPrawy>
                    <XPPrzycisk active={false} src={"./Ikonki/Style.png"}/>
                    {/*<XPPrzycisk active={false} src={"./Ikonki/Konto.png"}/>*/}
                    <XPPrzycisk active={false} tittle={"Zaloguj Się"} src={"./Ikonki/Konto.png"} width={1}/>

                    {/*<XImput type={'text'}/>*/}
                    {/*<XImput type={'button'} value={"Zaloguj Się"}/>*/}
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
