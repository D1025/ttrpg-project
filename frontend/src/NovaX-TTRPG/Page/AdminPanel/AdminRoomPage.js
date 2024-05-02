import {useEffect, useState} from "react";
import
{
    Main,
    MainArticle,
    ArticleTitle,
    storageLoad,
    setTittle
} from "../../../NovaX";
import {
    ModulHeader,
    useLogOut,
    WebsiteLogo,
    WebsiteName
} from "../../index";

const AdminRoomPage = () =>
{
    // Tittle.
    setTittle(WebsiteLogo, `${WebsiteName} | Pokoje`);

    // Status Zalogowaniay.
    const [isLogIn, setIsLogIn] = useState(false); // Czy zalogowany.
    const [userData, setUserData] = useState(''); // Dane zalogowanego.
    // Wylogowywanie.
    const LogOut = useLogOut(userData, setIsLogIn, setUserData);

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
            setIsLogIn(false);
            setUserData('');
            window.location.href = '/';
        }
    }, [LogOut]);

    // Aplikacja.
    return (
        <>
            {/* Nagłłówek Strony. */}
            <ModulHeader navAdmin={true} navUser={false} isLogIn={isLogIn} userData={userData}
                         logOut={LogOut}/>

            {/* Home Strony. */}
            <Main design={2}>

                {/* Artykuły Maina. */}
                <MainArticle>
                    <ArticleTitle title={"Lista Pokoi"} tag={"h2"}/>
                    Pokoje
                </MainArticle>
            </Main>
        </>
    );
}

export default AdminRoomPage;