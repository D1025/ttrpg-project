import React, {useCallback} from 'react';
import {
    Button,
    AccountBar, iconBan, iconAccount, iconEmail, iconNickname, InfoBarMiddle, InfoBarBig, InfoBar, iconUnBan
} from "../../../NovaX";
import {imgBase64, ServerAdres} from "../../index";

function useLoadAllUsers({
                             isLogIn,
                             setPageMax,
                             setUsers,
                             togglBan,
                             togglAvatar,
                             togglEmail,
                             togglNickname,
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
            const odpowiedz = await fetch(`${ServerAdres}/api/v1/admin/users?page=${page}&name=${search}`, {
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
            const odpowiedzDane = await odpowiedz.json();

            setPageMax(odpowiedzDane.totalPages - 1);

            // Połączenie danych
            const zrenderowanePokoje = odpowiedzDane.content.map(user => (
                <InfoBar
                    key={user.id}
                    design={user.banned === true ? 2 : 0}
                >
                    <InfoBarBig>
                        <AccountBar
                            design={2}
                            title={user.nickname}
                            src={imgBase64(user.imageExtension, user.avatar)}
                            width={0}
                            colorNumber={user.banned === true ? 4 : 0}
                        />
                    </InfoBarBig>

                    {isLogIn === true && <InfoBarMiddle>
                        <Button
                            colorNumber={user.banned === true ? 5 : 4}
                            onClick={() => togglBan(user)}
                            src={user.banned === true ? iconUnBan : iconBan}
                        />
                        <Button
                            colorNumber={0}
                            onClick={() => togglAvatar(user)}
                            src={iconAccount}
                        />
                        <Button
                            colorNumber={0}
                            onClick={() => togglEmail(user)}
                            src={iconEmail}
                        />
                        <Button
                            colorNumber={0}
                            onClick={() => togglNickname(user)}
                            src={iconNickname}
                        />
                    </InfoBarMiddle>}
                </InfoBar>
            ));

            setUsers(zrenderowanePokoje);
        }
        catch(blad)
        {
            console.log(`Nieoczekiwany błąd: ${blad}`);
        }
    }, [userData.token, page, search]);
}

export default useLoadAllUsers;
