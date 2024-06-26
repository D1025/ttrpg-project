import './ChatMessage.css';

const ChatMessage = ({title, design = 1, src, alt = "", text, timestamp, className, ...rest}) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['ChatMessage'];

        if(design > 0) classList.push(`ChatMessage-D${design}`);
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'.
    const myClass = classBuilder();

    if(design === 1)
    {
        return (
            <div {...rest} className={myClass}>
                <div className={"ChatMessage-Timestamp"}>
                    {timestamp}
                </div>

                <div className={"ChatMessage-Message"}>
                    <div>
                        <div className={"ChatMessage-Avatar"}>
                            {src && <img src={src} alt={alt}/>}
                        </div>
                    </div>
                    <div>
                        <div className={"ChatMessage-NickName"}>
                            {title}
                        </div>
                        <div className={"ChatMessage-Text"}>
                            {text}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else if(design === 2)
    {
        return (
            <div {...rest} className={myClass}>
                <div className={"ChatMessage-Timestamp"}>
                {timestamp}
                </div>

                <div className={"ChatMessage-Message"}>
                    <div className={"ChatMessage-Text"}>
                        {text}
                    </div>
                </div>
            </div>
        );
    }
    else if(design === 3)
    {
        return (
            <div  {...rest} className={myClass}>
                <div className={"ChatMessage-Timestamp"}>
                    {timestamp}
                </div>

                <div className={"ChatMessage-Message"}>
                    <div className={"ChatMessage-NickName"}>
                        {title + ": "}
                    </div>
                    <div className={"ChatMessage-Text"}>
                        {text}
                    </div>
                </div>
            </div>
        );
    }
    else
    {
        return null;
    }
}

export default ChatMessage;