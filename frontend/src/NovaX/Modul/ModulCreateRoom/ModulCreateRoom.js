import './ModulCreateRoom.css';
import {Button, Input, InputFile, Label, Modul, Select, Textarea} from "../../index";
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
    const pobierzObraz = (event) => // Obraz.
    {
        ustawObraz(event.target.value);
    };

    // Stwórz lobby.
    const stworzLobby = async(event) =>
    {
        event.preventDefault();

        try
        {
            const odpowiedz = await fetch('http://localhost:8086/api/v1/room/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nazwa,
                    description: opis,
                    system: '',
                    image: obraz,
                    isPrivate: typ,
                    ownerId: ''
                })
            });

            //     // Reagowanie na odpowiedź.
            //     if(!odpowiedz.ok)
            //     {
            //         if(odpowiedz.status === 400)
            //         {
            //             const blad = await odpowiedz.json();
            //             ustawPowiadomienie(`${blad.message}`);
            //         }
            //         else
            //         {
            //             ustawPowiadomienie(`Błąd: ${odpowiedz.status}`);
            //         }
            //     }
            //     else
            //     {
            //         // Zapisuje email na przyszłość.
            //         if(checkbox === true)
            //         {
            //             const zapamietajEmail = {
            //                 checkboxChecked: checkbox,
            //                 email: email
            //             };
            //
            //             StorageSave('loginEmail', zapamietajEmail);
            //         }
            //         else
            //         {
            //             StorageRemove('loginEmail');
            //         }
            //
            //         // Zapisuje dane logowania.
            //         const dane = await odpowiedz.json();
            //         StorageSave('loginData', dane);
            //         onClose();
            //     }
        }
        catch(blad)
        {
            console.log(`Nieoczekiwany błąd: ${blad}`);
        }
    };

    return (
        <Modul>
            <div className={"ModulCreateRoom"}>

                <form onSubmit={stworzLobby}>
                    <div>
                        <div className={"ModulCreateRoom-Top"}>
                            <div>
                                Stwórz Pokój
                            </div>
                            <div>
                                <Button src={"./Ikonki/Zamknij.png"} onClick={onClose}/>
                            </div>
                        </div>

                        <div className={"ModulCreateRoom-Main"}>
                            <div>
                                <div>
                                    <Label design={2}>Nazwa:</Label><br/>
                                    <Input type={"text"} placeholder={"Nazwa"} required onChange={pobierzNazwa}/>
                                </div>
                                <div>
                                    <Label design={2}>Publiczne:</Label><br/>
                                    <Select id="typ" value={typ} onChange={pobierzTyp}>
                                        <option value="" disabled>-</option>
                                        <option value="false">Tak</option>
                                        <option value="true">Nie</option>
                                    </Select>
                                </div>
                                <div>
                                    <Label design={2}>Obraz:</Label><br/>
                                    <InputFile onChange={pobierzObraz}
                                               accept={"image/jpeg, image/jpg, image/png, image/gif, image/webp"}/>
                                </div>
                                <div>
                                    <Label design={2}>Opis:</Label><br/>
                                    <Textarea type={"text"} placeholder={"Opis"} onChange={pobierzOpis}/>
                                </div>
                            </div>
                        </div>

                        <div className={"ModulCreateRoom-Bottom"}>
                            <Input type={"submit"} value={"Stwórz Pokój"}/>
                        </div>
                    </div>
                </form>

            </div>
        </Modul>
    );
}

export default ModulCreateRoom;