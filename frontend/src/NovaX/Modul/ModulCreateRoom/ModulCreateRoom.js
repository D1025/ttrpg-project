import './ModulCreateRoom.css';
import {Button, Input, Label, Modul, Select, Textarea} from "../../index";
import React, {useState} from "react";

const ModulCreateRoom = ({onClose}) =>
{
    // Do Select.
    const [select, ustawSelect] = useState("");
    const zmienSelect = (event) =>
    {
        ustawSelect(event.target.value);
    };

    // Do Przetwozenia.

    return (
        <Modul>
            <div className={"ModulCreateRoom"}>

                <form>{/*onSubmit={przeslijLogowanie}*/}
                    <div>
                        <div className={"ModulCreateRoom-Top"}>
                            <Button src={"./Ikonki/Zamknij.png"} onClick={onClose}/>
                        </div>

                        <div className={"ModulCreateRoom-Main"}>
                            <div>
                                <div className={"Small"}>
                                    <Label design={2}>Nazwa:</Label><br/>
                                    <Input type={"text"} placeholder={"Nazwa"} required/><br/>
                                </div>
                                <div className={"Small"}>
                                    <Label design={2}>Publiczne:</Label><br/>
                                    <Select id="typ" value={select} onChange={zmienSelect}>
                                        <option value="" disabled>-</option>
                                        <option value="false">Tak</option>
                                        <option value="true">Nie</option>
                                    </Select>
                                </div>
                                <div>
                                    <Label design={2}>Opis:</Label><br/>
                                    <Textarea type={"text"} placeholder={"Opis"} required/>
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