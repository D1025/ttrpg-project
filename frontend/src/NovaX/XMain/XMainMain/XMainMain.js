const XMainMain = ({children, ...rest}) =>
{
    return (
        <div {...rest} className={"XMainMain"}>
            {children}
        </div>
    );
}

export default XMainMain;