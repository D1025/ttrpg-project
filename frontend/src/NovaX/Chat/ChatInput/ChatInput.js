import './ChatInput.css';
import {Input} from "../../index";

const ChatInput = ({...rest}) =>
{
    return (
        <Input {...rest} className={"ChatInput"} type={"text"} placeholder={"Chat"}/>
    );
}

export default ChatInput;