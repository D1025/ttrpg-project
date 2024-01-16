const XHeaderLeft = ({children, ...rest}) =>
{
    return (
        <div {...rest} className={"XHeaderLeft"}>
            {children}
        </div>
    );
}

export default XHeaderLeft;