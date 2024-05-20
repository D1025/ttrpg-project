import {useEffect, useState} from "react";
import
{
    Button,
    Main,
    MainArticle,
    MainPanel,
    ArticleTitle,
    storageLoad,
    setTittle,
    ArticleTitleOption,
    Input,
    InputNumber,
    iconAdd, storageRemove
} from "../../NovaX";
import {
    ModulHeader,
    useToggleConst,
    useDebounce,
    useLoadRoom,
    useLogOut,
    WindowCreateRoom,
    WindowDeleteRoom,
    WindowEditRoom,
    WindowLogIn,
    WindowInviteRoom,
    WebsiteLogo,
    WebsiteName,
    verifyUser
} from "../../NovaX-TTRPG";

const HomePage = () =>
{
    // Tittle.
    setTittle(WebsiteLogo, `${WebsiteName} | Pokoje`);

    // Lobby Publiczne/Prywatne.
    const [lobby, setLobby] = useState(true);

    // Status Zalogowaniay.
    const [isLogIn, setIsLogIn] = useState(false); // Czy zalogowany.
    const [userData, setUserData] = useState(''); // Dane zalogowanego.
    if(userData !== '') verifyUser(userData);

    // Ilość Stron.
    const [page, setPage] = useState(0);
    const [pageMax, setPageMax] = useState(0);
    // Dane Wyszukiwania.
    const [search, setSearch] = useState('');
    const debouncedSearchTerm = useDebounce(search, 400);

    useEffect(() =>
    {
        setPage(0);
        setPageMax(0);
    }, [lobby, debouncedSearchTerm]);

    // Obecnie wybrana strona.
    const takePage = (event) =>
    {
        setPage(event.target.value);
    }

    // Wylogowywanie.
    const LogOut = useLogOut(userData, setIsLogIn, setUserData);

    // Formularz Logowanie/Rejestracja.
    const [showLogIn, setShowLogIn] = useState(false);
    const toggleLogIn = useToggleConst({setData: setShowLogIn})

    // Formularz CreateRoom.
    const [showCreateRoom, setShowCreateRoom] = useState(false);
    const togglCreateRoom = useToggleConst({setData: setShowCreateRoom})
    // Formularz EditRoom.
    const [showEditRoom, setShowEditRoom] = useState(false);
    const [choiceRoom, setChoiceRoom] = useState("");
    const togglEditRoom = (choiceRoom) =>
    {
        if(!showEditRoom)
        {
            // Dodanie nasłuchiwania na klawisz Esc tylko, gdy aktywujemy avatar
            const handleEscape = (event) =>
            {
                if(event.key === 'Escape')
                {
                    setShowEditRoom(false);
                    document.removeEventListener('keydown', handleEscape);
                }
            };

            document.addEventListener('keydown', handleEscape);
        }
        setChoiceRoom(choiceRoom);
        setShowEditRoom(!showEditRoom);
    };
    // Formularz DeleteRoom.
    const [showDeleteRoom, setDeleteRoom] = useState(false);
    const togglDeleteRoom = (choiceRoom) =>
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
        setChoiceRoom(choiceRoom);
        setDeleteRoom(!showDeleteRoom);
    };

    const [showInviteRoom, setShowInviteRoom] = useState(false);
    const toggleInviteRoom = (choiceRoom) =>
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
        setChoiceRoom(choiceRoom);
        setShowInviteRoom(!showInviteRoom);
    }

    // Załaój pokoje.
    const [rooms, setRooms] = useState([]);
    const LoadRooms = useLoadRoom({
        isPublic: lobby,
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

        LoadRooms({
            isPublic: lobby,
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
    }, [lobby, LoadRooms, showCreateRoom === false, showEditRoom === false, showDeleteRoom === false, showLogIn === false, LogOut, page, debouncedSearchTerm]);

    // Aplikacja.
    return (
        <>
            {/* Nagłłówek Strony. */}
            <ModulHeader userData={userData} logIn={toggleLogIn} logOut={LogOut} isLogIn={isLogIn}/>

            {/* Home Strony. */}
            <Main design={2}>
                {/* Nawigacja Home'a. */}
                {isLogIn === true && (
                    <MainPanel>
                        <Button title={"Publiczne"} width={2} colorNumber={lobby === true ? 1 : 0}
                                onClick={() => setLobby(true)}/>
                        <Button title={"Dołączone"} width={2} colorNumber={lobby === false ? 1 : 0}
                                onClick={() => setLobby(false)}/>
                    </MainPanel>
                )}

                {/* Artykuły Maina. */}
                <MainArticle>
                    <ArticleTitle title={lobby === true ? ("Pokoje Publiczne") : ("Pokoje Dołączone")} tag={"h2"}>
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
            {showEditRoom && <WindowEditRoom roomData={choiceRoom} onClose={togglEditRoom}/>}
            {showDeleteRoom && <WindowDeleteRoom roomData={choiceRoom} onClose={togglDeleteRoom}/>}
            {showInviteRoom && <WindowInviteRoom roomData={choiceRoom} onClose={toggleInviteRoom}/>}
        </>
    );
}

export default HomePage;