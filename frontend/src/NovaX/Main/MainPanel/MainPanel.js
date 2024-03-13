// Main Panel.
const MainPanel = ({children, className, title, ...rest}) =>
{
    // Decyduje o wyglądzie.
    let myClass = `MainPanel${className ? ` ${className}` : ''}`;

    // Returm.
    return (
        <div {...rest} className={myClass}>
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