import bcrypt from 'bcryptjs';

async function LogIn(server, method, email, password, rememberMe)
{
    try
    {
        // Haszowanie hasła.
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        // Plik JASON.
        const requestData = {
            email: email,
            password: hashedPassword,
            rememberMe: rememberMe
        };

        // Wysłanie danych [Fetch API].
        const response = await fetch(server, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        // Sprawdzenie, czy odpowiedź od serwera jest w formacie JSON.
        if(response.ok)
        {
            const responseData = await response.json();

            // Sprawdzanie czy pole succes ma odp. true.
            if(responseData.success)
            {
                // Zapisanie danych logowania w bezpiecznym miejscu (np. Context API, Local Storage, itp.)
                // Tutaj umieść kod do zapisania danych logowania w bezpiecznym miejscu
            }
            else
            {
                console.error('Logowanie nieudane. Błędne dane.');
            }
        }
        else
        {
            console.error('Błąd podczas wysyłania danych na serwer.');
        }
    }
    catch(error)
    {
        console.error('Wystąpił błąd:', error);
    }
}

export default LogIn;