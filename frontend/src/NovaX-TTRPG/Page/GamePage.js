import {useCallback, useEffect, useState} from "react";
import {
    Menu2,
    Header, HeaderRight,
    Button, AccountBar,
    StorageLoad, setTittle, StorageRemove,
} from "../../NovaX";
import {ImgBase64, ModulChat, ModulHeader, WindowLogIn} from "../../NovaX-TTRPG";

const GamePage = () =>
{
    // Tittle.
    setTittle("./Grafiki/Logo.png", "TTRPG | Gra");
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');

    // Status Zalogowaniay.
    const [isLogIn, setIsLogIn] = useState(false); // Czy zalogowany.
    const [userData, setUserData] = useState(''); // Dane zalogowanego.

    // Wylogowywanie.
    const LogOut = useCallback(async() =>
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
            }
        }
        catch(blad)
        {
            // Obsługa błędów związanych z siecią lub żądaniem
            console.error(`Nieoczekiwany błąd: ${blad}`);
        }
    }, [userData.token]);

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
            window.location.href = '/';
        }
    }, [showLogIn === false, LogOut]);

    return (
        <>
            {/* Nagłłówek Strony. */}
            <ModulHeader isLogIn={isLogIn} userData={userData} logOut={LogOut} navUser={false} logIn={toggleLogIn}/>

            <ModulChat roomId={idParam} userId={userData.id}/>

            {showLogIn && <WindowLogIn onClose={toggleLogIn}/>}
        </>
    );
}

export default GamePage;