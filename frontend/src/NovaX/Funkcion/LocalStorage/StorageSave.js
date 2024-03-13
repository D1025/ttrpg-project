const StorageSave = (key, dataJSON) =>
{
    try
    {
        const sformatowanaWartosc = JSON.stringify(dataJSON);
        localStorage.setItem(key, sformatowanaWartosc);
    }
    catch(error)
    {
        console.error('Błąd apisywania do localStorage:', error);
    }
};

export default StorageSave;