import {AccountBox} from "../../../NovaX";

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
            {sortedUsers.map(user => (
                <AccountBox key={user.id} title={user.nickname} active={isActive(user)} src={user.img}/>
            ))}
        </>
    );
};

export default ModulUserList;