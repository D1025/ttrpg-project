import {useEffect, useState} from "react";
import './App.css';
import {
    setTittle,
    Menu,
    Header, HeaderLeft, HeaderCenter, HeaderRight,
    Button, ButtonLogo, ButtonAccount,
    Main, MainArticle, MainPanel, MainTitle, ModulLogIn, RoomBar,
    StorageFind, StorageLoad, StorageRemove, PageReload
} from "./NovaX";

function App()
{
    // Tittle.
    setTittle("./Grafiki/Logo.png", "TTRPG");

    // Statusy.
    const [lobby, ustawLobby] = useState(false); // Lista pokoi publiczne albo prywatne.
    const [isLogIn, ustawIsLogIn] = useState(false); // Czy jest zalogowany.
    const [daneLogIn, ustawDaneLogIn] = useState(''); // Dane logowania.

    useEffect(() =>
    {
        const loginData = StorageLoad('loginData');
        // Jeśli dane logowania istnieją.
        if(loginData)
        {
            ustawIsLogIn(true);
            ustawDaneLogIn(loginData);
        }
        else
        {
            ustawDaneLogIn('');
            ustawIsLogIn(false);
        }
    }, []);


    // Logowanie/Rejestracja.
    const [showLogin, setShowLogin] = useState(false);
    const toggleShowLogin = () =>
    {
        setShowLogin(prevShowLogin => !prevShowLogin);
    };

    // Aplikacja.
    return (
        <>
            {/* Nagłłówek Strony. */}
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
                    {isLogIn === true ? (
                        <>
                            <ButtonAccount design={1} title={"Xeno"}></ButtonAccount>
                            <Button active={false} title={"Wyloguj Się"} onClick={() =>
                            {
                                StorageRemove('loginData');
                                PageReload();
                            }} width={1}/>
                        </>
                    ) : (
                        <Button active={false} title={"Zaloguj Się"} src={"./Ikonki/Konto.png"}
                                onClick={toggleShowLogin} width={1}/>
                    )}
                </HeaderRight>
            </Header>


            {/* Main Strony. */}
            <Main design={2}>
                {/* Nawigacja Main'a. */}
                {isLogIn === true &&
                    (
                        <MainPanel>
                            <Button title={"Publiczne"} width={2} active={!lobby} onClick={() => ustawLobby(false)}/>
                            <Button title={"Prywatne"} width={2} active={lobby} onClick={() => ustawLobby(true)}/>
                        </MainPanel>
                    )}

                {/* Artykuły Maina. */}
                <MainArticle>
                    <MainTitle title={lobby === false ? ("Pokoje Publiczne") : ("Pokoje Prywatne")} tag={"h2"}>
                        {isLogIn === true && (
                            <div type={"option"}>
                                <Button src={"./Ikonki/Dodaj.png"} title={"Stwóż Pokój"} width={1}/>
                            </div>
                        )}
                        {/*<div type={"tag"}>[Tag 1] [Tag 2]</div>*/}
                    </MainTitle>

                    {lobby === false ? (
                        <>
                            <RoomBar title={"Kocie Zabawy"}
                                     description={"Gramy w kotki ze znajomymi a smoki chcą zjeść nasze kotki :)"}
                                     src={"https://i.pinimg.com/originals/0d/72/f3/0d72f35db2305ef238e1fbc1d1151719.jpg"}/>
                            <RoomBar title={"Smoki Wojny"}
                                     description={"To ekscytująca gra fabularna, gdzie gracze wcielają się w bohaterów stawiających czoła potężnym smokom i ich hordom, aby przywrócić równowagę w świecie pogrążonym w chaosie wojennym. Walka, intrygi i niebezpieczeństwa czekają na każdym kroku, a losy świata zależą od sprytu i odwagi graczy.\"\n"}
                                     src={"https://i.pinimg.com/originals/db/9d/14/db9d149cdcef8f864bb3a9a8e7d93121.jpg"}/>
                        </>
                    ) : (
                        <>
                            <RoomBar title={"Poległe Kotki"}/>
                        </>
                    )}
                </MainArticle>


            </Main>

            <div id={"test"}/>
            {showLogin && <ModulLogIn onClose={toggleShowLogin}/>}
        </>
    );
}

export default App;
