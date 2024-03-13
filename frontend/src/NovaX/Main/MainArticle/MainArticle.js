// Main Rticle.
const MainArticle = ({children, className, ...rest}) =>
{
    // Decyduje o wyglądzie.
    let myClass = `MainArticle${className ? ` ${className}` : ''}`;

    // Return.
    return (
        <article {...rest} className={myClass}>
            {children}
        </article>
    );
}

export default MainArticle;