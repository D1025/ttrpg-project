const soket = new WebSocket("ws://adres_serwera_A");


// Obsługa nieoczekiwanej odpowiedzi.
soket.onmessage = (zdarzenie) =>
{
	const dane = JSON.parse(zdarzenie.data);
	console.log("Otrzymano nieoczekiwane dane od serwera:", dane);

	// Tutaj możesz dodać własną obsługę dla tych danych w zależności od ich zawartości
	if(dane.rodzaj === "typ1")
	{
		// Obsługa dla danych typu 1.
		console.log("Otrzymano dane typu 1. Wykonuję akcję 1.");
			// Wykonaj odpowiednią akcję.
	}
	else if(dane.rodzaj === "typ2")
	{
		// Obsługa dla danych typu 2.
		console.log("Otrzymano dane typu 2. Wykonuję akcję 2.");
			// Wykonaj odpowiednią akcję.
	}
	else
	{
		console.log("Nieznany rodzaj danych. Brak obsługi.");
	}
};


// Główna funkcja do wysyłania zapytań o różnych typach metod.
async function websoketZapytanie(soket, metoda, dane)
{
	return new Promise((rozwiąż, odrzuć) =>
	{
		// Identyfikator żądania.
		const identyfikatorZapytania = Math.random().toString(36).substr(2, 9);

		// Obiekt żądania.
		const zapytanie =
		{
			metoda: metoda,
			dane: dane,
			identyfikatorZapytania: identyfikatorZapytania,
		};

		// Nasłuchuchiwanie odpowiedzi.
		soket.onmessage = (zdarzenie) =>
		{
			const odpowiedź = JSON.parse(zdarzenie.data);
			if(odpowiedź.identyfikatorZapytania === identyfikatorZapytania)
			{
				if(odpowiedź.błąd)
				{
					odrzuć(new Error(odpowiedź.błąd));
				}
				else
				{
					rozwiąż(odpowiedź.dane);
				}
			}
		};

		// Wysyłanie żądania.
		soket.send(JSON.stringify(zapytanie));
	});
}


// Przykładowe zapytanie.
async function zapytajOWartosc()
{
	try
	{
		const odpowiedź = await websoketZapytanie(soket, "POST", { klucz: "wartość" });
		console.log("Odpowiedź od serwera:", odpowiedź);
	}
	catch(błąd)
	{
		console.error("Błąd:", błąd);
	}
}
