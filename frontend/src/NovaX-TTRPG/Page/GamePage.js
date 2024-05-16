import {useEffect, useState} from "react";
import {
    storageLoad,
    setTittle,
    storageRemove
} from "../../NovaX";
import {
    ModulChat,
    ModulHeader,
    useLogOut,
    verifyUser,
    WebsiteLogo,
    WebsiteName
} from "../../NovaX-TTRPG";

const GamePage = () =>
{
    // Tittle.
    setTittle(WebsiteLogo, `${WebsiteName} | Gra`);
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');

    // Status Zalogowaniay.
    const [isLogIn, setIsLogIn] = useState(false); // Czy zalogowany.
    const [userData, setUserData] = useState(''); // Dane zalogowanego.
    verifyUser(userData);
    // Wylogowywanie.
    const LogOut = useLogOut(userData, setIsLogIn, setUserData);

    // Sprawdza logowanie i odświeża dynamiczne elementy po zmianie.
    useEffect(() =>
    {
        // Czy zalogowany.
        const loginData = storageLoad('loginData');
        if(loginData)
        {
            if(loginData.banned === true)
            {
                storageRemove('loginData');
                setUserData('');
                setIsLogIn(false);
                window.location.href = '/';
            }
            else
            {
                setIsLogIn(true);
                setUserData(loginData);
            }
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