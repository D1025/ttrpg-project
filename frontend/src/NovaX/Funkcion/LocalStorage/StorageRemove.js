// Storage Remove.
const StorageRemove = (key) =>
{
    try
    {
        localStorage.removeItem(key);
    }
    catch(error)
    {
        console.error('Błąd przy usuwaniu z localStorage:', error);
    }
};

export default StorageRemove;