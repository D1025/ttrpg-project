const XMainPanel = ({children, title, ...rest}) =>
{
    return (
        <div {...rest} className={"XMainPanel"}>
            {title && (
                <div className={"XMainPanel-Title"}>
                    {title}
                </div>
            )}
            {children}
        </div>
    );
}

export default XMainPanel;