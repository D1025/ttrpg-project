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
    HrSeparator, Label, AccountInformation
} from "../../NovaX";
import './AccountPage.css';

const GamePage = () =>
{
    // Tittle.
    setTittle("./Grafiki/Logo.png", "TTRPG | Konto");
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');

    // Odświeżanie.
    const [odswiez, setOdswiez] = useState(false);
    const wymusOdswiezenie = () =>
    {
        setOdswiez(prev => !prev);
    };


    // Status Zalogowaniay.
    const [isLogIn, ustawIsLogIn] = useState(false); // Czy zalogowany.
    const [daneUzytkownika, ustawDaneUzytkownika] = useState(''); // Dane zalogowanego.

    // Formularz Logowanie/Rejestracja.
    const [showLogin, setShowLogin] = useState(false);
    const toggleShowLogin = () =>
    {
        setShowLogin(prevShowLogin => !prevShowLogin);
        wymusOdswiezenie();
    };

    // Sprawdza logowanie i odświeża dynamiczne elementy po zmianie.
    useEffect(() =>
    {
        const loginData = StorageLoad('loginData');
        // Jeśli dane logowania istnieją.
        if(loginData)
        {
            ustawIsLogIn(true);
            ustawDaneUzytkownika(loginData);
        }
        else
        {
            ustawDaneUzytkownika('');
            ustawIsLogIn(false);
        }
    }, [odswiez]);

    // Załaój pokoje.
    const [pokoje, setPokoje] = useState([]);
    const ladujPokoje = useCallback(async() =>
    {
        try
        {
            // Zapytanie dla publicznych pokoi
            const odpowiedzPubliczne = await fetch('http://localhost:8086/api/v1/room?status=PUBLIC', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': daneUzytkownika.token ? daneUzytkownika.token : ''
                },
            });

            // Zapytanie dla prywatnych pokoi
            const odpowiedzPrywatne = await fetch('http://localhost:8086/api/v1/room?status=PRIVATE', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': daneUzytkownika.token ? daneUzytkownika.token : ''
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

            // Sprawdzenie odpowiedzi dla prywatnych pokoi
            if(!odpowiedzPrywatne.ok)
            {
                // Obróbka błędów
                if(odpowiedzPrywatne.status === 400)
                {
                    const blad = await odpowiedzPrywatne.json();
                    console.log(`${blad.message}`);
                }
                else
                {
                    console.log(`Błąd: ${odpowiedzPrywatne.status}`);
                }
            }

            // Przetwarzanie odpowiedzi dla publicznych pokoi
            const danePubliczne = await odpowiedzPubliczne.json();

            // Przetwarzanie odpowiedzi dla prywatnych pokoi
            const danePrywatne = await odpowiedzPrywatne.json();

            // Połączenie danych
            const zrenderowanePokoje = [...danePubliczne, ...danePrywatne].map(pokoj => (
                pokoj.ownerId === daneUzytkownika.id &&
                <RoomFrame
                    key={pokoj.id}
                    src={pokoj.image && (`data:image/${pokoj.imageExtension};base64,${pokoj.image}`)}
                    description={pokoj.description && pokoj.description}
                    title={pokoj.name && pokoj.name}
                >
                    <span style={{
                        marginRight: 'auto',
                        color: 'var(--Kolor-Oznaczenia)',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                    }}>{pokoj.isPrivate === false ? 'Publiczny' : 'Prywatny'}</span>
                    <Button src={"./Ikonki/Edycja.png"}/>
                    {isLogIn && (
                        <a href={`/Gra?id=${pokoj.id}`}>
                            <Button src={"./Ikonki/Play.png"}/>
                        </a>
                    )}
                </RoomFrame>
            ));

            setPokoje(zrenderowanePokoje);
        }
        catch(blad)
        {
            console.log(`Nieoczekiwany błąd: ${blad}`);
        }
    }, [daneUzytkownika.token, isLogIn]); // Zależności useCallback'a


    // Sprawdza logowanie i odświeża dynamiczne elementy po zmianie.
    useEffect(() =>
    {
        const loginData = StorageLoad('loginData');
        // Jeśli dane logowania istnieją.
        if(loginData)
        {
            ustawIsLogIn(true);
            ustawDaneUzytkownika(loginData);
            ladujPokoje();
        }
        else
        {
            ustawDaneUzytkownika('');
            ustawIsLogIn(false);
        }
    }, [ladujPokoje, showLogin]);

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
                    {/*<Button active={false} src={"./Ikonki/Style.png"}/>*/}
                    {isLogIn === true ? (
                        <Menu2>
                            <li><AccountBar design={1} width={2} title={daneUzytkownika.nickname}
                                            subTitle={daneUzytkownika.admin === true && "[Admin]"}
                                            src={daneUzytkownika.avatar}></AccountBar>
                                <Menu2>
                                    <li>
                                        <a href={"/Konto"}>
                                            <Button title={"Konto"} style={{width: "100%"}}/>
                                        </a>
                                    </li>
                                    {daneUzytkownika.admin === true && (
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
                    <ArticleTitle title={"Konto"}/>

                    <div className={"AccountPageBox"}>
                        <div className={"AccounPagetAvatar"}>
                            <Button src={"./Ikonki/Edycja.png"}/>
                            <div className={"AccounPagetAvatar-Box"}>
                                <img src={""} alt={""}/>
                            </div>
                        </div>
                        <div className={"AccountPageRest"}>
                            <AccountInformation dataType={"Nickname"} data={daneUzytkownika.nickname} canEdit={true}
                                                buttonColorNumber={0} width={4} marginBottom={true}/><br/>
                            <AccountInformation dataType={"E-mail"} data={daneUzytkownika.email} canEdit={true}
                                                buttonColorNumber={0} width={4} marginBottom={true}/><br/>
                            <AccountInformation dataType={"Hasło"} data={'*****'} canEdit={true}
                                                buttonColorNumber={0} width={4} marginBottom={true}/><br/>
                        </div>
                    </div>

                    <HrSeparator title={"Moje Pokoje"}/>
                    {pokoje}

                </MainArticle>
            </Main>
        </>
    );
}

export default GamePage;