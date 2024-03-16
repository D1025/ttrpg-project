import './HrSeparator.css';
import {Hr} from "../../index";

// Hr Separator.
const HrSeparator = ({title, tag = "div", desing = 1, className, ...rest}) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['HrSeparator'];

        // Dodawanie dodatkowej klasy przekazanej jako props.
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
            <Hr design={desing}/>
        </NewTag>
    );
}

export default HrSeparator;