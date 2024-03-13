// Header Center.
const HeaderCenter = ({children, className, ...rest}) =>
{
    // Decyduje o wyglądzie.
    let myClass = `HeaderCenter${className ? ' ' + className : ''}`;

    // Return.
    return (
        <div {...rest} className={myClass}>
            {children}
        </div>
    );
}

export default HeaderCenter;