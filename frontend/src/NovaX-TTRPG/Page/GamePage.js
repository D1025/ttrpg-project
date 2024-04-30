import {useCallback, useEffect, useState} from "react";
import {
    storageLoad, setTittle, storageRemove,
} from "../../NovaX";
import {ModulChat, ModulHeader, useLogOut, WindowLogIn} from "../../NovaX-TTRPG";

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
    const LogOut = useLogOut(userData, setIsLogIn, setUserData);

    // Formularz Logowanie/Rejestracja.
    const [showLogIn, setShowLogIn] = useState(false);
    const toggleLogIn = () =>
    {
        setShowLogIn(prevShowLogin => !prevShowLogin);
    };

    // Sprawdza logowanie i odświeża dynamiczne elementy po zmianie.
    useEffect(() =>
    {
        const loginData = storageLoad('loginData');
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
            <ModulHeader isLogIn={isLogIn} userData={userData} logOut={LogOut} navUser={false} navGame={true} logIn={toggleLogIn}/>

            <ModulChat roomId={idParam} userId={userData.id}/>

            {showLogIn && <WindowLogIn onClose={toggleLogIn}/>}
        </>
    );
}

export default GamePage;