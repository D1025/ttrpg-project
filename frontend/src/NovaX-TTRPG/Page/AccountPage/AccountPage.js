import {useCallback, useEffect, useState} from "react";
import {
    Button,
    StorageLoad,
    setTittle,
    Main,
    MainArticle,
    ArticleTitle,
    RoomFrame,
    HrSeparator,
    StorageRemove,
    AccountInformation,
    iconTrashCan,
    iconPlay,
    iconEdit
} from "../../../NovaX";
import './AccountPage.css';
import {
    WindowDeleteRoom,
    WindowAccountNickname,
    WindowEditRoom,
    WindowAccountEmail,
    WindowAccountAvatar,
    ImgBase64,
    ModulHeader, WindowLogIn, WindowAccountPassword
} from "../../index";

const GamePage = () =>
{
    // Tittle.
    setTittle("./Grafiki/Logo.png", "TTRPG | Konto");

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
                setIsLogIn(false);
                setUserData('');
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

    // Załaój pokoje.
    const [pokoje, setPokoje] = useState([]);
    const ladujPokoje = useCallback(async() =>
    {
        try
        {
            // Zapytanie dla publicznych pokoi
            const odpowiedzPubliczne = await fetch('http://localhost:8086/api/v1/room/my', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userData.token
                },
            });

            // Sprawdzenie odpowiedzi dla publicznych pokoi
            if(!odpowiedzPubliczne.ok)
            {
                // Obróbka błędów
                if(odpowiedzPubliczne.status === 400)
                {
                    const blad = await odpowiedzPubliczne.json();
                    console.log(`${blad.message}`);
                }
                else
                {
                    console.log(`Błąd: ${odpowiedzPubliczne.status}`);
                }
            }

            // Przetwarzanie odpowiedzi dla publicznych pokoi
            const danePubliczne = await odpowiedzPubliczne.json();

            // Połączenie danych
            const zrenderowanePokoje = danePubliczne.map(room => (
                room.ownerId === userData.id &&
                <RoomFrame
                    key={room.id}
                    src={ImgBase64(room.imageExtension, room.image)}
                    description={room.description}
                    title={room.name}
                >
                    <span style={{
                        marginRight: '0.5vw',
                        color: 'var(--Kolor-Oznaczenia)',
                        fontSize: '0.86rem',
                        fontWeight: 'bold'
                    }}>{room.isPrivate === false ? 'Publiczny' : 'Prywatny'}</span>
                    {isLogIn && (
                        <>
                            <Button colorNumber={4} onClick={() => togglDeleteRoom(room)} src={iconTrashCan}/>
                            <Button onClick={() => togglEditRoom(room)} src={iconEdit}/>
                            <a href={`/Gra?id=${room.id}`}>
                                <Button src={iconPlay}/>
                            </a>
                        </>
                    )}
                </RoomFrame>
            ));

            setPokoje(zrenderowanePokoje);
        }
        catch(blad)
        {
            console.log(`Nieoczekiwany błąd: ${blad}`);
        }
    }, [userData.token, isLogIn]); // Zależności useCallback'a


    // Formularz EditRoom.
    const [showEditRoom, setEditRoom] = useState(false);
    const [edytowanyPokoj, setEdytowanyPokoj] = useState("");
    const togglEditRoom = (pokoj) =>
    {
        if(!showEditRoom)
        {
            // Dodanie nasłuchiwania na klawisz Esc tylko, gdy aktywujemy avatar
            const handleEscape = (event) =>
            {
                if(event.key === 'Escape')
                {
                    setEditRoom(false);
                    document.removeEventListener('keydown', handleEscape);
                }
            };

            document.addEventListener('keydown', handleEscape);
        }
        setEdytowanyPokoj(pokoj);
        setEditRoom(!showEditRoom);
    };
    // Formularz DeleteRoom.
    const [showDeleteRoom, setDeleteRoom] = useState(false);
    const togglDeleteRoom = (pokoj) =>
    {
        if(!showDeleteRoom)
        {
            // Dodanie nasłuchiwania na klawisz Esc tylko, gdy aktywujemy avatar
            const handleEscape = (event) =>
            {
                if(event.key === 'Escape')
                {
                    setDeleteRoom(false);
                    document.removeEventListener('keydown', handleEscape);
                }
            };

            document.addEventListener('keydown', handleEscape);
        }
        setEdytowanyPokoj(pokoj);
        setDeleteRoom(!showDeleteRoom);
    };

    // Edycja Konta.
    const [showAccountNickname, setAccountNickname] = useState(false);
    const togglAccountNickname = () =>
    {
        if(!showAccountNickname)
        {
            // Dodanie nasłuchiwania na klawisz Esc tylko, gdy aktywujemy avatar
            const handleEscape = (event) =>
            {
                if(event.key === 'Escape')
                {
                    setAccountNickname(false);
                    document.removeEventListener('keydown', handleEscape);
                }
            };

            document.addEventListener('keydown', handleEscape);
        }
        setAccountNickname(!showAccountNickname);
    };

    const [showAccountEmail, setAccountEmail] = useState(false);
    const togglAccountEmail = () =>
    {
        if(!showAccountEmail)
        {
            // Dodanie nasłuchiwania na klawisz Esc tylko, gdy aktywujemy avatar
            const handleEscape = (event) =>
            {
                if(event.key === 'Escape')
                {
                    setAccountEmail(false);
                    document.removeEventListener('keydown', handleEscape);
                }
            };

            document.addEventListener('keydown', handleEscape);
        }
        setAccountEmail(!showAccountEmail);
    };

    const [showAccountAvatar, setAccountAvatar] = useState(false);
    const togglAccountAvatar = () =>
    {
        if(!showAccountAvatar)
        {
            // Dodanie nasłuchiwania na klawisz Esc tylko, gdy aktywujemy avatar
            const handleEscape = (event) =>
            {
                if(event.key === 'Escape')
                {
                    setAccountAvatar(false);
                    document.removeEventListener('keydown', handleEscape);
                }
            };

            document.addEventListener('keydown', handleEscape);
        }
        setAccountAvatar(!showAccountAvatar);
    };

    const [showAccountPassword, setAccountPassword] = useState(false);
    const togglAccountPassword = () =>
    {
        if(!showAccountAvatar)
        {
            // Dodanie nasłuchiwania na klawisz Esc tylko, gdy aktywujemy avatar
            const handleEscape = (event) =>
            {
                if(event.key === 'Escape')
                {
                    setAccountPassword(false);
                    document.removeEventListener('keydown', handleEscape);
                }
            };

            document.addEventListener('keydown', handleEscape);
        }
        setAccountPassword(!showAccountPassword);
    };

    // Sprawdza logowanie i odświeża dynamiczne elementy po zmianie.
    useEffect(() =>
    {
        const LoadLogInData = StorageLoad('loginData')
        // Jeśli dane logowania istnieją.
        if(LoadLogInData)
        {
            setIsLogIn(true);
            setUserData(LoadLogInData);
            ladujPokoje();
        }
        else
        {
            setUserData('');
            setIsLogIn(false);
            window.location.href = '/';
        }
    }, [ladujPokoje, showEditRoom === false, showDeleteRoom === false, showAccountNickname === false, showAccountEmail === false, showAccountAvatar === false, showLogIn, LogOut]);

    return (
        <>
            {/* Nagłłówek Strony. */}
            <ModulHeader userData={userData} logIn={toggleLogIn} logOut={LogOut} isLogIn={isLogIn}/>

            <Main design={1}>
                <MainArticle>
                    <ArticleTitle title={"Ustawienia konta"}/>

                    <div className={"AccountPageBox"}>
                        <div className={"AccounPagetAvatar"}>
                            <Button src={iconEdit} onClick={togglAccountAvatar}/>
                            <div className={"AccounPagetAvatar-Box"}>
                                <img src={ImgBase64(userData.imageExtension, userData.avatar)} alt={""}/>
                            </div>
                        </div>
                        <div className={"AccountPageRest"}>
                            <AccountInformation
                                dataType={"Nazwa"}
                                data={userData.nickname}
                                canEdit={true}
                                buttonColorNumber={0}
                                width={4}
                                marginBottom={true}
                                onClick={togglAccountNickname}
                            /><br/>
                            <AccountInformation
                                dataType={"Email"}
                                data={userData.email}
                                canEdit={true}
                                buttonColorNumber={0}
                                width={4} marginBottom={true}
                                onClick={togglAccountEmail}
                            /><br/>
                            <AccountInformation
                                dataType={"Hasło"}
                                data={'*****'}
                                canEdit={true} buttonColorNumber={0}
                                width={4}
                                marginBottom={true}
                                onClick={togglAccountPassword}
                            /><br/>
                        </div>
                    </div>

                    <HrSeparator title={"Moje Pokoje"}/>
                    {pokoje}
                </MainArticle>
            </Main>

            {showLogIn && <WindowLogIn onClose={toggleLogIn}/>}
            {showEditRoom && <WindowEditRoom danePokoju={edytowanyPokoj} onClose={togglEditRoom}/>}
            {showDeleteRoom && <WindowDeleteRoom danePokoju={edytowanyPokoj} onClose={togglDeleteRoom}/>}
            {showAccountNickname && <WindowAccountNickname userData={userData} onClose={togglAccountNickname}/>}
            {showAccountEmail && <WindowAccountEmail userData={userData} onClose={togglAccountEmail}/>}
            {showAccountAvatar && <WindowAccountAvatar userData={userData} onClose={togglAccountAvatar}/>}
            {showAccountPassword && <WindowAccountPassword userData={userData} onClose={togglAccountPassword}/>}
        </>
    );
}

export default GamePage;