// Storage Load.
const StorageLoad = (key) =>
{
    try
    {
        const data = localStorage.getItem(key);

        // Return.
        return data ? JSON.parse(data) : null;
    }
    catch(error)
    {
        console.error('Błąd przy odczytywaniu localStorage:', error);

        // Return.
        return null;
    }
};

export default StorageLoad;