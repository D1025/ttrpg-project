import {useCallback, useEffect, useState} from "react";
import
{
    Menu2,
    Header, HeaderLeft, HeaderCenter, HeaderRight,
    Button, ButtonLogo, AccountBar,
    Main, MainArticle, ArticleTitle,
    RoomFrame,
    StorageLoad, StorageRemove, setTittle
} from "../../NovaX";

const AdminPanel = () =>
{
    // Tittle.
    setTittle("../Grafiki/Logo.png", "TTRPG | Panel");

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


    // Załaój pokoje.
    const [uzytkownicy, ustawUzytkownicy] = useState([]);
    const ladujUzytkownicy = useCallback(async({publiczny = true}) =>
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
                        <a href={`/Gra?id=${pokoj.id}`}>
                            <Button src={"./Ikonki/Play.png"}/>
                        </a>
                    </RoomFrame>
                ));

                ustawUzytkownicy(zrenderowanePokoje);
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
        ladujUzytkownicy({publiczny: !lobby});
    }, [odswiez, lobby]);

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
                            <Button title={"Użytkownicy"} width={2} active={false}/>
                        </li>
                    </Menu2>
                </HeaderCenter>

                {/* Prawy nagłówek z opcjami. */}
                <HeaderRight>
                    {/*<Button active={false} src={"./Ikonki/Style.png"}/>*/}
                    {isLogIn === true ? (
                        <Menu2>
                            <li><AccountBar design={1} width={2} title={daneUzytkownika.nickname}
                                            userTitle={daneUzytkownika.admin === true && "[Admin]"}
                                            src={daneUzytkownika.avatar}></AccountBar>
                                <Menu2>
                                    <li>
                                        <a href={"/Konto"}>
                                            <Button active={false} title={"Konto"} style={{width: "100%"}}/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={"/"}>
                                            <Button active={false} title={"Wyjdź"} style={{width: "100%"}}/>
                                        </a>
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

                {/* Artykuły Maina. */}
                <MainArticle>
                    <ArticleTitle title={"Uzytkownicy"} tag={"h2"}/>
                    {uzytkownicy}
                </MainArticle>
            </Main>
        </>
    );
}

export default AdminPanel;