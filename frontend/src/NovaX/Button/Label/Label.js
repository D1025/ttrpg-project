import './Label.css'

const Label = ({children, ...rest}) =>
{
    return (
        <label {...rest} className={"Label"}>
            {children}
        </label>
    )
}

export default Label;