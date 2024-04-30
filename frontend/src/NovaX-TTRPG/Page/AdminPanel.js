import {useEffect, useState} from "react";
import
{
    Main,
    MainArticle,
    ArticleTitle,
    storageLoad,
    setTittle
} from "../../NovaX";
import {
    ModulHeader,
    useLogOut,
    WindowLogIn
} from "../index";

const AdminPanel = () =>
{
    // Tittle.
    setTittle("../Grafiki/Logo.png", "TTRPG | Panel");

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