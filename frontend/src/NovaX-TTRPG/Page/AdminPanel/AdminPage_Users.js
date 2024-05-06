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
    ArticleTitleOption
} from "../../../NovaX";
import {
    ModulHeader,
    useDebounce,
    useLogOut,
    WebsiteLogo,
    WebsiteName,
    useLoadAllUsers,
    WindowAccountNickname,
    WindowAccountEmail,
    WindowAccountAvatar,
    WindowAccountBan
} from "../../index";

const AdminPage_Users = () =>
{
    // Tittle.
    setTittle(WebsiteLogo, `${WebsiteName} | Pokoje`);

    // Status Zalogowaniay.
    const [isLogIn, setIsLogIn] = useState(false); // Czy zalogowany.
    const [userData, setUserData] = useState(''); // Dane zalogowanego.
    // Wylogowywanie.
    const LogOut = useLogOut(userData, setIsLogIn, setUserData);

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

    // Formularz.
    const [choiceUser, setChoiceUser] = useState("");
    const [showBan, setShowBan] = useState(false);
    const togglBan = (choiceRoom) =>
    {
        if(!showBan)
        {
            // Dodanie nasłuchiwania na klawisz Esc.
            const handleEscape = (event) =>
            {
                if(event.key === 'Escape')
                {
                    setShowBan(false);
                    document.removeEventListener('keydown', handleEscape);
                }
            };

            document.addEventListener('keydown', handleEscape);
        }
        setChoiceUser(choiceRoom);
        setShowBan(!showBan);
    };
    // Edycja Avatarra.
    const [showAvatar, setShowAvatar] = useState();
    const togglAvatar = (user) =>
    {
        setShowAvatar(!showAvatar);
        setChoiceUser(user)
    }
    // Edyzcja Emaila.
    const [showEmail, setShowEmail] = useState()
    const togglEmail = (user) =>
    {
        setShowEmail(!showEmail);
        setChoiceUser(user)
    }
    // Edycja Nazwy
    const [showNickname, setShowNickname] = useState()
    const togglNickname = (user) =>
    {
        setShowNickname(!showNickname);
        setChoiceUser(user)
    }

    // Załaój pokoje.
    const [users, setUsers] = useState([]);
    const LoadRooms = useLoadAllUsers({
        isLogIn: isLogIn,
        page: page,
        setPageMax: setPageMax,
        setUsers: setUsers,
        togglBan: togglBan,
        togglAvatar: togglAvatar,
        togglEmail: togglEmail,
        togglNickname: togglNickname,
        search: search,
        userData: userData
    });

    // Sprawdza logowanie i odświeża dynamiczne elementy po zmianie.
    useEffect(() =>
    {
        const loginData = storageLoad('loginData');
        // Jeśli dane logowania istnieją.
        if(loginData)
        {
            setIsLogIn(true);
            setUserData(loginData);
            LoadRooms({
                isLogIn: isLogIn,
                page: page,
                setPageMax: setPageMax,
                setUsers: setUsers,
                togglBan: togglBan,
                togglAvatar: togglAvatar,
                togglEmail: togglEmail,
                togglNickname: togglNickname,
                search: search,
                userData: userData
            });
        }
        else
        {
            setIsLogIn(false);
            setUserData('');
            window.location.href = '/';
        }
    }, [LoadRooms, showBan === false, showAvatar === false, showEmail === false, showNickname === false, LogOut, page, debouncedSearchTerm]);

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
                    <ArticleTitle title={"Lista Użytkowników"} tag={"h2"}>
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
                            <Input
                                type={"text"}
                                placeholder={"Szukaj"}
                                width={2}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </ArticleTitleOption>
                    </ArticleTitle>
                    {users}
                </MainArticle>
            </Main>

            {showBan && <WindowAccountBan
                userData={choiceUser}
                userAuthorization={userData}
                banned={choiceUser.banned}
                onClose={togglBan}
            />}
            {showNickname && <WindowAccountNickname //TODO.
                userData={choiceUser}
                userAuthorization={userData}
                onClose={togglNickname}
            />}
            {showEmail && <WindowAccountEmail //TODO.
                userData={choiceUser}
                userAuthorization={userData}
                onClose={togglEmail}
            />}
            {showAvatar && <WindowAccountAvatar //TODO.
                userData={choiceUser}
                userAuthorization={userData}
                onClose={togglAvatar}
            />}
        </>
    );
}

export default AdminPage_Users;