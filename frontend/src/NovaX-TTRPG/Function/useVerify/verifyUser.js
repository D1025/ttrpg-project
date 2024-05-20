import {
    ServerAdres,
    WebsiteAdres
} from "../../index";

const verifyUser = async(userData) =>
{
    try
    {
        const response = await fetch(`${ServerAdres}/api/v1/auth/verify`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userData.token,
            }
        });

        if(!response.ok)
        {
            console.log('Network response was not ok');
        }

        const result = await response.json();
        if(response.status === 403)
        {
            window.location.href = `${WebsiteAdres}/Zbanowany`;
        }
    }
    catch(error)
    {
        console.error('Verification failed:', error);
    }
}

export default verifyUser;
