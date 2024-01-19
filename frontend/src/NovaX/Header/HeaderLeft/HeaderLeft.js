const HeaderLeft = ({children, ...rest}) =>
{
    return (
        <div {...rest} className={"HeaderLeft"}>
            {children}
        </div>
    );
}

export default HeaderLeft;