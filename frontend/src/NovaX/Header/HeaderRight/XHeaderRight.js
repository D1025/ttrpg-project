const XHeaderRight = ({children, ...rest}) =>
{
    return (
        <div {...rest} className={"HeaderRight"}>
            {children}
        </div>
    );
}

export default XHeaderRight;