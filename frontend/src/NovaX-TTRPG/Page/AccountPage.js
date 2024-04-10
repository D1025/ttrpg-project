import {useCallback, useEffect, useState} from "react";
import {
    Menu2,
    Header,
    HeaderRight,
    Button,
    AccountBar,
    StorageLoad,
    setTittle,
    Main,
    MainArticle,
    ArticleTitle,
    ButtonLogo,
    HeaderLeft,
    HeaderCenter,
    RoomFrame,
    HrSeparator, AccountInformation, iconTrashCan, iconSettings, iconPlay, iconEdit
} from "../../NovaX";
import './AccountPage.css';
import {
    WindowDeleteRoom,
    WindowAccountNickname,
    WindowEditRoom,
    WindowAccountEmail,
    WindowAccountAvatar, ImgBase64
} from "../index";

const GamePage = () =>
{
    // Tittle.
    setTittle("./Grafiki/Logo.png", "TTRPG | Konto");

    // Status Zalogowaniay.
    const [isLogIn, setIsLogIn] = useState(false); // Czy zalogowany.
    const [userData, setLogInData] = useState(''); // Dane zalogowanego.

    // Formularz Logowanie/Rejestracja.
    const [showLogin, setShowLogin] = useState(false);
    const toggleShowLogin = () =>
    {
        setShowLogin(prevShowLogin => !prevShowLogin);
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
            const zrenderowanePokoje = danePubliczne.map(pokoj => (
                pokoj.ownerId === userData.id &&
                <RoomFrame
                    key={pokoj.id}
                    src={pokoj.image && (`data:image/${pokoj.imageExtension};base64,${pokoj.image}`)}
                    description={pokoj.description && pokoj.description}
                    title={pokoj.name && pokoj.name}
                >
                    <span style={{
                        marginRight: '0.5vw',
                        color: 'var(--Kolor-Oznaczenia)',
                        fontSize: '0.86rem',
                        fontWeight: 'bold'
                    }}>{pokoj.isPrivate === false ? 'Publiczny' : 'Prywatny'}</span>
                    {isLogIn && (
                        <>
                            <Button colorNumber={4} onClick={() => togglDeleteRoom(pokoj)} src={iconTrashCan}/>
                            <Button onClick={() => togglEditRoom(pokoj)} src={iconSettings}/>
                            <a href={`/Gra?id=${pokoj.id}`}>
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


    // Sprawdza logowanie i odświeża dynamiczne elementy po zmianie.
    useEffect(() =>
    {
        const LoadLogInData = StorageLoad('loginData')
        // Jeśli dane logowania istnieją.
        if(LoadLogInData)
        {
            setIsLogIn(true);
            setLogInData(LoadLogInData);
            ladujPokoje();
        }
        else
        {
            setLogInData('');
            setIsLogIn(false);
        }
    }, [ladujPokoje, showEditRoom === false, showDeleteRoom === false, showAccountNickname === false, showAccountEmail === false, showAccountAvatar === false, showLogin]);

    return (
        <>
            {/* Nagłłówek Strony. */}
            <Header design={2}>
                <HeaderLeft>
                    <ButtonLogo title={"TTRPG"} src={"./Grafiki/Logo.png"} href={"/"}/>
                </HeaderLeft>
                <HeaderCenter>
                    <Menu2 tag="nav">
                        <li>
                            <a href={"/"}>
                                <Button title={"Pokoje"} width={2}/>
                            </a>
                        </li>
                        <li>
                            <a href={""}>
                                <Button title={"O Nas"} width={2}/>
                            </a>
                            <Menu2>
                                <li>
                                    <a href={""}>
                                        <Button title={"Wiadomości"} style={{width: "100%"}}/>
                                    </a>
                                </li>
                                <li>
                                    <a href={""}>
                                        <Button title={"Regulamin"} style={{width: "100%"}}/>
                                    </a>
                                </li>
                            </Menu2>
                        </li>
                    </Menu2>
                </HeaderCenter>

                {/* Prawy nagłówek z opcjami. */}
                <HeaderRight>
                    {isLogIn === true ? (
                        <Menu2>
                            <li><AccountBar design={1} width={2} title={userData.nickname}
                                            subTitle={userData.admin === true && "[Admin]"}
                                            src={ImgBase64(userData.imageExtension, userData.avatar)}></AccountBar>
                                <Menu2>
                                    <li>
                                        <a href={"/Konto"}>
                                            <Button title={"Konto"} style={{width: "100%"}}/>
                                        </a>
                                    </li>
                                    {userData.admin === true && (
                                        <li>
                                            <a href={"/Panel"}>
                                                <Button title={"Panel"} style={{width: "100%"}}/>
                                            </a>
                                        </li>)}
                                    <li>
                                        <a href={"/"}>
                                            <Button title={"Wyjdź"} style={{width: "100%"}}/>
                                        </a>
                                    </li>
                                </Menu2>
                            </li>
                        </Menu2>
                    ) : (
                        <Button title={"Zaloguj Się"} src={"./Ikonki/Konto.png"}
                                onClick={toggleShowLogin} width={1}/>
                    )}
                </HeaderRight>
            </Header>

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
                            <AccountInformation dataType={"Nickname"} data={userData.nickname} canEdit={true}
                                                buttonColorNumber={0} width={4} marginBottom={true}
                                                onClick={togglAccountNickname}/><br/>
                            <AccountInformation dataType={"E-mail"} data={userData.email} canEdit={true}
                                                buttonColorNumber={0} width={4} marginBottom={true}
                                                onClick={togglAccountEmail}/><br/>
                            <AccountInformation dataType={"Hasło"} data={'*****'} canEdit={true} buttonColorNumber={0}
                                                width={4} marginBottom={true}/><br/>
                        </div>
                    </div>

                    <HrSeparator title={"Moje Pokoje"}/>
                    {pokoje}

                </MainArticle>
            </Main>
            {showEditRoom && <WindowEditRoom danePokoju={edytowanyPokoj} onClose={togglEditRoom}/>}
            {showDeleteRoom && <WindowDeleteRoom danePokoju={edytowanyPokoj} onClose={togglDeleteRoom}/>}
            {showAccountNickname && <WindowAccountNickname userData={userData} onClose={togglAccountNickname}/>}
            {showAccountEmail && <WindowAccountEmail userData={userData} onClose={togglAccountEmail}/>}
            {showAccountAvatar && <WindowAccountAvatar userData={userData} onClose={togglAccountAvatar}/>}
        </>
    );
}

export default GamePage;