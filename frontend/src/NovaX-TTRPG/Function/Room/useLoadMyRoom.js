import React, {useCallback} from 'react';
import {
    RoomFrame,
    Button,
    iconTrashCan,
    iconShare,
    iconEdit,
    iconPlay
} from "../../../NovaX";
import {imgBase64} from "../../index";
import {ServerAdres} from "../../index";

function useLoadMyRoom({
                           isLogIn,
                           setPageMax,
                           setRooms,
                           togglDeleteRoom,
                           toggleInviteRoom,
                           togglEditRoom,
                           userData,
                           // Dynamicznie zmieniające się.
                           page = 0,
                           search = "",
                       })
{
    return useCallback(async() =>
    {
        try
        {
            // Zapytanie dla publicznych pokoi
            const odpowiedz = await fetch(`${ServerAdres}/api/v1/room/my?page=${page}&name=${search}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userData.token
                }
            });

            // Sprawdzenie odpowiedzi dla pokoi.
            if(!odpowiedz.ok)
            {
                // Obróbka błędów
                if(odpowiedz.status === 400)
                {
                    const blad = await odpowiedz.json();
                    console.log(`${blad.message}`);
                }
                else
                {
                    console.log(`Błąd: ${odpowiedz.status}`);
                }
            }

            // Przetwarzanie odpowiedzi dla publicznych pokoi
            const danePubliczne = await odpowiedz.json();

            setPageMax(danePubliczne.totalPages - 1);

            // Połączenie danych
            const zrenderowanePokoje = danePubliczne.content.map(room => (
                room.ownerId === userData.id &&
                <RoomFrame
                    key={room.id}
                    src={imgBase64(room.imageExtension, room.image)}
                    description={room.description}
                    title={room.name}
                >
                    <span style={{
                        marginRight: '0.5vw',
                        color: 'var(--Kolor-Oznaczenia)',
                        fontSize: '0.86rem',
                        fontWeight: 'bold'
                    }}>
                        {room.isPrivate === false ? 'Publiczny' : 'Prywatny'}
                    </span>
                    {isLogIn && (
                        <>
                            <Button
                                colorNumber={4}
                                onClick={() => togglDeleteRoom(room)}
                                src={iconTrashCan}
                            />
                            <Button
                                colorNumber={5}
                                onClick={() => toggleInviteRoom(room)}
                                src={iconShare}
                            />
                            <Button
                                onClick={() => togglEditRoom(room)} src={iconEdit}
                            />
                            <Button
                                src={iconPlay}
                                href={`/Gra?id=${room.id}`}
                            />
                        </>
                    )}
                </RoomFrame>
            ));

            setRooms(zrenderowanePokoje);
        }
        catch(blad)
        {
            console.log(`Nieoczekiwany błąd: ${blad}`);
        }
    }, [userData.token, isLogIn, page]); // Zależności useCallback'a
}

export default useLoadMyRoom;
