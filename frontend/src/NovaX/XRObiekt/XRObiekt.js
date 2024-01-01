import React, {useState, useEffect} from 'react';
import './XRObiekt.css';
import {XPWybor, XPMaly} from "../index";

const XRObiekt = ({children, obraz = "./Ikonki/Tekst.png"}) => {
    const [listaObiektow, ustawListeObiektow] = useState([]);
    const [obecnyIndeks, ustawObecnyIndeks] = useState(0);

    // useEffect.
    useEffect(() => {
        const przetworzoneObiekty= React.Children.map(children, child => child.props);
        ustawListeObiektow(przetworzoneObiekty);
    }, [children]);

    // Następny Index.
    const pokazNastepnyObiekt = () => {
        ustawObecnyIndeks((obecnyIndeks) => (obecnyIndeks + 1) % listaObiektow.length);
    };

    // Poprzedni Index.
    const pokazPoprzedniObiekt = () => {
        ustawObecnyIndeks((obecnyIndeks) => (obecnyIndeks - 1 + listaObiektow.length) % listaObiektow.length);
    };

    // Setuje Index.
    const ustawIndex = (indeks) => {
        ustawObecnyIndeks(indeks);
    };

    // Wypisuje wszystkie elementy z listy.
    const renderWyborZdjec = () => {
        return listaObiektow.map((_, i) => (
            <XPWybor
                key={i}
                onClick={() => ustawIndex(i)}
                obraz={listaObiektow[i].obraz ? listaObiektow[i].obraz : obraz}
                obraz2={listaObiektow[i].obraz && listaObiektow[i].opis ? obraz : null}
                aktywny={obecnyIndeks === i ? true : false}
                styl={1}
            />
        ));
    };

    // Renderuje główny obiekt.
    if (listaObiektow.length === 0) return null;
    return (
        <div className={"XRObiekt"}>
            {listaObiektow[obecnyIndeks].nazwa && (
                <div className={"XRObiekt-Nazwa"}>
                    {listaObiektow[obecnyIndeks].nazwa}
                </div>
            )}
            {(listaObiektow[obecnyIndeks].obraz || listaObiektow[obecnyIndeks].opis) && (
                <div className={"XRObiekt-Opis"}>
                    {listaObiektow[obecnyIndeks].obraz && (
                        <div className={"XRObiekt-Opis-Obraz"}>
                            <img src={listaObiektow[obecnyIndeks].obraz} alt=""/>
                        </div>
                    )}
                    {listaObiektow[obecnyIndeks].opis && (
                        <div className={"XRObiekt-Opis-Opis"}>
                            {listaObiektow[obecnyIndeks].opis}
                        </div>
                    )}
                </div>
            )}
            {listaObiektow.length > 1 && (
                <div className={"XRObiekt-Zdjecia"}>
                    <XPMaly onClick={pokazPoprzedniObiekt} obraz={"./Ikonki/Strzałka_Lewo.png"}/>
                    <div className={"XRObiekt-Zdjecia-Wybor"}>
                        <div>
                            {renderWyborZdjec()}
                        </div>
                    </div>
                    <XPMaly onClick={pokazNastepnyObiekt} obraz={"./Ikonki/Strzałka_Prawo.png"}/>
                </div>
            )}
        </div>
    );
};

export default XRObiekt;
