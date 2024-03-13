import './Window.css';

// Window.
const Window = ({children, src, ...rest}) =>
{
    // Dodaje obrazek po prawej stronie.
    let myStyle = {
        ...(src ? {backgroundImage: `linear-gradient(to right, var(--Motyw-Ciemny), transparent 190%), url("${src}")`, ...rest.style} : {})
    };

    // Return.
    return (
        <div {...rest} className={"Window"} style={myStyle}>
            {children}
        </div>
    );
}

export default Window;