import {useEffect, useState} from "react";
import
{
    Menu2,
    Header, HeaderRight,
    Button, AccountBar,
    Main, MainArticle, ArticleTitle,
    StorageLoad, setTittle, HeaderLeft, ButtonLogo, HeaderCenter, StorageRemove
} from "../../NovaX";
import {ImgBase64, ModulHeader, WindowLogIn} from "../../NovaX-TTRPG";

const Game = () =>
{
    setTittle("/Grafiki/Logo.png", "TTRPG | Błąd");

    // Status Zalogowaniay.
    const [isLogIn, setIsLogIn] = useState(false); // Czy zalogowany.
    const [userData, setUserData] = useState(''); // Dane zalogowanego.

    // Wylogowywanie.
    const LogOut = async() =>
    {
        try
        {
            const odpowiedz = await fetch('http://localhost:8086/api/v1/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userData.token
                }
            });

            // Reagowanie na odpowiedź.
            if(odpowiedz.ok)
            {
                // Pomyślne wylogowanie
                StorageRemove('loginData');
                setIsLogIn(false)
                setUserData('')
            }
        }
        catch(blad)
        {
            // Obsługa błędów związanych z siecią lub żądaniem
            console.error(`Nieoczekiwany błąd: ${blad}`);
        }
    }

    // Formularz Logowanie/Rejestracja.
    const [showLogIn, setShowLogIn] = useState(false);
    const toggleLogIn = () =>
    {
        setShowLogIn(prevShowLogin => !prevShowLogin);
    };

    // Sprawdza logowanie i odświeża dynamiczne elementy po zmianie.
    useEffect(() =>
    {
        const loginData = StorageLoad('loginData');
        // Jeśli dane logowania istnieją.
        if(loginData)
        {
            setIsLogIn(true);
            setUserData(loginData);
        }
        else
        {
            setUserData('');
            setIsLogIn(false);
        }
    }, [showLogIn === false, LogOut]);

    return (
        <>
            {/* Nagłłówek Strony. */}
            <ModulHeader userData={userData} logIn={toggleLogIn} logOut={LogOut} isLogIn={isLogIn}/>

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

            {showLogIn && <WindowLogIn onClose={toggleLogIn}/>}
        </>
    );
}

export default Game;