import {useCallback, useEffect, useState} from "react";
import
{
    Menu2,
    Header, HeaderLeft, HeaderCenter, HeaderRight,
    Button, ButtonLogo, AccountBar,
    Main, MainArticle, MainPanel, ArticleTitle,
    RoomFrame,
    StorageLoad, StorageRemove, setTittle, ArticleTitleOption, iconAdd, iconSettings, iconTrashCan, iconPlay
} from "../../NovaX";
import {WindowCreateRoom, WindowDeleteRoom, WindowEditRoom, WindowLogIn} from "../../NovaX-TTRPG";

const HomePage = () =>
{
    // Tittle.
    setTittle("../Grafiki/Logo.png", "TTRPG | Lobby");

    // Lobby Publiczne/Prywatne.
    const [lobby, ustawLobby] = useState(false);

    // Status Zalogowaniay.
    const [isLogIn, ustawIsLogIn] = useState(false); // Czy zalogowany.
    const [daneUzytkownika, ustawDaneUzytkownika] = useState(''); // Dane zalogowanego.
    // Wylogowywanie.
    const LogOut = useCallback(async() =>
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
                ustawIsLogIn(false);
                ustawDaneUzytkownika('');
            }
        }
        catch(blad)
        {
            // Obsługa błędów związanych z siecią lub żądaniem
            console.error(`Nieoczekiwany błąd: ${blad}`);
        }
    }, [daneUzytkownika.token]);


    // Formularz Logowanie/Rejestracja.
    const [showLogin, setShowLogin] = useState(false);
    const toggleShowLogin = () =>
    {
        setShowLogin(!showLogin);
    };
    // Formularz CreateRoom.
    const [showCreateRoom, setCreateRoom] = useState(false);
    const togglCreateRoom = () =>
    {
        setCreateRoom(!showCreateRoom);
    };
    // Formularz EditRoom.
    const [showEditRoom, setEditRoom] = useState(false);
    const [edytowanyPokoj, setEdytowanyPokoj] = useState("");
    const togglEditRoom = (pokoj) =>
    {
        setEdytowanyPokoj(pokoj);
        setEditRoom(!showEditRoom);
    };
    // Formularz DeleteRoom.
    const [showDeleteRoom, setDeleteRoom] = useState(false);
    const togglDeleteRoom = (pokoj) =>
    {
        setEdytowanyPokoj(pokoj);
        setDeleteRoom(!showDeleteRoom);
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
                    <RoomFrame
                        key={pokoj.id}
                        src={pokoj.image && (`data:image/${pokoj.imageExtension};base64,${pokoj.image}`)}
                        description={pokoj.description && pokoj.description}
                        title={pokoj.name && pokoj.name}
                    >
                        {isLogIn === true && (
                            <>
                                {(daneUzytkownika.id === pokoj.ownerId || daneUzytkownika.admin === true) &&
                                    <>
                                        <Button colorNumber={4} onClick={() => togglDeleteRoom(pokoj)}
                                                src={iconTrashCan}/>
                                        <Button onClick={() => togglEditRoom(pokoj)} src={iconSettings}/>
                                    </>
                                }
                                <a href={`/Gra?id=${pokoj.id}`}>
                                    <Button src={iconPlay}/>
                                </a>
                            </>
                        )}
                    </RoomFrame>
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
    }, [lobby, ladujPokoje, showCreateRoom === false, showEditRoom === false, showDeleteRoom === false, showLogin]);

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
                                        <Button title={"Wiadomości"} style={{width: "100%"}}/>
                                    </a>
                                </li>
                                <li>
                                    <a href={""}>
                                        <Button title={"Regulamin"} style={{width: "100%"}}/>
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
                            <li><AccountBar design={1} width={2} title={daneUzytkownika.nickname}
                                            subTitle={daneUzytkownika.admin === true && "[Admin]"}
                                            src={daneUzytkownika.avatar}></AccountBar>
                                <Menu2>
                                    <li>
                                        <a href={"/Konto"}>
                                            <Button title={"Konto"} style={{width: "100%"}}/>
                                        </a>
                                    </li>
                                    {daneUzytkownika.admin === true && (
                                        <li>
                                            <a href={"/Panel"}>
                                                <Button title={"Panel"} style={{width: "100%"}}/>
                                            </a>
                                        </li>)}
                                    <li>
                                        <Button title={"Wyloguj Się"} onClick={LogOut} width={0}/>
                                    </li>
                                </Menu2>
                            </li>
                        </Menu2>
                    ) : (
                        <Button title={"Zaloguj Się"} src={"./Ikonki/Konto.png"}
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
                            <Button title={"Publiczne"} width={2} colorNumber={lobby === false ? 1 : 0}
                                    onClick={() => ustawLobby(false)}/>
                            <Button title={"Prywatne"} width={2} colorNumber={lobby === true ? 1 : 0}
                                    onClick={() => ustawLobby(true)}/>
                        </MainPanel>
                    )}

                {/* Artykuły Maina. */}
                <MainArticle>
                    <ArticleTitle title={lobby === false ? ("Pokoje Publiczne") : ("Pokoje Prywatne")} tag={"h2"}>
                        {isLogIn === true && (
                            <ArticleTitleOption>
                                <Button src={iconAdd} title={"Stwóż Pokój"} width={1} onClick={togglCreateRoom}/>
                            </ArticleTitleOption>
                        )}
                    </ArticleTitle>

                    {lobby === false ? (
                        <>
                            {pokoje}
                        </>
                    ) : (
                        <>
                            {pokoje}
                        </>
                    )}
                </MainArticle>


            </Main>

            {showLogin && <WindowLogIn onClose={toggleShowLogin}/>}
            {showCreateRoom && <WindowCreateRoom onClose={togglCreateRoom}/>}
            {showEditRoom && <WindowEditRoom danePokoju={edytowanyPokoj} onClose={togglEditRoom}/>}
            {showDeleteRoom && <WindowDeleteRoom danePokoju={edytowanyPokoj} onClose={togglDeleteRoom}/>}
        </>
    );
}

export default HomePage;