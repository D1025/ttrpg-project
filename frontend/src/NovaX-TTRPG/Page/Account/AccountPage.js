import { useEffect, useState} from "react";
import {
    Button,
    storageLoad,
    setTittle,
    Main,
    MainArticle,
    ArticleTitle,
    HrSeparator,
    AccountInformation,
    Input,
    InputNumber,
    iconEdit
} from "../../../NovaX";
import './AccountPage.css';
import {
    WindowDeleteRoom,
    WindowAccountNickname,
    WindowEditRoom,
    WindowAccountEmail,
    WindowAccountAvatar,
    imgBase64,
    ModulHeader,
    WindowAccountPassword,
    useLogOut,
    useDebounce,
    useLoadMyRoom,
    WindowInviteRoom,
    WebsiteLogo,
    WebsiteName
} from "../../index";

const GamePage = () =>
{
    // Tittle.
    setTittle(WebsiteLogo, `${WebsiteName} | Konto`);

    // Status Zalogowaniay.
    const [isLogIn, setIsLogIn] = useState(false); // Czy zalogowany.
    const [userData, setUserData] = useState(''); // Dane zalogowanego.
    const [page, setPage] = useState(0);
    const [pageMax, setPageMax] = useState(0);

    const [search, setSearch] = useState('');
    const debouncedSearchTerm = useDebounce(search, 500);

    useEffect(() =>
    {
        setPage(0);
        setPageMax(0);
    }, [debouncedSearchTerm]);

    const takePage = (event) =>
    {
        setPage(event.target.value);
    }

    // Wylogowywanie.
    const LogOut = useLogOut(userData, setIsLogIn, setUserData);

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
    // Zaproszenia Pokoi.
    const [showInviteRoom, setShowInviteRoom] = useState(false);
    const toggleInviteRoom = (pokoj) =>
    {
        if(!showInviteRoom)
        {
            const handleEscape = (event) =>
            {
                if(event.key === 'Escape')
                {
                    setShowInviteRoom(false);
                    document.removeEventListener('keydown', handleEscape);
                }
            };

            document.addEventListener('keydown', handleEscape);
        }
        setEdytowanyPokoj(pokoj);
        setShowInviteRoom(!showInviteRoom);
    }
    // Załaój pokoje.
    const [rooms, setRooms] = useState([]);
    const LoadRooms = useLoadMyRoom({
        isLogIn: isLogIn,
        page: page,
        setPageMax: setPageMax,
        setRooms: setRooms,
        togglDeleteRoom: togglDeleteRoom,
        toggleInviteRoom: toggleInviteRoom,
        togglEditRoom: togglEditRoom,
        search: search,
        userData: userData
    });

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
            LoadRooms({
                isLogIn: isLogIn,
                page: page,
                setPageMax: setPageMax,
                setRooms: setRooms,
                togglDeleteRoom: togglDeleteRoom,
                toggleInviteRoom: toggleInviteRoom,
                togglEditRoom: togglEditRoom,
                search: search,
                userData: userData
            });
        }
        else
        {
            setUserData('');
            setIsLogIn(false);
            window.location.href = '/';
        }
    }, [LoadRooms, showEditRoom === false, showDeleteRoom === false, showAccountNickname === false, showAccountEmail === false, showAccountAvatar === false, LogOut, debouncedSearchTerm]);

    return (
        <>
            {/* Nagłłówek Strony. */}
            <ModulHeader userData={userData} logOut={LogOut} isLogIn={isLogIn}/>

            <Main design={1}>
                <MainArticle>
                    <ArticleTitle title={"Ustawienia konta"}/>

                    <div className={"AccountPageBox"}>
                        <div className={"AccounPagetAvatar"}>
                            <Button src={iconEdit} onClick={togglAccountAvatar}/>
                            <div className={"AccounPagetAvatar-Box"}>
                                <img src={imgBase64(userData.imageExtension, userData.avatar)} alt={""}/>
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
                        {pageMax > 0 &&
                            <InputNumber
                                valueMin={0}
                                value={page}
                                valueMax={pageMax}
                                onChange={takePage}
                                width={0}
                            />
                        }
                        <Input
                            type={"text"}
                            placeholder={"Szukaj Pokoju"}
                            width={2}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <p style={{marginLeft: 'auto', color: 'var(--Kolor-Oznaczenia)'}}>
                            Strony pokoi: {isNaN(pageMax) ? 0 : pageMax + 1}
                        </p>
                    </div>
                    {rooms}
                </MainArticle>
            </Main>

            {showEditRoom && <WindowEditRoom roomData={edytowanyPokoj} onClose={togglEditRoom}/>}
            {showDeleteRoom && <WindowDeleteRoom roomData={edytowanyPokoj} onClose={togglDeleteRoom}/>}
            {showInviteRoom && <WindowInviteRoom roomData={edytowanyPokoj} onClose={toggleInviteRoom}/>}
            {showAccountNickname && <WindowAccountNickname userData={userData} onClose={togglAccountNickname}/>}
            {showAccountEmail && <WindowAccountEmail userData={userData} onClose={togglAccountEmail}/>}
            {showAccountAvatar && <WindowAccountAvatar userData={userData} onClose={togglAccountAvatar}/>}
            {showAccountPassword && <WindowAccountPassword userData={userData} onClose={togglAccountPassword}/>}
        </>
    );
}

export default GamePage;