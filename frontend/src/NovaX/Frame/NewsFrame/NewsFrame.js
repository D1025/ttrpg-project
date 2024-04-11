import './NewsFrame.css';
import {Hr} from "../../index";

// News Frame.
const NewsFrame = ({title, data, className, src, alt, description, ...rest}) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['NewsFrame'];

        // Dodawanie dodatkowej klasy przekazanej jako props.
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'.
    const myClass = classBuilder();

    // Return.
    return (
        <div {...rest} className={myClass}>
            {src && (
                <div className={"NewsFrame-Left"}>
                    <img src={src} alt={alt}/>
                </div>
            )}

            <div className={"NewsFrame-Right"}>
                <div>
                    <div>
                        {title}
                    </div>
                    <div>
                        {data}
                    </div>
                </div>
                <Hr marginBottom={true}/>
                <div>
                    {description}
                </div>
            </div>

        </div>
    );
}

export default NewsFrame;