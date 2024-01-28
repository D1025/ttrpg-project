const StorageRemove = (klucz) =>
{
    try
    {
        localStorage.removeItem(klucz);
    }
    catch(blad)
    {
        console.error('Błąd podczas usuwania z localStorage:', blad);
    }
};

export default StorageRemove;