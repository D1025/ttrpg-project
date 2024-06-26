import './HrSeparator.css';
import {Hr} from "../../index";

// Hr Separator.
const HrSeparator = ({title, colorNumber = 0, tag = "div", marginBottom = false, className, ...rest}) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['HrSeparator'];

        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'.
    const myClass = classBuilder();

    // Customowy tag.
    const NewTag = tag;

    // Return.
    return (
        <NewTag {...rest} className={myClass}>
            {title && (
                <div>
                    {title}
                </div>
            )}
            <Hr
                colorNumber={colorNumber}
                marginBottom={marginBottom}
            />
        </NewTag>
    );
}

export default HrSeparator;