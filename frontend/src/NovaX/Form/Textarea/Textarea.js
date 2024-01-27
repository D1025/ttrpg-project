import './Textarea.css';

const Textarea = ({...rest}) =>
{
    return (
        <textarea {...rest} className={"Textarea"}/>
    );
}

export default Textarea;