import './ArticleTitleTag.css';

// Main Title Tag.
const ArticleTitleTag = ({title, className, ...rest}) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        // Dodaje dodatkową klasę przekazaną jako props.
        let classList = [`ArticleTitleTag`];

        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'
    const myClass = classBuilder();

    // Return.
    return (
        <div {...rest} className={myClass}>
            {title}
        </div>
    );
}

export default ArticleTitleTag;