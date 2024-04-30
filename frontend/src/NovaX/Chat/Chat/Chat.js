import React, {useEffect, useState} from 'react';
import './Chat.css';
import {Button, iconSend, Input} from "../../index";

// Chat.
const Chat = ({children, className, value = '', onChange, onClick, onKeyDown, inputPlaceholder, ...rest}) =>
{
    // Prywatna wenętrzna wartość.
    const [myValue, setMyValue] = useState(value);
    const takeValue = (event) =>
    {
        setMyValue(event.target.value)
        if(onChange)
        {
            onChange(event);
        }
    }

    // Efekt aktualizujący myValue.
    useEffect(() =>
    {
        setMyValue(value)
    }, [value]);

    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['Chat'];

        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Return.
    return (
        <div {...rest} className={"Chat-Box"}>
            <div className={classBuilder()}>
                <div>
                    {children}
                </div>
            </div>

            <div className={"ChatInput"}>
                <Input {...rest.events}
                       value={myValue}
                       onKeyDown={onKeyDown}
                       onChange={takeValue}
                       type={"text"}
                       placeholder={inputPlaceholder}
                       marginLeftRight={false}
                />
                <Button onClick={onClick} src={iconSend} active={myValue !== ''} marginLeftRight={false}/>
            </div>
        </div>
    );
}

export default Chat;