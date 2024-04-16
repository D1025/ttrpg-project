import {useCallback, useEffect, useState} from "react";
import
{
    Button,
    Main,
    MainArticle,
    MainPanel,
    ArticleTitle,
    RoomFrame,
    StorageLoad,
    StorageRemove,
    setTittle,
    ArticleTitleOption,
    iconAdd,
    iconTrashCan,
    iconPlay,
    iconEdit, iconShare, Input, iconArrowLeft, iconArrowRight, InputNumber,
} from "../../NovaX";
import {
    ImgBase64,
    ModulHeader,
    WindowCreateRoom,
    WindowDeleteRoom,
    WindowEditRoom,
    WindowLogIn
} from "../../NovaX-TTRPG";
import WindowInviteSettings from "../Window/WindowRoom/WindowInviteSettings";
import useDebounce from "../Utils/Debounce";

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
    const [pokoje, setPokoje] = useState([]);
    const ladujPokoje = useCallback(async({publiczny = true, page, search}) =>
    {
        try
        {
            const odpowiedz = await fetch(`http://localhost:8086/api/v1/room?status=${publiczny ? 'PUBLIC' : 'PRIVATE'}&page=${page}&name=${search}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userData.token && publiczny === false ? (userData.token) : ''
                }
            });

            if(!odpowiedz.ok)
            {
                // Obróbka błędów
                if(odpowiedz.status === 400)
                {
                    const blad = await odpowiedz.json();
                    console.log(`${blad.message}`);
                }
                else
                {
                    console.log(`Błąd: ${odpowiedz.status}`);
                }
            }
            else
            {
                const dane = await odpowiedz.json();
                setPageMax(dane.totalPages - 1);

                // Przetwarzanie i tworzenie komponentów pokoi
                const zrenderowanePokoje = dane.content.map(room => (
                    <RoomFrame
                        key={room.id}
                        src={ImgBase64(room.imageExtension, room.image)}
                        description={room.description}
                        title={room.name}
                    >
                        {isLogIn === true && (
                            <>
                                {(userData.id === room.ownerId || userData.admin === true) &&
                                    <>
                                        <Button colorNumber={4} onClick={() => togglDeleteRoom(room)}
                                                src={iconTrashCan}/>
                                        <Button colorNumber={5} onClick={() => toggleInvite(room)}
                                                src={iconShare}/>
                                        <Button onClick={() => togglEditRoom(room)} src={iconEdit}/>
                                    </>
                                }
                                <a href={`/Gra?id=${room.id}`}>
                                    <Button src={iconPlay}/>
                                </a>
                            </>
                        )}
                    </RoomFrame>
                ));

                setPokoje(zrenderowanePokoje);
            }
        }
        catch(blad)
        {
            console.log(`Nieoczekiwany błąd: ${blad}`);
        }
    }, [userData.token]); // Zależności useCallback'a

    // Sprawdza logowanie i odświeża dynamiczne elementy po zmianie.
    useEffect(() =>
    {
        const loginData = StorageLoad('loginData');
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
        ladujPokoje({publiczny: !lobby, page: page, search: debouncedSearchTerm});
    }, [lobby, ladujPokoje, showCreateRoom === false, showEditRoom === false, showDeleteRoom === false, showLogIn === false, LogOut, page, debouncedSearchTerm]);

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
                                <InputNumber
                                    valueMin={0}
                                    value={page}
                                    valueMax={pageMax}
                                    onChange={takePage}
                                    width={0}
                                />
                                <Input type={"text"} placeholder={"Szukaj"} width={2} value={search}
                                       onChange={e => setSearch(e.target.value)}/>
                                <Button src={iconAdd} title={"Stwóż Pokój"} width={2} onClick={togglCreateRoom}/>
                            </ArticleTitleOption>
                        )}
                    </ArticleTitle>

                    {pokoje}
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