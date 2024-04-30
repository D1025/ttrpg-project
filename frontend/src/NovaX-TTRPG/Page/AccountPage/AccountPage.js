import {useCallback, useEffect, useState} from "react";
import {
    Button,
    storageLoad,
    setTittle,
    Main,
    MainArticle,
    ArticleTitle,
    RoomFrame,
    HrSeparator,
    storageRemove,
    AccountInformation,
    Input,
    InputNumber,
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
import useDebounce from "../../Utils/Debounce";

const GamePage = () =>
{
    // Tittle.
    setTittle("./Grafiki/Logo.png", "TTRPG | Konto");

    // Status Zalogowaniay.
    const [isLogIn, setIsLogIn] = useState(false); // Czy zalogowany.
    const [userData, setUserData] = useState(''); // Dane zalogowanego.
    const [page, setPage] = useState(0);
    const [pageMax, setPageMax] = useState(0);

    const [search, setSearch] = useState('');
    const debouncedSearchTerm = useDebounce(search, 500);

    useEffect(() => {
        setPage(0);
        setPageMax(0);
    }, [debouncedSearchTerm]);

    const takePage = (event) =>
    {
        setPage(event.target.value);
    }


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
                storageRemove('loginData');
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
    const ladujPokoje = useCallback(async(search) =>
    {
        try
        {
            // Zapytanie dla publicznych pokoi
            const odpowiedzPubliczne = await fetch(`http://localhost:8086/api/v1/room/my?page=${page}&name=${search}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userData.token
                }
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

            setPageMax(danePubliczne.totalPages - 1);

            // Połączenie danych
            const zrenderowanePokoje = danePubliczne.content.map(room => (
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
    }, [userData.token, isLogIn, page]); // Zależności useCallback'a


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
        const LoadLogInData = storageLoad('loginData')
        // Jeśli dane logowania istnieją.
        if(LoadLogInData)
        {
            setIsLogIn(true);
            setUserData(LoadLogInData);
            ladujPokoje(debouncedSearchTerm);
        }
        else
        {
            setUserData('');
            setIsLogIn(false);
            window.location.href = '/';
        }
    }, [ladujPokoje, showEditRoom === false, showDeleteRoom === false, showAccountNickname === false, showAccountEmail === false, showAccountAvatar === false, showLogIn, LogOut, debouncedSearchTerm]);

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
                                showButton={true}
                                width={4}
                                marginBottom={true}
                                onClick={togglAccountNickname}
                            />
                            <AccountInformation
                                dataType={"Email"}
                                data={userData.email}
                                showButton={true}
                                width={4}
                                marginBottom={true}
                                onClick={togglAccountEmail}
                            />
                            <AccountInformation
                                dataType={"Hasło"}
                                data={'*****'}
                                showButton={true}
                                width={4}
                                marginBottom={true}
                                onClick={togglAccountPassword}
                            />
                        </div>
                    </div>

                    <HrSeparator title={"Moje Pokoje"}/>
                    <div style={{display: "flex", marginBottom: "0.5vw", alignItems: 'center'}}>
                        <InputNumber
                            valueMin={0}
                            value={page}
                            valueMax={pageMax}
                            onChange={takePage}
                            width={0}
                        />
                        <Input type={"text"} placeholder={"Szukaj"} width={2} value={search} onChange={e => setSearch(e.target.value)}/>
                        <p style={{marginLeft:'auto', color: 'var(--Kolor-Oznaczenia)'}}>
                            Strony pokoi: {isNaN(pageMax) ? 0 : pageMax + 1}
                        </p>
                    </div>
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