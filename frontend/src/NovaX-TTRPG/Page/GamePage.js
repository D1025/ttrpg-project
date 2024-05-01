import {useEffect, useState} from "react";
import {
    storageLoad,
    setTittle
} from "../../NovaX";
import {
    ModulChat,
    ModulHeader,
    useLogOut
} from "../../NovaX-TTRPG";

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

    // Sprawdza logowanie i odświeża dynamiczne elementy po zmianie.
    useEffect(() =>
    {
        const loginData = storageLoad('loginData');
        if(loginData)
        {
            setIsLogIn(true);
            setUserData(loginData);
        }
        else
        {
            setIsLogIn(false);
            setUserData('');
            window.location.href = '/';
        }
    }, [LogOut]);

    return (
        <>
            {/* Nagłłówek Strony. */}
            <ModulHeader isLogIn={isLogIn} userData={userData} logOut={LogOut} navUser={false} navGame={true}/>

            <ModulChat roomId={idParam} userId={userData.id}/>
        </>
    );
}

export default GamePage;