const XMainArticle = ({children, ...rest}) =>
{
    return (
        <article {...rest} className={"XMainArticle"}>
            {children}
        </article>
    );
}

export default XMainArticle;