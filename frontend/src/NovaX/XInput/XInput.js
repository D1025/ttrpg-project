import './XInput.css';

const XInput = ({type, placeholder, value, ...rest}) => {
    return <input {...rest} placeholder={placeholder} value={value} type={type} className={"XInput"}/>
}

export default XInput;