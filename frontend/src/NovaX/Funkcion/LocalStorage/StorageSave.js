const StorageSave = (klucz, wartosc) =>
{
    try
    {
        const sformatowanaWartosc = JSON.stringify(wartosc);
        localStorage.setItem(klucz, sformatowanaWartosc);
    }
    catch(blad)
    {
        console.error('Błąd podczas zapisywania do localStorage:', blad);
    }
};

export default StorageSave;