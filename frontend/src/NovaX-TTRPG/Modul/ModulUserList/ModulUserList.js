import {AccountBox} from "../../../NovaX";
import {ImgBase64} from "../../index";

// ModulUserList.
const ModulUserList = ({allUsers, activeUsers}) =>
{
    const sortedUsers = [...allUsers].sort((a, b) => activeUsers.includes(a.id) ? -1 : 1);

    // Sprawdza czy jest aktywny.
    const isActive = (user) =>
    {
        return activeUsers.includes(user.id);
    }

    // Return.
    return (
        <>
            {sortedUsers.map((user, index) => (
                <AccountBox
                    key={user.id}
                    title={user.nickname}
                    active={isActive(user)}
                    src={ImgBase64(user.imageExtension, user.avatar)}
                    marginBottom={(index + 1) % 7 === 0}
                />
            ))}
        </>
    );
};

export default ModulUserList;