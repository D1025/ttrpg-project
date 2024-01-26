import {useEffect, useState} from "react";
import './App.css';
import {
    Menu, Menu2,
    Header, HeaderLeft, HeaderCenter, HeaderRight,
    Button, ButtonLogo, ButtonAccount,
    Main, MainArticle, MainPanel, MainTitle,
    ModulLogIn,
    RoomBar,
    StorageLoad, StorageRemove, PageReload, setTittle
} from "./NovaX";

function App()
{
    // Tittle.
    setTittle("./Grafiki/Logo.png", "TTRPG");

    // Statusy.
    const [lobby, ustawLobby] = useState(false); // Pokoje Publiczne/Prywatne.
    const [isLogIn, ustawIsLogIn] = useState(false); // Czy jest zalogowany.
    const [daneUzytkownika, ustawDaneUzytkownika] = useState(''); // Dane zalogowanego użytkownika.

    // Odświeżanie.
    const [odswiez, setOdswiez] = useState(false);
    const Odswiez = () =>
    {
        setOdswiez(prev => !prev);
    };

    // Formularz Logowanie/Rejestracja.
    const [showLogin, setShowLogin] = useState(false);
    const toggleShowLogin = () =>
    {
        setShowLogin(prevShowLogin => !prevShowLogin);
        Odswiez();
    };

    // Po każdym odświeżeniu spawdzamy czy dane logowania nadal są poprawne.
    useEffect(() =>
    {
        const loginData = StorageLoad('loginData');
        // Jeśli dane logowania istnieją.
        if(loginData)
        {
            ustawIsLogIn(true);
            ustawDaneUzytkownika(loginData);
        }
        else
        {
            ustawDaneUzytkownika('');
            ustawIsLogIn(false);
        }
    }, [odswiez]);


    // Aplikacja.
    return (
        <>
            {/* Nagłłówek Strony. */}
            <Header design={2} src={"./Grafiki/TłoDodatkowe/TOPanime.jpg"}>
                {/* Lewy Nagłówek z logo. */}
                <HeaderLeft>
                    <ButtonLogo title={"TTRPG"} src={"./Grafiki/Logo.png"}/>
                </HeaderLeft>

                {/* Środkowy nagłówek z menu. */}
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

                {/* Prawy nagłówek z opcjami. */}
                <HeaderRight>
                    {/*<Button active={false} src={"./Ikonki/Style.png"}/>*/}
                    {isLogIn === true ? (
                        <Menu2>
                            <li><ButtonAccount design={1} width={2} title={daneUzytkownika.nickname}
                                               userTitle={daneUzytkownika.admin === true && "[Admin]"}
                                               src={daneUzytkownika.avatar}></ButtonAccount>
                                <Menu2>
                                    <li><Button active={false} width={0} title={"Konto"}/></li>
                                    <li><Button active={false} width={0} title={"Panel"}/></li>
                                    <li>
                                        <Button active={false} title={"Wyloguj Się"} onClick={() =>
                                        {
                                            StorageRemove('loginData');
                                            Odswiez();
                                        }} width={0}/>
                                    </li>
                                </Menu2>
                            </li>
                        </Menu2>
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
