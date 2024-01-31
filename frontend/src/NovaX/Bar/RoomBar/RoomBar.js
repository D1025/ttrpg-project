import './RoomBar.css';
import {Button} from "../../index";

const RoomBar = ({src, description, play = "./Ikonki/Play.png", title, ...rest}) =>
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

            <div className={"RoomBar-Option"}>
                <Button src={play}/>
            </div>
        </div>
    );
}

export default RoomBar;