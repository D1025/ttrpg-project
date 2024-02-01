import {useEffect, useState} from "react";
import {
    Menu2,
    Header, HeaderRight,
    Button, ButtonAccount,
    StorageLoad, setTittle,
    Chat, ChatInput, ChatMessage
} from "../../NovaX";

const Game = () =>
{
    // Tittle.
    setTittle("./Grafiki/Logo.png", "TTRPG | Gra");

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

    return (
        <>
            {/* Nagłłówek Strony. */}
            <Header design={2} src={"./Grafiki/TłoDodatkowe/TOPanime.jpg"}>
                {/* Prawy nagłówek z opcjami. */}
                <HeaderRight>
                    {/*<Button active={false} src={"./Ikonki/Style.png"}/>*/}
                    {isLogIn === true ? (
                        <Menu2>
                            <li><ButtonAccount design={1} width={2} title={daneUzytkownika.nickname}
                                               userTitle={daneUzytkownika.admin === true && "[Admin]"}
                                               src={daneUzytkownika.avatar}></ButtonAccount>
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

            {/* ChatBox. */}
            <Chat>
                <ChatMessage title={"Xeno"} src={daneUzytkownika.avatar} text={"Siema"} design={1}/>
                <ChatMessage title={"Patric"} src={""} text={"Elo"} design={1}/>
                <ChatMessage title={"Patric"} src={""} text={"Wyrzuca 12 oczeek"} design={2}/>
            </Chat>
            <ChatInput/>
        </>
    );
}

export default Game;