const ActiveUsersList = ({allUsers, activeUsers}) => {
    const standardAvatar = "https://www.gravatar.com/avatar/";
    const sortedUsers = [...allUsers].sort((a, b) => activeUsers.includes(a.id) ? -1 : 1);


    const checkColorForActiveUser = (user) => {
        if (activeUsers.includes(user.id)) {
            return "green";
        }
        return "red";
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            padding: 10,
        }}>
            {sortedUsers.map(user => (
                <div key={user.id} style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                }}>
                    <div>
                        <div style={{
                            display: "inline-block",
                            position: "relative",
                            paddingRight: 10
                        }}>
                            <img style={{
                                width: 80,
                                height: 80,
                                borderRadius: "10%"
                            }}
                                 src={user.img || standardAvatar} alt={"cos"}/>
                            <div style={{
                                backgroundColor: checkColorForActiveUser(user),
                                position: "absolute",
                                top: 59,
                                left: 59,
                                zIndex: 1,
                                padding: 10,
                                border: "1px solid white",
                                borderRadius: 12,
                            }}>
                                <i></i>
                            </div>
                        </div>
                    </div>
                    <span className={"user-nickname"}>{user.nickname}</span>
                </div>
            ))}
        </div>
    );
};

export default ActiveUsersList;