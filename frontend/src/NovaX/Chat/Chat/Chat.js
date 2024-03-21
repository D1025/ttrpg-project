import React from 'react';
import './Chat.css';
import {Input} from "../../index";

// Chat.
const Chat = ({children, className, value, onChange, onKeyDown, inputPlaceholder, ...rest}) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['Chat'];

        // Tworzenie listy klas.
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'.
    const myClass = classBuilder();

    // Return.
    return (
        <div className={"Chat-Box"}>
            <div {...rest.rest} className={myClass}>
                <div>
                    {children}
                </div>
            </div>

            <Input {...rest.events}
                   value={value}
                   onKeyDown={onKeyDown}
                   onChange={onChange}
                   className={"ChatInput"}
                   type={"text"}
                   placeholder={inputPlaceholder}/>
        </div>
    );
}

export default Chat;