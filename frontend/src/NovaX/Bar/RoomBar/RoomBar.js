import './RoomBar.css';
import {Button} from "../../index";

const RoomBar = ({children, src, description, title, ...rest}) =>
{
    let style = src ? {backgroundImage: `linear-gradient(to right, var(--Motyw-Ciemny), transparent 190%), url("${src}")`, ...rest.style} : null;

    return (
        <div {...rest} className={"RoomBar"} style={style}>
            <div className={"RoomBar-Main"}>
                {title && (
                    <div className={"RoomBar-Title"}>
                        {title}
                    </div>
                )}

                {description && (
                    <div className={"RoomBar-Description"}>
                        {description}
                    </div>
                )}
            </div>

            {children && (
                <div className={"RoomBar-Option"}>
                    {children}
                </div>
            )}
        </div>
    );
}

export default RoomBar;