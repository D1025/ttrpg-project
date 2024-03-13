import {StorageSave} from "../../../index";

// LogIn Save.
const LogInSave = (dataJSON) =>
{
    StorageSave("LogInData", dataJSON)
};

export default LogInSave;