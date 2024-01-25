const MainPanel = ({children, title, ...rest}) =>
{
    return (
        <div {...rest} className={"MainPanel"}>
            {title && (
                <div className={"MainPanel-Title"}>
                    {title}
                </div>
            )}
            {children}
        </div>
    );
}

export default MainPanel;