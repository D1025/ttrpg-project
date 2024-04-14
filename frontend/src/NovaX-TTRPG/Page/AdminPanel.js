import {useEffect, useState} from "react";
import
{
    Main, MainArticle, ArticleTitle,
    StorageLoad, StorageRemove, setTittle
} from "../../NovaX";
import {ModulHeader, WindowLogIn} from "../index";

const AdminPanel = () => {
    // Tittle.
    setTittle("../Grafiki/Logo.png", "TTRPG | Panel");

    // Status Zalogowaniay.
    const [isLogIn, setIsLogIn] = useState(false); // Czy zalogowany.
    const [userData, setUserData] = useState(''); // Dane zalogowanego.
    // Wylogowywanie.
    const LogOut = async () => {
        try {
            const odpowiedz = await fetch('http://localhost:8086/api/v1/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userData.token
                }
            });

            // Reagowanie na odpowiedź.
            if (odpowiedz.ok) {
                // Pomyślne wylogowanie
                StorageRemove('loginData');
                setIsLogIn(false);
                setUserData('');
            }
        } catch (blad) {
            // Obsługa błędów związanych z siecią lub żądaniem
            console.error(`Nieoczekiwany błąd: ${blad}`);
        }
    }

    // Formularz Logowanie/Rejestracja.
    const [showLogIn, setShowLogIn] = useState(false);
    const toggleLogIn = () => {
        setShowLogIn(prevShowLogin => !prevShowLogin);
    };

    // Sprawdza logowanie i odświeża dynamiczne elementy po zmianie.
    useEffect(() => {
        const loginData = StorageLoad('loginData');
        // Jeśli dane logowania istnieją.
        if (loginData) {
            setIsLogIn(true);
            setUserData(loginData);
        } else {
            setUserData('');
            setIsLogIn(false);
            window.location.href = '/';
        }
    }, [showLogIn === false, LogOut]);

    // Aplikacja.
    return (
        <>
            {/* Nagłłówek Strony. */}
            <ModulHeader navAdmin={true} navUser={false} isLogIn={isLogIn} logIn={toggleLogIn} userData={userData}
                         logOut={LogOut}/>

            {/* Home Strony. */}
            <Main design={2}>

                {/* Artykuły Maina. */}
                <MainArticle>
                    <ArticleTitle title={"Panel"} tag={"h2"}/>
                    Panel
                </MainArticle>
            </Main>

            {showLogIn && <WindowLogIn onClose={toggleLogIn}/>}
        </>
    );
}

export default AdminPanel;