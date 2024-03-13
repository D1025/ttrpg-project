// Header Right.
const HeaderRight = ({children, className, ...rest}) =>
{
    // Decyduje o wyglądzie.
    let myClass = `HeaderRight${className ? ' ' + className : ''}`;

    // Return.
    return (
        <div {...rest} className={myClass}>
            {children}
        </div>
    )
}

export default HeaderRight;
