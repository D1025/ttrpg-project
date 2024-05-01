import {useCallback, useEffect, useState} from "react";
import
{
    Button,
    Main,
    MainArticle,
    MainPanel,
    ArticleTitle,
    RoomFrame,
    storageLoad,
    setTittle,
    ArticleTitleOption,
    iconAdd,
    iconTrashCan,
    iconPlay,
    iconEdit,
    iconShare,
    Input,
    InputNumber,
} from "../../NovaX";
import {
    imgBase64,
    ModulHeader,
    useDebounce, useLoadRoom,
    useLogOut, websiteAdres,
    WindowCreateRoom,
    WindowDeleteRoom,
    WindowEditRoom,
    WindowLogIn
} from "../../NovaX-TTRPG";
import WindowInviteSettings from "../Window/WindowRoom/WindowInviteSettings";

const HomePage = () =>
{
    // Tittle.
    setTittle("../Grafiki/Logo.png", "TTRPG | Lobby");

    // Lobby Publiczne/Prywatne.
    const [lobby, ustawLobby] = useState(false);

    // Status Zalogowaniay.
    const [isLogIn, setIsLogIn] = useState(false); // Czy zalogowany.
    const [userData, setUserData] = useState(''); // Dane zalogowanego.

    const [page, setPage] = useState(0);
    const [pageMax, setPageMax] = useState(0);

    const [search, setSearch] = useState('');
    const debouncedSearchTerm = useDebounce(search, 400);

    useEffect(() =>
    {
        setPage(0);
        setPageMax(0);
    }, [lobby, debouncedSearchTerm]);

    const takePage = (event) =>
    {
        setPage(event.target.value);
    }

    // Wylogowywanie.
    const LogOut = useLogOut(userData, setIsLogIn, setUserData);


    // Formularz Logowanie/Rejestracja.
    const [showLogIn, setShowLogIn] = useState(false);
    const toggleLogIn = () =>
    {
        if(!showLogIn)
        {
            // Dodanie nasłuchiwania na klawisz Esc tylko, gdy aktywujemy avatar
            const handleEscape = (event) =>
            {
                if(event.key === 'Escape')
                {
                    setShowLogIn(false);
                    document.removeEventListener('keydown', handleEscape);
                }
            };

            document.addEventListener('keydown', handleEscape);
        }
        setShowLogIn(!showLogIn);
    };
    // Formularz CreateRoom.
    const [showCreateRoom, setCreateRoom] = useState(false);
    const togglCreateRoom = () =>
    {
        if(!showCreateRoom)
        {
            // Dodanie nasłuchiwania na klawisz Esc tylko, gdy aktywujemy avatar
            const handleEscape = (event) =>
            {
                if(event.key === 'Escape')
                {
                    setCreateRoom(false);
                    document.removeEventListener('keydown', handleEscape);
                }
            };

            document.addEventListener('keydown', handleEscape);
        }
        setCreateRoom(!showCreateRoom);
    };
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

    const [showInvite, setInvite] = useState(false);
    const toggleInvite = (pokoj) =>
    {
        if(!showInvite)
        {
            const handleEscape = (event) =>
            {
                if(event.key === 'Escape')
                {
                    setInvite(false);
                    document.removeEventListener('keydown', handleEscape);
                }
            };

            document.addEventListener('keydown', handleEscape);
        }
        setEdytowanyPokoj(pokoj);
        setInvite(!showInvite);
    }

    // Załaój pokoje.
    const [rooms, setRooms] = useState([]);
    const LoadRooms = useLoadRoom(true, isLogIn, page, setPageMax, setRooms, togglDeleteRoom, toggleInvite, togglEditRoom, search, userData);

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
        }
        LoadRooms({publiczny: !lobby, page: page, search: debouncedSearchTerm});
    }, [lobby, LoadRooms, showCreateRoom === false, showEditRoom === false, showDeleteRoom === false, showLogIn === false, LogOut, page, debouncedSearchTerm]);

    // Aplikacja.
    return (
        <>
            {/* Nagłłówek Strony. */}
            <ModulHeader userData={userData} logIn={toggleLogIn} logOut={LogOut} isLogIn={isLogIn}/>

            {/* Home Strony. */}
            <Main design={2}>
                {/* Nawigacja Home'a. */}
                {isLogIn === true &&
                    (
                        <MainPanel>
                            <Button title={"Publiczne"} width={2} colorNumber={lobby === false ? 1 : 0}
                                    onClick={() => ustawLobby(false)}/>
                            <Button title={"Prywatne"} width={2} colorNumber={lobby === true ? 1 : 0}
                                    onClick={() => ustawLobby(true)}/>
                        </MainPanel>
                    )}

                {/* Artykuły Maina. */}
                <MainArticle>
                    <ArticleTitle title={lobby === false ? ("Pokoje Publiczne") : ("Pokoje Prywatne")} tag={"h2"}>
                        {isLogIn === true && (
                            <ArticleTitleOption>
                                {pageMax > 0 &&
                                    <InputNumber
                                        valueMin={0}
                                        value={page}
                                        valueMax={pageMax}
                                        onChange={takePage}
                                        width={0}
                                    />
                                }
                                <Input type={"text"} placeholder={"Szukaj"} width={2} value={search}
                                       onChange={e => setSearch(e.target.value)}/>
                                <Button src={iconAdd} title={"Stwóż Pokój"} width={2} onClick={togglCreateRoom}/>
                            </ArticleTitleOption>
                        )}
                    </ArticleTitle>

                    {rooms}
                </MainArticle>
            </Main>

            {showLogIn && <WindowLogIn onClose={toggleLogIn}/>}
            {showCreateRoom && <WindowCreateRoom onClose={togglCreateRoom}/>}
            {showEditRoom && <WindowEditRoom danePokoju={edytowanyPokoj} onClose={togglEditRoom}/>}
            {showDeleteRoom && <WindowDeleteRoom danePokoju={edytowanyPokoj} onClose={togglDeleteRoom}/>}
            {showInvite && <WindowInviteSettings danePokoju={edytowanyPokoj} onClose={toggleInvite}/>}
        </>
    );
}

export default HomePage;