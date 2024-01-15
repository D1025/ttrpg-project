import './App.css';
import {
    setTittle,
    XMenu,
    XHeader,
    XHeaderLewy,
    XHeaderSrodek,
    XHeaderPrawy,
    XRObiekt,
    XButton,
    XButtonLogo,
    ModulTest,
    XImput
} from "./NovaX";

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

                    <XMenu tag="nav">
                        <li>Pokoje</li>
                        <li>
                            Strona
                            <XMenu>
                                <li>Wiadomości</li>
                                <li>O Nas</li>
                            </XMenu>
                        </li>
                    </XMenu>

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
                <XRObiekt design={1}>
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

            <div id={"test"}/>
        </>
    );
}

export default App;
