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
    iconClose, iconImage
} from "../../../NovaX";
import React, {useState} from "react";
import {imgBase64} from "../../index";

const WindowEditRoom = ({onClose, danePokoju}) =>
{
    // Do Przetwozenia.
    const [nazwa, ustawNazwa] = useState(danePokoju.name);
    const [typ, ustawTyp] = useState(danePokoju.isPrivate);
    const [opis, ustawOpis] = useState(danePokoju.description);
    const [obrazRozszezenie, ustawObrazRozszezenie] = useState(danePokoju.imageExtension);
    const [obraz, ustawObraz] = useState(!danePokoju.image ? undefined : imgBase64(obrazRozszezenie, danePokoju.image));

    const reserujDane = () =>
    {
        ustawNazwa(danePokoju.name)
        ustawTyp(danePokoju.isPrivate)
        ustawOpis(danePokoju.description)
        ustawObrazRozszezenie(danePokoju.imageExtension)
        ustawObraz(!danePokoju.image ? undefined : imgBase64(obrazRozszezenie, danePokoju.image))
    }

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


    // Edytuj lobby.
    const [powiadomienie, ustawPowiadomienie] = useState('');
    const stworzLobby = async(event) =>
    {
        event.preventDefault();
        const loginData = storageLoad('loginData');

        try
        {
            const odpowiedz = await fetch('http://localhost:8086/api/v1/room/' + danePokoju.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': loginData.token
                },
                body: JSON.stringify({
                    name: nazwa !== danePokoju.name ? nazwa : undefined,
                    description: opis !== danePokoju.description ? opis : undefined,
                    image: obraz !== imgBase64(obrazRozszezenie, danePokoju.image) ? obraz : undefined,
                    imageExtension: obrazRozszezenie !== danePokoju.imageExtension ? obrazRozszezenie : undefined,
                    isPrivate: typ !== danePokoju.isPrivate ? typ : undefined,
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
                            Edycja: {'"' + (danePokoju.name.length > 10 ? danePokoju.name.substring(0, 10) + '...' : danePokoju.name) + '"'}
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
                                            value={nazwa}
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
                                                onChange={pobierzTyp}
                                                required>
                                            <option value={"false"}>Tak</option>
                                            <option value={"true"}>Nie</option>
                                        </Select>
                                    </div>

                                    <div className={"MCR-Main-Section"}>
                                        <Label marginBottom={true}>Obraz:</Label><br/>
                                        <InputFile title={"Wybierz Obraz"} onChange={pobierzObraz}
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
                            <Textarea value={opis} type={"text"} placeholder={"Opis"} onChange={pobierzOpis}/>

                        </div>

                    </div>

                    <div className={"WindowCreateRoom-Bottom"}>
                        <div>
                            <div>
                                <Button title={"Resetuj"} onClick={reserujDane}/>
                                <Input type={"submit"} value={"Zapisz Zmiany"}/>
                            </div>
                            {powiadomienie && <div>{powiadomienie}</div>}
                        </div>
                    </div>

                </form>

            </div>
        </Window>
    );
}

export default WindowEditRoom;