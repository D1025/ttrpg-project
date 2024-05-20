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
    ServerAdres
} from "../../NovaX-TTRPG";

const Game = () =>
{
    setTittle(WebsiteLogo, `${WebsiteName} | Ban`);

    // Status Zalogowaniay.
    const [isLogIn, setIsLogIn] = useState(false); // Czy zalogowany.
    const [userData, setUserData] = useState(''); // Dane zalogowanego.
    const [banned, setBanned] = useState('');

    const check = async() =>
    {
        try
        {
            const response = await fetch(`${ServerAdres}/api/v1/auth/verify`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userData.token,
                }
            });

            if(!response.ok)
            {
                const result = await response.json();
                if(response.status === 403)
                {
                    storageRemove('loginData');
                    setBanned(true);
                    setIsLogIn(false)
                }
            }
            else
            {
                window.location.href = `/`;
            }
        }
        catch(error)
        {
            console.error('Verification failed:', error);
        }
    }

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

    check();

    return (
        <>
            {/* Nagłłówek Strony. */}
            <ModulHeader userData={userData} logIn={toggleLogIn} logOut={LogOut} isLogIn={isLogIn}/>

            {/* Home Strony. */}
            <Main design={2}>
                {/* Artykuły Maina. */}
                <MainArticle>
                    <ArticleTitle tag={"h1"} title={isLogIn && "Twoje konto zostało zbanowane!" : "Prosimy się zalogować"}>
                        <ArticleTitleOption>
                            <Button title={"Strona główna"} href={"/"}/>
                        </ArticleTitleOption>
                    </ArticleTitle>
                    <p style={{display: "inline-block"}}>
                        {isLogIn && "Zostałeś automatycznie wylogowany."}
                    </p>
                </MainArticle>
            </Main>

            {showLogIn && <WindowLogIn onClose={toggleLogIn}/>}
        </>
    );
}

export default Game;