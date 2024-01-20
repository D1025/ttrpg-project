async function LogIn(server, method, email, hashedPassword, rememberMe)
{
    try
    {
        const requestData = {
            email: email,
            password: hashedPassword,
            rememberMe: rememberMe
        };

        const response = await fetch(server, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if(!response.ok)
        {
            // Jeśli odpowiedź nie jest ok, rzuć błąd
            throw new Error('Błąd serwera.');
        }
        const responseData = await response.json();

        if(responseData.success)
        {
            // Jeśli logowanie się powiodło, zwróć dane
            return responseData;
        }
        else
        {
            // Jeśli logowanie się nie powiodło, rzuć błąd
            throw new Error('Błędne dane logowania.');
        }

    }
    catch(error)
    {
        console.error('Wystąpił błąd:', error.message);
        throw error;
    }
}

export default LogIn;
