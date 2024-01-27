import './ModulCreateRoom.css';
import {Button, Input, InputFile, Label, Modul, Select, StorageLoad, Textarea} from "../../index";
import React, {useState} from "react";

const ModulCreateRoom = ({onClose}) =>
{
    // Do Przetwozenia.
    const [nazwa, ustawNazwa] = useState("");
    const [typ, ustawTyp] = useState("");
    const [opis, ustawOpis] = useState("");
    const [obraz, ustawObraz] = useState("");
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
        const file = event.target.files[0];
        if(file)
        {
            const reader = new FileReader();
            reader.onloadend = () =>
            {
                ustawObraz(reader.result); // Zapisuje obraz jako Base64.
            };
            reader.readAsDataURL(file);
        }
    };


    // Stwórz lobby.
    const [powiadomienie, ustawPowiadomienie] = useState('');
    const stworzLobby = async(event) =>
    {
        event.preventDefault();
        const loginData = StorageLoad('loginData');

        try
        {
            const odpowiedz = await fetch('http://localhost:8086/api/v1/room/create', {
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
        <Modul>
            <div className={"ModulCreateRoom"}>

                <form onSubmit={stworzLobby}>
                    <div className={"ModulCreateRoom-Top"}>
                        <div>
                            Tworzenie Pokoju
                        </div>
                        <div>
                            <Button src={"./Ikonki/Zamknij.png"} onClick={onClose}/>
                        </div>
                    </div>

                    <div className={"ModulCreateRoom-Main"}>

                        <div className={"MCR-Main-Center"}>
                            <div className={"MCR-Main-Flex"}>
                                <div className={"MCR-Main-Flex-Left"}>
                                    <div className={"MCR-Main-Section"}>
                                        <Label design={2}>Nazwa:</Label><br/>
                                        <Input type={"text"} placeholder={"Nazwa"} required
                                               onChange={pobierzNazwa}/>
                                        {/*<img src={obraz} alt={""}/>*/}
                                    </div>

                                    <div className={"MCR-Main-Section"}>
                                        <Label design={2}>Publiczne:</Label><br/>
                                        <Select id="typ" value={typ} onChange={pobierzTyp}>
                                            <option value="" disabled>-</option>
                                            <option value="false">Tak</option>
                                            <option value="true">Nie</option>
                                        </Select>
                                    </div>

                                    <div className={"MCR-Main-Section"}>
                                        <Label design={2}>Obraz:</Label><br/>
                                        <InputFile onChange={pobierzObraz}
                                                   accept={"image/jpeg, image/jpg, image/png, image/gif, image/webp"}/>
                                    </div>
                                </div>
                                {obraz && (
                                    <div className={"MCR-Main-Flex-Right"}>
                                        <img src={obraz} alt={""}/>
                                    </div>
                                )}
                            </div>
                            <Label design={2}>Opis:</Label><br/>
                            <Textarea type={"text"} placeholder={"Opis"} onChange={pobierzOpis}/>

                        </div>

                    </div>

                    <div className={"ModulCreateRoom-Bottom"}>
                        <div>
                            <div><Input type={"submit"} value={"Stwórz Pokój"}/></div>
                            {powiadomienie && <div>{powiadomienie}</div>}
                        </div>
                    </div>

                </form>

            </div>
        </Modul>
    );
}

export default ModulCreateRoom;