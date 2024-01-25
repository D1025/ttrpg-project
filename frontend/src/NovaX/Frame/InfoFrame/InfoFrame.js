import React, {useState, useEffect} from 'react';
import './InfoFrame.css';
import {ButtonChoice, Button} from "../../index";

const InfoFrame = ({children, srcT = "./Ikonki/Tekst.png", design = 1, ...rest}) =>
{
    const [listaObiektow, ustawListeObiektow] = useState([]);
    const [obecnyIndeks, ustawObecnyIndeks] = useState(0);

    // Dodawanie argumentów do listy.
    useEffect(() =>
    {
        const przetworzoneObiekty = React.Children.map(children, child => child.props)
            .filter(obj => obj.src || obj.tittle || obj.describe || obj.alt1 || obj.alt2); // [Filtr] Eleminuje całkowicei puste elementy.
        ustawListeObiektow(przetworzoneObiekty);
    }, [children]);


    // Następny Index.
    const pokazNastepnyObiekt = () =>
    {
        ustawObecnyIndeks((obecnyIndeks) => (obecnyIndeks + 1) % listaObiektow.length);
    };

    // Poprzedni Index.
    const pokazPoprzedniObiekt = () =>
    {
        ustawObecnyIndeks((obecnyIndeks) => (obecnyIndeks - 1 + listaObiektow.length) % listaObiektow.length);
    };

    // Setuje Index.
    const ustawIndex = (indeks) =>
    {
        ustawObecnyIndeks(indeks);
    };

    // Wypisuje wszystkie elementy z listy.
    const renderWyborZdjec = () =>
    {
        return listaObiektow.map((_, i) => (
            <ButtonChoice
                key={i}
                onClick={() => ustawIndex(i)}
                src={listaObiektow[i].src ? listaObiektow[i].src : srcT}
                alt1={listaObiektow[i].src ? listaObiektow[i].alt1 : null}
                src2={listaObiektow[i].src && listaObiektow[i].describe ? srcT : null}
                alt2={listaObiektow[i].src && listaObiektow[i].describe ? listaObiektow[i].alt2 : null}
                active={obecnyIndeks === i}
                design={design}
            />
        ));
    };

    // Renderuje główny obiekt.
    if(listaObiektow.length === 0) return null;
    return (
        <div {...rest} className={"InfoFrame"}>
            {listaObiektow[obecnyIndeks].title && (
                <div className={"InfoFrame-Name"}>
                    {listaObiektow[obecnyIndeks].title}
                </div>
            )}
            {(listaObiektow[obecnyIndeks].src || listaObiektow[obecnyIndeks].describe) && (
                <div className={"InfoFrame-Describe"}>
                    {listaObiektow[obecnyIndeks].src && (
                        <div className={"InfoFrame-Describe-Img"}>
                            <img src={listaObiektow[obecnyIndeks].src} alt={listaObiektow[obecnyIndeks].alt1}/>
                        </div>
                    )}
                    {listaObiektow[obecnyIndeks].describe && (
                        <div className={"InfoFrame-Describe-Describe"}>
                            {listaObiektow[obecnyIndeks].describe}
                        </div>
                    )}
                </div>
            )}
            {listaObiektow.length > 1 && (
                <div className={"InfoFrame-Img"}>
                    <Button onClick={pokazPoprzedniObiekt} src={"./Ikonki/Strzałka_Lewo.png"}/>
                    <div className={"InfoFrame-Img-Choice"}>
                        <div>
                            {renderWyborZdjec()}
                        </div>
                    </div>
                    <Button onClick={pokazNastepnyObiekt} src={"./Ikonki/Strzałka_Prawo.png"}/>
                </div>
            )}
        </div>
    );
};

export default InfoFrame;
