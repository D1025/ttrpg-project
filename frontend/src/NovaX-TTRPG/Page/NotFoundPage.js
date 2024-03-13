import {useEffect, useState} from "react";
import
{
    Menu2,
    Header, HeaderRight,
    Button, ButtonAccount,
    Main, MainArticle, ArticleTitle,
    StorageLoad, setTittle, HeaderLeft, ButtonLogo, HeaderCenter, StorageRemove
} from "../../NovaX";
import {WindowLogIn} from "../../NovaX-TTRPG";

const Game = () =>
{
    setTittle("/Grafiki/Logo.png", "TTRPG | Błąd");

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
    }, [odswiez]);

    return (
        <>
            {/* Nagłłówek Strony. */}
            <Header design={2} src={"./Grafiki/TłoDodatkowe/TOPanime.jpg"}>
                {/* Lewy Nagłówek z logo. */}
                <HeaderLeft>
                    <ButtonLogo title={"TTRPG"} src={"/Grafiki/Logo.png"} href={"/"}/>
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
                {/* Artykuły Maina. */}
                <MainArticle>
                    <ArticleTitle tag={"h1"} title={"Błąd 404"}/>
                    <p style={{display: "inline-block"}}>
                        Podana strona nie istnieje.
                    </p>
                </MainArticle>
            </Main>

            {showLogin && <WindowLogIn onClose={toggleShowLogin}/>}
        </>
    );
}

export default Game;