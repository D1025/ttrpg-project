import './App.css';
import {
    setTittle,
    XMMenu,
    XMLi,
    XHeader,
    XHeaderLewy,
    XHeaderSrodek,
    XHeaderPrawy,
    XRObiekt,
    XButton,
    XButtonLogo,
    ModulTest
} from "./NovaX";
import React from "react";

function App()
{
	setTittle("./Grafiki/Logo.png", "TTRPG");
    return (
        <>
            <XHeader design={3}>
                <XHeaderLewy>
                    <XButtonLogo title={"TTRPG"} src={"./Grafiki/Logo.png"}/>
                </XHeaderLewy>

                <XHeaderSrodek>
                    {/*<XButton active={false} title={"Cosiek 1"}/>*/}
                    {/*<XButton active={false} title={"Cosiek 2"}/>*/}
                    {/*<XButton active={false} title={"Cosiek 2"}/>*/}
                    <XMMenu tag={"nav"}>
                    <XMLi>Pokoje</XMLi>
                        <XMLi>Strona
                            <XMMenu>
                                <XMLi>Wiadomości</XMLi>
                                <XMLi>O Nas</XMLi>
                            </XMMenu>
                        </XMLi>
                    </XMMenu>
                </XHeaderSrodek>

                {/*<XHeaderPrawy>*/}
                {/*    <XButton active={false} src={"./Ikonki/Konto.png"}/>*/}
                {/*    <XImput active={false} type={'button'} value={"Zaloguj Się"}/>*/}
                {/*    <XImput active={false} type={'text'} placeholder={"Wpisz"}/>*/}
                {/*</XHeaderPrawy>*/}

                <XHeaderPrawy>
                    <XButton active={false} src={"./Ikonki/Style.png"}/>
                    <XButton active={false} title={"Zaloguj Się"} src={"./Ikonki/Konto.png"} width={1} onClick={ModulTest}/>
                </XHeaderPrawy>
            </XHeader>

            <main>
                <XRObiekt>
                    <div title={"TTRPG"}
                         describe={"W krainie wyobraźni, w grze stołowej, Gdzie bohaterowie walczą,cby zwyciężyć zło. RPG nas uczy, jak tworzyć światy, Gdzie każdy może być kim chce, w tej grze bratniej."}/>
                    <div title={"TTRPG"} src={"./Grafiki/Logo.png"}
                         describe={"W krainie wyobraźni, w grze stołowej, Gdzie bohaterowie walczą,cby zwyciężyć zło. RPG nas uczy, jak tworzyć światy, Gdzie każdy może być kim chce, w tej grze bratniej."}/>
                    <div title={"TTRPG"} src={"./Grafiki/Logo.png"}/>
                </XRObiekt>

                <XRObiekt>
                    <div title={"Logo Strony"} src={"./Grafiki/Logo.png"} describe={"Platforma do gier TTRPG"}/>
                </XRObiekt>
            </main>

            {/*<ModulTest/>*/}
        </>
    );
}

export default App;
