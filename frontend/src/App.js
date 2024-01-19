import './App.css';
import {
    setTittle,
    Menu,
    Header, HeaderLeft, HeaderCenter, HeaderRight,
    InfoFrame,
    Button, ButtonLogo, Input,
    Main, MainArticle, MainPanel, MainTitle, WindowLogIn, RoomBar
} from "./NovaX";
import React, {createRoot} from "react-dom/client";


function App()
{
    setTittle("./Grafiki/Logo.png", "TTRPG");
    return (
        <>
            <Header design={3}>
                <HeaderLeft>
                    <ButtonLogo title={"TTRPG"} src={"./Grafiki/Logo.png"}/>
                </HeaderLeft>

                <HeaderCenter>
                    <Menu tag="nav">
                        <li>Pokoje</li>
                        <li>
                            Strona
                            <Menu>
                                <li>Wiadomości</li>
                                <li>O Nas</li>
                            </Menu>
                        </li>
                    </Menu>
                </HeaderCenter>

                <HeaderRight>
                    {/*<Button active={false} src={"./Ikonki/Style.png"}/>*/}
                    <Button active={false} title={"Zaloguj Się"} src={"./Ikonki/Konto.png"} onClick={WindowLogIn} width={0}/>
                </HeaderRight>
            </Header>

            <Main design={2}>
                {/* Nawigacja Main. */}
                <MainPanel>
                    <Button title={"Publiczne"} width={2} active={true}/>
                    <Button title={"Prywatne"} width={2}/>
                </MainPanel>

                {/* Artykuły Maina. */}
                <MainArticle>
                    <MainTitle title={"Pokoje Publiczne"} tag={"h2"}>
                        <div type={"option"}>
                            <Button src={"./Ikonki/Dodaj.png"} title={"Stwóż Pokój"} width={0}/>
                        </div>
                        {/*<div type={"tag"}>[Tag 1] [Tag 2]</div>*/}
                    </MainTitle>

                    <RoomBar title={"Nazwa"} description={"Opis"} src={"Obraz"} alt={"ObrazAlt"} />
                </MainArticle>
            </Main>

            <div id={"test"}/>
            {/*<WindowLogIn></WindowLogIn>*/}
        </>
    );
}

export default App;
