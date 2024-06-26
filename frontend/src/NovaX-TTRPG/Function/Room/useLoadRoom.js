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

function useLoadRoom({
                         isLogIn,
                         setPageMax,
                         setRooms,
                         togglDeleteRoom,
                         toggleInviteRoom,
                         togglEditRoom,
                         userData,
                         // Dynamicznie zmieniające się.
                         isPublic,
                         page = 0,
                         search = "",
                     })
{
    return useCallback(async() =>
    {
        try
        {
            const odpowiedz = await fetch(`${ServerAdres}/api/v1/room?status=${isPublic === true ? 'PUBLIC' : 'PRIVATE'}&page=${page}&name=${search}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userData.token && isPublic === false ? userData.token : ''
                }
            });

            if(!odpowiedz.ok)
            {
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
            else
            {
                const dane = await odpowiedz.json();
                setPageMax(dane.totalPages - 1);
                const renderedRooms = dane.content.map(room => (
                    <RoomFrame
                        key={room.id}
                        src={imgBase64(room.imageExtension, room.image)}
                        description={room.description}
                        title={room.name}
                    >
                        {isLogIn && (
                            <>
                                {(userData.id === room.ownerId || userData.admin) && (
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
                                            onClick={() => togglEditRoom(room)}
                                            src={iconEdit}
                                        />
                                    </>
                                )}
                                <Button
                                    src={iconPlay}
                                    href={`/Gra?id=${room.id}`}
                                />
                            </>
                        )}
                    </RoomFrame>
                ));
                setRooms(renderedRooms);
            }
        }
        catch(blad)
        {
            console.log(`Nieoczekiwany błąd: ${blad}`);
        }
    }, [userData.token, isPublic, page, search]);
}

export default useLoadRoom;
