import './RoomFrame.css';

// Room Frame.
const RoomFrame = ({children, src, description, title, design = 1, className, ...rest}) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['RoomFrame'];

        // Dodawanie dodatkowej klasy przekazanej jako props.
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'.
    const myClass = classBuilder();

    // Dodaje obrazek po prawej stronie.
    let myStyle = {
        ...(src ? {backgroundImage: `linear-gradient(to right, var(--Motyw-Ciemny), transparent 190%), url("${src}")`, ...rest.style} : {})
    };

    // Return.
    return (
        <div {...rest} className={myClass} style={myStyle}>
            <div className={"RoomFrame-Main"}>
                {title && (
                    <div className={"RoomFrame-Title"}>
                        {title}
                    </div>
                )}

                {description && (
                    <div className={"RoomFrame-Description"}>
                        {description}
                    </div>
                )}
            </div>

            <div className={"RoomFrame-Option"}>
                {children}
            </div>

        </div>
    );
}

export default RoomFrame;