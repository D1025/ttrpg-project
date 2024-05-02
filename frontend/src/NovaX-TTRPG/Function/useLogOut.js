import {storageRemove} from "../../NovaX";
import {useCallback} from "react";
import {WebsiteAdres} from "../index";

// Log Out.
function useLogOut(userData, setIsLogIn, setUserData)
{
    // Return.
    return useCallback(async() =>
    {
        try
        {
            const odpowiedz = await fetch(`${WebsiteAdres}/api/v1/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userData.token
                }
            });

            if(odpowiedz.ok)
            {
                storageRemove('loginData');
                setIsLogIn(false);
                setUserData('');
            }
        }
        catch(blad)
        {
            console.error(`Nieoczekiwany błąd: ${blad}`);
        }
    }, [userData.token, setIsLogIn, setUserData]);
}

export default useLogOut;
