import './App.css';
import {
    setTittle,
    XMenu,
    XHeader,
    XHeaderLeft,
    XHeaderCenter,
    XHeaderRight,
    XRObiekt,
    XButton,
    XButtonLogo,
    ModulTest,
    XImput,
    XMain,
    XMainMain,
    XMainPanel,
    XMainTitle
} from "./NovaX";

function App()
{
    setTittle("./Grafiki/Logo.png", "TTRPG");
    return (
        <>
            <XHeader design={3}>
                <XHeaderLeft>
                    <XButtonLogo title={"TTRPG"} src={"./Grafiki/Logo.png"}/>
                </XHeaderLeft>

                <XHeaderCenter>
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

                </XHeaderCenter>

                {/*<XHeaderRight>*/}
                {/*    <XButton active={false} src={"./Ikonki/Konto.png"}/>*/}
                {/*    <XImput active={false} type={'button'} value={"Zaloguj Się"}/>*/}
                {/*    <XImput active={false} type={'text'} placeholder={"Wpisz"}/>*/}
                {/*</XHeaderRight>*/}

                <XHeaderRight>
                    <XButton active={false} src={"./Ikonki/Style.png"}/>
                    <XButton active={false} title={"Zaloguj Się"} src={"./Ikonki/Konto.png"} onClick={ModulTest}/>
                </XHeaderRight>
            </XHeader>

            <XMain design={2}>
                <XMainMain>
                    <XMainTitle title={"Pokoje"} tag={"h2"}>
                        <div type={"option"}>
                            <XButton src={"./Ikonki/Dodaj.png"} title={"Stwóż Pokój"} width={1}/>
                        </div>
                        {/*<div type={"tag"}>[Tag 1] [Tag 2]</div>*/}
                        {/*<div type={"tag"}>2</div>*/}
                    </XMainTitle>

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
                </XMainMain>

                <XMainPanel>
                    <XButton title={"Publiczne"} width={3} active={true}/>
                    <XButton title={"Prywatne"} width={3}/>
                </XMainPanel>
            </XMain>

            <div id={"test"}/>
        </>
    );
}

export default App;
