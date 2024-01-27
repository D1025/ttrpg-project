import './Label.css'

const Label = ({children, design = 1, ...rest}) =>
{
    let klasy = "";
    if(design>0) klasy = "Label-D" + design;

    return (
        <label {...rest} className={klasy}>
            {children}
        </label>
    )
}

export default Label;