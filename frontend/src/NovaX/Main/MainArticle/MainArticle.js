const MainArticle = ({children, ...rest}) =>
{
    return (
        <article {...rest} className={"MainArticle"}>
            {children}
        </article>
    );
}

export default MainArticle;