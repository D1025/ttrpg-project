import {useEffect, useState} from "react";
import
{
    Main,
    MainArticle,
    ArticleTitle,
    storageLoad,
    setTittle,
    Button,
    ArticleTitleOption,
    storageRemove
} from "../../NovaX";
import {
    ModulHeader,
    useLogOut,
    useToggleConst,
    WindowLogIn,
    WebsiteLogo,
    WebsiteName,
} from "../../NovaX-TTRPG";

const Game = () =>
{
    setTittle(WebsiteLogo, `${WebsiteName} | Błąd`);

    storageRemove('loginData');

    // Status Zalogowaniay.
    const [isLogIn, setIsLogIn] = useState(false); // Czy zalogowany.
    const [userData, setUserData] = useState(''); // Dane zalogowanego.

    // Wylogowywanie.
    const LogOut = useLogOut(userData, setIsLogIn, setUserData);

    // Formularz Logowanie/Rejestracja.
    const [showLogIn, setShowLogIn] = useState(false);
    const toggleLogIn = useToggleConst({setData: setShowLogIn})

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
                    <ArticleTitle tag={"h1"} title={"Twoje konto zostało zbanowane!"}>
                        <ArticleTitleOption>
                            <Button title={"Strona główna"} href={"/"}/>
                        </ArticleTitleOption>
                    </ArticleTitle>
                    <p style={{display: "inline-block"}}>
                       Zostałeś automatycznie wylogowany.
                    </p>
                </MainArticle>
            </Main>

            {showLogIn && <WindowLogIn onClose={toggleLogIn}/>}
        </>
    );
}

export default Game;