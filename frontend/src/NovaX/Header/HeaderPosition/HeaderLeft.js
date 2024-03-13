// Headre Left.
const HeaderLeft = ({children, className, ...rest}) =>
{
    // Decyduje o wyglądzie.
    let myClass = `HeaderLeft${className ? ' ' + className : ''}`;

    // Return.
    return (
        <div {...rest} className={myClass}>
            {children}
        </div>
    );
}

export default HeaderLeft;