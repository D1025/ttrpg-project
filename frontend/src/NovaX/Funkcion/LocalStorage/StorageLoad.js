const StorageLoad = (klucz) =>
{
    try
    {
        const dane = localStorage.getItem(klucz);
        return dane ? JSON.parse(dane) : null;
    }
    catch(blad)
    {
        console.error('Błąd podczas odczytywania z localStorage:', blad);
        return null;
    }
};

export default StorageLoad;