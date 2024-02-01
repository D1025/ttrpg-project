import {useCallback, useEffect, useState} from "react";
import
{
    Menu2,
    Header, HeaderLeft, HeaderCenter, HeaderRight,
    Button, ButtonLogo, ButtonAccount,
    Main, MainArticle, MainPanel, MainTitle,
    ModulLogIn, ModulCreateRoom,
    RoomBar,
    StorageLoad, StorageRemove, setTittle
} from "../../NovaX";

const HomePage = () =>
{
    // Tittle.
    setTittle("../Grafiki/Logo.png", "TTRPG | Lobby");

    // Lobby Publiczne/Prywatne.
    const [lobby, ustawLobby] = useState(false);

    // Odświeżanie.
    const [odswiez, setOdswiez] = useState(false);
    const wymusOdswiezenie = () =>
    {
        setOdswiez(prev => !prev);
    };


    // Status Zalogowaniay.
    const [isLogIn, ustawIsLogIn] = useState(false); // Czy zalogowany.
    const [daneUzytkownika, ustawDaneUzytkownika] = useState(''); // Dane zalogowanego.
    // Wylogowywanie.
    const LogOut = async() =>
    {
        try
        {
            const odpowiedz = await fetch('http://localhost:8086/api/v1/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': daneUzytkownika.token
                }
            });

            // Reagowanie na odpowiedź.
            if(odpowiedz.ok)
            {
                // Pomyślne wylogowanie
                StorageRemove('loginData');
                wymusOdswiezenie();
            }
        }
        catch(blad)
        {
            // Obsługa błędów związanych z siecią lub żądaniem
            console.error(`Nieoczekiwany błąd: ${blad}`);
        }
    }

    // Formularz Logowanie/Rejestracja.
    const [showLogin, setShowLogin] = useState(false);
    const toggleShowLogin = () =>
    {
        setShowLogin(prevShowLogin => !prevShowLogin);
        wymusOdswiezenie();
    };
    // Formularz CreateRoom.
    const [showCreateRoom, setCreateRoom] = useState(false);
    const togglCreateRoom = () =>
    {
        setCreateRoom(prevShowLogin => !prevShowLogin);
        wymusOdswiezenie();
    };


    // Załaój pokoje.
    const [pokoje, setPokoje] = useState([]);
    const ladujPokoje = useCallback(async({publiczny = true}) =>
    {
        try
        {
            const odpowiedz = await fetch(`http://localhost:8086/api/v1/room?status=${publiczny ? 'PUBLIC' : 'PRIVATE'}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': daneUzytkownika.token && publiczny === false ? (daneUzytkownika.token) : ''
                },
            });

            if(!odpowiedz.ok)
            {
                // Obróbka błędów
                if(odpowiedz.status === 400)
                {
                    const blad = await odpowiedz.json();
                    console.log(`${blad.message}`);
                }
                else
                {
                    console.log(`Błąd: ${odpowiedz.status}`);
                }
            }
            else
            {
                const dane = await odpowiedz.json();

                // Przetwarzanie i tworzenie komponentów pokoi
                const zrenderowanePokoje = dane.map(pokoj => (
                    <RoomBar
                        key={pokoj.id}
                        src={pokoj.image && (`data:image/${pokoj.imageExtension};base64,${pokoj.image}`)}
                        description={pokoj.description && pokoj.description}
                        title={pokoj.name && pokoj.name}
                    >
                        {isLogIn === true && (
                            <a href={`/Gra?id=${pokoj.id}`}>
                                <Button src={"./Ikonki/Play.png"}/>
                            </a>
                        )}
                    </RoomBar>
                ));

                setPokoje(zrenderowanePokoje);
            }
        }
        catch(blad)
        {
            console.log(`Nieoczekiwany błąd: ${blad}`);
        }
    }, [daneUzytkownika.token]); // Zależności useCallback'a

    // Sprawdza logowanie i odświeża dynamiczne elementy po zmianie.
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
        ladujPokoje({publiczny: !lobby});
    }, [odswiez, lobby,pokoje]);

    // Aplikacja.
    return (
        <>
            {/* Nagłłówek Strony. */}
            <Header design={2} src={"./Grafiki/TłoDodatkowe/TOPanime.jpg"}>
                {/* Lewy Nagłówek z logo. */}
                <HeaderLeft>
                    <ButtonLogo title={"TTRPG"} src={"./Grafiki/Logo.png"} href={"/"}/>
                </HeaderLeft>

                {/* Środkowy nagłówek z menu. */}
                <HeaderCenter>
                    <Menu2 tag="nav">
                        <li>
                            <a href={"/"}>
                                <Button title={"Pokoje"} width={2}/>
                            </a>
                        </li>
                        <li>
                            <a href={""}>
                                <Button title={"O Nas"} width={2}/>
                            </a>
                            <Menu2>
                                <li>
                                    <a href={""}>
                                        <Button title={"Wiadomości"} style={{width:"100%"}}/>
                                    </a>
                                </li>
                                <li>
                                    <a href={""}>
                                        <Button title={"Regulamin"} style={{width:"100%"}}/>
                                    </a>
                                </li>
                            </Menu2>
                        </li>
                    </Menu2>
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
                                    <li>
                                        <a href={"/Konto"}>
                                            <Button active={false} title={"Konto"} style={{width: "100%"}}/>
                                        </a>
                                    </li>
                                    {daneUzytkownika.admin === true && (
                                        <li>
                                            <a href={"/Panel"}>
                                                <Button active={false} title={"Panel"} style={{width: "100%"}}/>
                                            </a>
                                        </li>)}
                                    <li>
                                        <Button active={false} title={"Wyloguj Się"} onClick={LogOut} width={0}/>
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


            {/* Home Strony. */}
            <Main design={2}>
                {/* Nawigacja Home'a. */}
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
                                <Button src={"./Ikonki/Dodaj.png"} title={"Stwóż Pokój"} width={1}
                                        onClick={togglCreateRoom}/>
                            </div>
                        )}
                        {/*<div type={"tag"}>[Tag 1] [Tag 2]</div>*/}
                    </MainTitle>

                    {lobby === false ? (
                        <>
                            {pokoje}
                            {/*<RoomBar title={"Kocie Zabawy"}*/}
                            {/*         description={"Gramy w kotki ze znajomymi a smoki chcą zjeść nasze kotki :)"}*/}
                            {/*         src={"https://i.pinimg.com/originals/0d/72/f3/0d72f35db2305ef238e1fbc1d1151719.jpg"}/>*/}
                            {/*<RoomBar title={"Smoki Wojny"}*/}
                            {/*         description={"To ekscytująca gra fabularna, gdzie gracze wcielają się w bohaterów stawiających czoła potężnym smokom i ich hordom, aby przywrócić równowagę w świecie pogrążonym w chaosie wojennym. Walka, intrygi i niebezpieczeństwa czekają na każdym kroku, a losy świata zależą od sprytu i odwagi graczy.\"\n"}*/}
                            {/*         src={"https://i.pinimg.com/originals/db/9d/14/db9d149cdcef8f864bb3a9a8e7d93121.jpg"}/>*/}
                        </>
                    ) : (
                        <>
                            {pokoje}
                            {/*<RoomBar title={"Poległe Kotki"}/>*/}
                        </>
                    )}
                </MainArticle>


            </Main>

            {showLogin && <ModulLogIn onClose={toggleShowLogin}/>}
            {showCreateRoom && <ModulCreateRoom onClose={togglCreateRoom}/>}
        </>
    );
}

export default HomePage;