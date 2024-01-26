import {StorageLoad} from "../../index";

const StorageFind = (klucz) =>
{
    const dane = StorageLoad(klucz);
    if(dane)
    {
        return true;
    }
    else
    {
        return false;
    }
}

export default StorageFind;