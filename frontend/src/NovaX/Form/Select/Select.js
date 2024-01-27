import './Select.css';

const Select = ({children, ...rest}) =>
{
    return (
        <select {...rest} className={"Select"}>
            {children}
        </select>
    );
}

export default Select;