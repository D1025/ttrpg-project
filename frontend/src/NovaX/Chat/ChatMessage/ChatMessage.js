import './ChatMessage.css';

const ChatMessage = ({title, design = 1, src, text, timestamp, ...rest}) =>
{
    let klasy;
    if(design > 0) klasy = "ChatMessage-D" + design;

    return (
        <div {...rest} className={klasy}>
            {design===1 && (
                <div className={"ChatText-Avatar"}>
                    {src && <img src={src} alt={""}/>}
                </div>
            )}

            <div className={"ChatText-NickName"}>
                {design === 1 ? title + ": " : title}
            </div>

            <div className={"ChatText-Message"}>
                {text}
            </div>
            {/*TODO: Zrób tu timestampa*/}
            <div className={"ChatText-Timestamp"}>
                {timestamp}
            </div>
        </div>
    );
}

export default ChatMessage;