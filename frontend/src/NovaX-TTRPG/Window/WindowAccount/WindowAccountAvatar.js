import './WindowAccount.css';
import {
    Button,
    Input,
    Window,
    iconClose,
    storageSave, InputFile
} from "../../../NovaX";
import React, {useState} from 'react';
import Cropper from 'react-easy-crop';

const WindowAccountAvatar = ({onClose, userData}) =>
{
    // Do Przetwozenia.
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState(null);

    const [newAvatar, setNewAvatar] = useState('');
    const [avatarExtension, setAvatarExtension] = useState('jpeg');

    // Pobieranie z formulaża.
    const takeAvatar = (event) => // Avatar.
    {
        if(event === '' || !event.target.files[0])
        {
            setNewAvatar('');
            setAvatarExtension('');
            return;
        }

        // Odczytywanie rozszeżenia.
        const file = event.target.files[0];
        const rozszerzeniePliku = file.name.split('.').pop().toLowerCase();

        // Odczytywanie pliku.
        const reader = new FileReader();
        reader.onloadend = () =>
        {
            setNewAvatar(reader.result);
            setAvatarExtension(rozszerzeniePliku);
        };
        reader.readAsDataURL(file);
    };

    const getCroppedImg = async () => {
        if (!croppedArea || !newAvatar) {
            console.error('Brak danych przycięcia lub avatara');
            return;
        }

        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = newAvatar;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                const scaleX = image.naturalWidth / image.width;
                const scaleY = image.naturalHeight / image.height;
                canvas.width = croppedArea.width;
                canvas.height = croppedArea.height;
                const ctx = canvas.getContext('2d');

                ctx.drawImage(
                    image,
                    croppedArea.x * scaleX,
                    croppedArea.y * scaleY,
                    croppedArea.width * scaleX,
                    croppedArea.height * scaleY,
                    0,
                    0,
                    croppedArea.width,
                    croppedArea.height
                );

                resolve(canvas.toDataURL('image/jpeg'));
            };
            image.onerror = () => {
                reject(new Error('Image load error'));
            };
        });
    };


    // Edytuj dane użytkownika.
    const [powiadomienie, ustawPowiadomienie] = useState('');
    const stworzLobby = async(event) =>
    {
        event.preventDefault();

        const croppedImageURL = await getCroppedImg();
        if(!croppedImageURL)
        {
            console.error('Nie udało się przyciąć obrazu');
            return;
        }

        try
        {
            const odpowiedz = await fetch('http://localhost:8086/api/v1/users/' + userData.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userData.token
                },
                body: JSON.stringify({
                    avatar: croppedImageURL,
                    avatarExtension: avatarExtension,
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
                const data = await odpowiedz.json();
                storageSave("loginData", data)
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
                            Zmiana avatara
                        </div>
                        <div>
                            <Button src={iconClose} onClick={onClose} marginLeftRight={false}/>
                        </div>
                    </div>

                    <div className={"WindowCreateRoom-Main"}>
                        <div>
                            <div className="Account-Avatar-Podglad">
                                {newAvatar && (
                                    <Cropper
                                        image={newAvatar}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={1}
                                        onCropChange={setCrop}
                                        onZoomChange={setZoom}
                                        onCropComplete={(croppedArea, croppedAreaPixels) =>
                                        {
                                            setCroppedArea(croppedAreaPixels);
                                        }}
                                        style={{
                                            containerStyle: {
                                                width: '28vw',
                                                height: '100%',
                                                backgroundColor: 'var(--Motyw)',
                                                cursor: 'default',
                                                position: 'relative'
                                            }
                                        }}
                                    />
                                )}
                            </div>

                        </div>
                    </div>

                    <div className={"WindowCreateRoom-Bottom"}>
                        <div>
                            <div>
                                {/*<InputFile onChange={takeAvatar} title={"Wybierz Plik"} marginBottom={true}/><br/>*/}
                                <InputFile onChange={takeAvatar} title={"Wybierz Plik"}/>
                                <Input type={"submit"} value={"Zapisz"}/>
                            </div>
                            {powiadomienie && <div>{powiadomienie}</div>}
                        </div>
                    </div>

                </form>

            </div>
        </Window>
    );
}

export default WindowAccountAvatar;