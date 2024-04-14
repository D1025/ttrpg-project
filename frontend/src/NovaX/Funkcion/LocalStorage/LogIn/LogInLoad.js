import {StorageLoad} from "../../../index";

// LogIn Load.
const LogInLoad = () =>
{
    const loginData = StorageLoad("LogInData");

    // Return.
    return loginData ? loginData : undefined;
}

export default LogInLoad;