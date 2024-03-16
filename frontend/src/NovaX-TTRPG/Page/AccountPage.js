import {useCallback, useEffect, useState} from "react";
import {
    Menu2,
    Header, HeaderRight,
    Button, AccountBar,
    StorageLoad, setTittle, Main, MainArticle, MainPanel, ArticleTitle, ButtonLogo, HeaderLeft, HeaderCenter, RoomFrame,
} from "../../NovaX";
import {ModulChat} from "../../NovaX-TTRPG";
import HrSpearator from "../../NovaX/Hr/HrSpearator/HrSpearator";

const GamePage = () =>
{
    // Tittle.
    setTittle("./Grafiki/Logo.png", "TTRPG | Gra");
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
    const [lobby, ustawLobby] = useState(false);
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
                <RoomFrame
                    key={pokoj.id}
                    src={pokoj.image && (`data:image/${pokoj.imageExtension};base64,${pokoj.image}`)}
                    description={pokoj.description && pokoj.description}
                    title={pokoj.name && pokoj.name}
                >
                    <span style={{marginRight:'auto', color:'var(--Kolor-Oznaczenia)', fontSize:'0.9rem', fontWeight:'bold'}}>{pokoj.isPrivate === false ? 'Publiczny' : 'Prywatny'}</span>
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
        }
        else
        {
            ustawDaneUzytkownika('');
            ustawIsLogIn(false);
        }
        ladujPokoje();
    }, [lobby, ladujPokoje, showLogin]);

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
                                        <Button title={"Wiadomości"} style={{width:"100%"}}/>
                                    </a>
                                </li>
                                <li>
                                    <a href={""}>
                                        <Button title={"Regulamin"} style={{width:"100%"}}/>
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
                                            userTitle={daneUzytkownika.admin === true && "[Admin]"}
                                            src={daneUzytkownika.avatar}></AccountBar>
                                <Menu2>
                                    <li>
                                        <a href={"/Konto"}>
                                            <Button active={false} title={"Konto"} style={{width: "100%"}}/>
                                        </a>
                                    </li>
                                    {daneUzytkownika.admin === true && (
                                        <li>
                                            <a href={"/Panel"}>
                                                <Button active={false} title={"Panel"} style={{width: "100%"}}/>
                                            </a>
                                        </li>)}
                                    <li>
                                        <a href={"/"}>
                                            <Button active={false} title={"Wyjdź"} style={{width: "100%"}}/>
                                        </a>
                                    </li>
                                </Menu2>
                            </li>
                        </Menu2>
                    ) : (
                        <Button active={false} title={"Zaloguj Się"} src={"./Ikonki/Konto.png"}
                                onClick={toggleShowLogin} width={1}/>
                    )}
                </HeaderRight>
            </Header>

            <Main design={1}>
                <MainArticle>
                    <ArticleTitle title={"Konto"}/>
                    Edycja Konta
                    <HrSpearator title={"Pokoje"}/>

                    {pokoje}

                </MainArticle>
            </Main>
        </>
    );
}

export default GamePage;