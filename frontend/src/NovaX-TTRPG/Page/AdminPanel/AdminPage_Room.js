import {useEffect, useState} from "react";
import
{
    Main,
    MainArticle,
    ArticleTitle,
    storageLoad,
    setTittle,
    InputNumber,
    Input,
    Button,
    ArticleTitleOption,
    iconAdd, storageRemove
} from "../../../NovaX";
import {
    ModulHeader,
    useDebounce,
    useLoadAllRooms,
    useLogOut,
    useToggleConst,
    WindowCreateRoom,
    WindowDeleteRoom,
    WindowEditRoom,
    WindowInviteRoom,
    WebsiteLogo,
    WebsiteName, verifyUser
} from "../../index";

const AdminPage_Room = () =>
{
    // Tittle.
    setTittle(WebsiteLogo, `${WebsiteName} | Pokoje`);

    // Status Zalogowaniay.
    const [isLogIn, setIsLogIn] = useState(false); // Czy zalogowany.
    const [userData, setUserData] = useState(''); // Dane zalogowanego.
    verifyUser(userData);
    // Wylogowywanie.
    const LogOut = useLogOut(userData, setIsLogIn, setUserData);

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
    }, [debouncedSearchTerm]);

    // Obecnie wybrana strona.
    const takePage = (event) =>
    {
        setPage(event.target.value);
    }

    // Załaój pokoje.
    const [rooms, setRooms] = useState([]);
    const LoadRooms = useLoadAllRooms({
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
                window.location.href = '/';
            }
            else if(loginData.admin === false)
            {
                window.location.href = '/';
            }
            else
            {
                setIsLogIn(true);
                setUserData(loginData);
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
        }
        else
        {
            setIsLogIn(false);
            setUserData('');
            window.location.href = '/';
        }
    }, [LoadRooms, showCreateRoom === false, showEditRoom === false, showDeleteRoom === false, showInviteRoom === false, LogOut, page, debouncedSearchTerm]);

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
                    <ArticleTitle title={"Lista Pokoi"} tag={"h2"}>
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
                    </ArticleTitle>
                    {rooms}
                </MainArticle>
            </Main>

            {showCreateRoom && <WindowCreateRoom onClose={togglCreateRoom}/>}
            {showEditRoom && <WindowEditRoom roomData={choiceRoom} onClose={togglEditRoom}/>}
            {showDeleteRoom && <WindowDeleteRoom roomData={choiceRoom} onClose={togglDeleteRoom}/>}
            {showInviteRoom && <WindowInviteRoom roomData={choiceRoom} onClose={toggleInviteRoom}/>}
        </>
    );
}

export default AdminPage_Room;