const HeaderCenter = ({children, ...rest}) =>
{
    return (
        <div {...rest} className={"HeaderCenter"}>
            {children}
        </div>
    );
}

export default HeaderCenter;