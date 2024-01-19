import './RoomBar.css';

const RoomBar = ({src, alt, description, title, ...rest}) =>
{
    return (
        <div {...rest} className={"RoomBar"}>
            <img src={src} alt={alt}/>
            {description}
            {title}
        </div>
    );
}

export default RoomBar;