import './ChatInput.css';
import {Input} from "../../index";

const ChatInput = ({...rest}) =>
{
    return (
        <>
            <Input className={"ChatInput"} type={"text"} placeholder={"Chat"}/>
        </>
    );
}

export default ChatInput;