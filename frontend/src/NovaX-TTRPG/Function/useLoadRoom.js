import React, {useCallback} from 'react';
import {
    RoomFrame,
    Button,
    iconTrashCan,
    iconShare,
    iconEdit,
    iconPlay
} from "../../NovaX";
import {imgBase64} from "../../NovaX-TTRPG";
import {websiteAdres} from "../index";

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
                         page,
                         search,
                     })
{
    return useCallback(async () =>
    {
        try
        {
            const odpowiedz = await fetch(`${websiteAdres}/api/v1/room?status=${isPublic ? 'PUBLIC' : 'PRIVATE'}&page=${page}&name=${search}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userData.token && !isPublic ? userData.token : ''
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
                                        <Button colorNumber={4} onClick={() => togglDeleteRoom(room)}
                                                src={iconTrashCan}/>
                                        <Button colorNumber={5} onClick={() => toggleInviteRoom(room)}
                                                src={iconShare}/>
                                        <Button onClick={() => togglEditRoom(room)} src={iconEdit}/>
                                    </>
                                )}
                                <a href={`/Gra?id=${room.id}`}>
                                    <Button src={iconPlay}/>
                                </a>
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
