import {useState} from "react";
import './App.css';
import {
    setTittle,
    Menu,
    Header, HeaderLeft, HeaderCenter, HeaderRight,
    Button, ButtonLogo,
    Main, MainArticle, MainPanel, MainTitle, WindowLogIn, RoomBar
} from "./NovaX";

function App()
{
    // Tittle.
    setTittle("./Grafiki/Logo.png", "TTRPG");

    // Statusy.
    const [lobby, ustawLobby] = useState(false);

    // Logowanie.
    const [showLogin, setShowLogin] = useState(false);
    const toggleShowLogin = () =>
    {
        console.log('Toggle login view');
        setShowLogin(prevShowLogin => !prevShowLogin);
    };

    // Aplikacja.
    return (
        <>
            <Header design={2} src={"./Grafiki/TłoDodatkowe/TOPanime.jpg"}>
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
                    <Button active={false} title={"Zaloguj Się"} src={"./Ikonki/Konto.png"} onClick={toggleShowLogin}
                            width={1}/>
                </HeaderRight>
            </Header>

            <Main design={2}>
                {/* Nawigacja Main. */}
                <MainPanel>
                    <Button title={"Publiczne"} width={2} active={!lobby} onClick={() => ustawLobby(false)}/>
                    <Button title={"Prywatne"} width={2} active={lobby} onClick={() => ustawLobby(true)}/>
                </MainPanel>

                {/* Artykuły Maina. */}
                {lobby === false ? (
                    <MainArticle>
                        <MainTitle title={"Pokoje Publiczne"} tag={"h2"}>
                            <div type={"option"}>
                                <Button src={"./Ikonki/Dodaj.png"} title={"Stwóż Pokój"} width={0}/>
                            </div>
                            {/*<div type={"tag"}>[Tag 1] [Tag 2]</div>*/}
                        </MainTitle>

                        <RoomBar title={"Kocie Zabawy"}
                                 description={"Gramy w kotki ze znajomymi a smoki chcą zjeść nasze kotki :)"}
                                 src={"https://i.pinimg.com/originals/0d/72/f3/0d72f35db2305ef238e1fbc1d1151719.jpg"}/>
                        <RoomBar title={"Poległe Kotki"}/>
                        <RoomBar title={"Smoki Wojny"}
                                 description={"To ekscytująca gra fabularna, gdzie gracze wcielają się w bohaterów stawiających czoła potężnym smokom i ich hordom, aby przywrócić równowagę w świecie pogrążonym w chaosie wojennym. Walka, intrygi i niebezpieczeństwa czekają na każdym kroku, a losy świata zależą od sprytu i odwagi graczy.\"\n"}
                                 src={"https://i.pinimg.com/originals/db/9d/14/db9d149cdcef8f864bb3a9a8e7d93121.jpg"}/>
                    </MainArticle>
                ) : (
                    <MainArticle>
                        <MainTitle title={"Pokoje Prywatne"} tag={"h2"}>
                            <div type={"option"}>
                                <Button src={"./Ikonki/Dodaj.png"} title={"Stwóż Pokój"} width={0}/>
                            </div>
                            {/*<div type={"tag"}>[Tag 1] [Tag 2]</div>*/}
                        </MainTitle>
                        Pokoje Prywatne
                    </MainArticle>
                )}
            </Main>

            <div id={"test"}/>
            {showLogin && <WindowLogIn onClose={toggleShowLogin}/>}
        </>
    );
}

export default App;
