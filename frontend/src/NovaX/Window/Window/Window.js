import './Window.css';

// Window.
const Window = ({children, ...rest}) =>
{
    // Return.
    return (
        <div {...rest} className={"Window"}>
            {children}
        </div>
    );
}

export default Window;