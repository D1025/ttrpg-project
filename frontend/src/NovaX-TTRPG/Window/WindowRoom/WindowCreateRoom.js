import './WindowRoom.css';
import {
    Button,
    Input,
    InputFile,
    Label,
    Window,
    Select,
    storageLoad,
    Textarea,
    iconImage,
    iconClose
} from "../../../NovaX";
import React, {useState} from "react";
import {WebsiteAdres} from "../../index";

const WindowCreateRoom = ({onClose}) =>
{
    // Do Przetwozenia.
    const [nazwa, ustawNazwa] = useState("");
    const [typ, ustawTyp] = useState(false);
    const [opis, ustawOpis] = useState("");
    const [obraz, ustawObraz] = useState("");
    const [obrazRozszezenie, ustawObrazRozszezenie] = useState("");

    // Pobieranie z formulaża.
    const pobierzNazwa = (event) => // Nazwa.
    {
        ustawNazwa(event.target.value);
    };
    const pobierzTyp = (event) => // Typ.
    {
        ustawTyp(event.target.value);
    };
    const pobierzOpis = (event) => // Opis.
    {
        ustawOpis(event.target.value);
    };
    const pobierzObraz = (event) =>
    {
        if(event === '' || !event.target.files[0])
        {
            ustawObraz('');
            ustawObrazRozszezenie('');
            return;
        }

        // Odczytywanie rozszeżenia.
        const file = event.target.files[0];
        const rozszerzeniePliku = file.name.split('.').pop().toLowerCase();

        // Odczytywanie pliku.
        const reader = new FileReader();
        reader.onloadend = () =>
        {
            ustawObraz(reader.result);
            ustawObrazRozszezenie(rozszerzeniePliku);
        };
        reader.readAsDataURL(file);
    };


    // Stwórz lobby.
    const [powiadomienie, ustawPowiadomienie] = useState('');
    const stworzLobby = async(event) =>
    {
        event.preventDefault();
        const loginData = storageLoad('loginData');

        try
        {
            const odpowiedz = await fetch(`${WebsiteAdres}/api/v1/room/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': loginData.token
                },
                body: JSON.stringify({
                    name: nazwa,
                    description: opis,
                    system: 'COHORS_CTHULHU',
                    image: obraz,
                    extension: obrazRozszezenie,
                    isPrivate: typ,
                    ownerId: loginData.id
                })
            });

            // Reagowanie na odpowiedź
            if(!odpowiedz.ok)
            {
                if(odpowiedz.status === 400)
                {
                    const blad = await odpowiedz.json();
                    // Ustawienie powiadomienia o błędzie
                    ustawPowiadomienie(`${blad.message}`);
                }
                else
                {
                    ustawPowiadomienie(`Błąd: ${odpowiedz.status}`);
                }
            }
            else
            {
                // Sukces - obsługa odpowiedzi
                onClose();
            }
        }
        catch(blad)
        {
            console.log(`Nieoczekiwany błąd: ${blad}`);
            ustawPowiadomienie(`Wystąpił błąd: ${blad.message}`);
        }
    };

    return (
        <Window>
            <div className={"WindowCreateRoom"}>

                <form onSubmit={stworzLobby}>
                    <div className={"WindowCreateRoom-Top"}>
                        <div>
                            Tworzenie Pokoju
                        </div>
                        <div>
                            <Button src={iconClose} onClick={onClose} marginLeftRight={false}/>
                        </div>
                    </div>

                    <div className={"WindowCreateRoom-Main"}>

                        <div className={"MCR-Main-Center"}>
                            <div className={"WCR-Main-Flex"}>
                                <div className={"WCR-Main-Flex-Left"}>
                                    <div className={"MCR-Main-Section"}>
                                        <Label marginBottom={true}>Nazwa:</Label><br/>
                                        <Input
                                            type={"text"}
                                            placeholder={"Nazwa"}
                                            required
                                            onChange={pobierzNazwa}
                                            autoFocus={true}
                                        />
                                    </div>

                                    <div className={"MCR-Main-Section"}>
                                        <Label marginBottom={true}>Publiczne:</Label><br/>
                                        <Select title={"Wybierz..."} id={"typ"} value={typ.toString()}
                                                onChange={pobierzTyp} required>
                                            <option value="false">Tak</option>
                                            <option value="true">Nie</option>
                                        </Select>
                                    </div>

                                    <div className={"MCR-Main-Section"}>
                                        <Label marginBottom={true}>Obraz:</Label><br/>
                                        <InputFile onChange={pobierzObraz} title={"Wybierz Obraz"}
                                                   accept={"image/jpeg, image/jpg, image/png, image/gif, image/webp"}/>
                                    </div>
                                </div>
                                {/* Podgląd obrazka. */}
                                <div className={"WCR-Main-Flex-Right"}>
                                    {obraz ?
                                        <img src={obraz} alt={""}/>
                                        :
                                        <div className={"Fake-Img"}>
                                            <img src={iconImage} alt={""}/>
                                        </div>
                                    }
                                </div>
                            </div>
                            <Label marginBottom={true}>Opis:</Label><br/>
                            <Textarea type={"text"} placeholder={"Opis"} onChange={pobierzOpis}/>

                        </div>

                    </div>

                    <div className={"WindowCreateRoom-Bottom"}>
                        <div>
                            <div><Input type={"submit"} value={"Stwórz Pokój"}/></div>
                            {powiadomienie && <div>{powiadomienie}</div>}
                        </div>
                    </div>

                </form>

            </div>
        </Window>
    );
}

export default WindowCreateRoom;