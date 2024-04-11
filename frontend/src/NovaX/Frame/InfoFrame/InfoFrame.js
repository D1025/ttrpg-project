import React, {useState, useEffect} from 'react';
import './InfoFrame.css';
import {ButtonChoice, Button, iconText, iconArrowLeft, iconArrowRight} from "../../index";

// Info Frame.
const InfoFrame = ({
                       children,
                       srcText = iconText,
                       srcLeftArrow = iconArrowLeft,
                       srcRightArrow = iconArrowRight,
                       design = 1,
                       className,
                       ...rest
                   }) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['InfoFrame'];

        // Dodawanie dodatkowej klasy przekazanej jako props.
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'.
    const myClass = classBuilder();

    // Statusy.
    const [obiects, setObjects] = useState([]);
    const [index, setIndex] = useState(0);

    // Dodawanie argumentów do listy.
    useEffect(() =>
    {
        const readObjects = React.Children.map(children, child => child.props)
            .filter(temp => temp.src || temp.tittle || temp.describe || temp.alt1 || temp.alt2); // [Filtr] Eleminuje całkowicei puste elementy.
        setObjects(readObjects);
    }, [children]);


    // Następny Index.
    const ShowNext = () =>
    {
        setIndex((index + 1) % obiects.length);
    };

    // Poprzedni Index.
    const ShowPrev = () =>
    {
        setIndex((index - 1 + obiects.length) % obiects.length);
    };

    // Setuje Index.
    const SteIndex = (index) =>
    {
        setIndex(index);
    };

    // Renderuje wbór obrazków.
    const imageChoice = () =>
    {
        return obiects.map((_, i) => (
            <ButtonChoice
                key={i}
                onClick={() => SteIndex(i)}
                src={obiects[i].src ? obiects[i].src : srcText}
                alt1={obiects[i].src ? obiects[i].alt1 : null}
                src2={obiects[i].src && obiects[i].describe ? srcText : null}
                alt2={obiects[i].src && obiects[i].describe ? obiects[i].alt2 : null}
                active={index === i}
                design={design}
            />
        ));
    };

    // Jeśli puste cic nie rendreuj.
    if(obiects.length === 0) return null;

    // Return.
    return (
        <div {...rest} className={myClass}>
            {obiects[index].title && (
                <div className={"InfoFrame-Name"}>
                    {obiects[index].title}
                </div>
            )}
            {(obiects[index].src || obiects[index].describe) && (
                <div className={"InfoFrame-Describe"}>
                    {obiects[index].src && (
                        <div className={"InfoFrame-Describe-Img"}>
                            <img src={obiects[index].src} alt={obiects[index].alt1}/>
                        </div>
                    )}
                    {obiects[index].describe && (
                        <div className={"InfoFrame-Describe-Describe"}>
                            {obiects[index].describe}
                        </div>
                    )}
                </div>
            )}
            {obiects.length > 1 && (
                <div className={"InfoFrame-Img"}>
                    <Button onClick={ShowPrev} src={srcLeftArrow}/>

                    <div className={"InfoFrame-Img-Choice"}>
                        <div>
                            {imageChoice()}
                        </div>
                    </div>

                    <Button onClick={ShowNext} src={srcRightArrow}/>
                </div>
            )}
        </div>
    );
};

export default InfoFrame;
