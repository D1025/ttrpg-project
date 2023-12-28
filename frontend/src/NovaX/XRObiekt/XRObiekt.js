import React, {useState, useEffect} from 'react';
import './XRObiekt.css';
import {XPWybor, XPMaly} from "../index";

const XRObiekt = ({children, style}) =>
{
    // Getery setery.
    const [listaObiektow, ustawListeObiektow] = useState([]);
    const [obecnyIndeks, ustawObecnyIndeks] = useState(0);

    // Bezpośrednie przypisanie propów do listy.
    useEffect(() =>
    {
        const przetworzoneObiekty = React.Children.map(children, child => child.props);
        ustawListeObiektow(przetworzoneObiekty);
    }, [children]);

    // Funckja.
    const pokazNastepnyObiekt = () =>
    {
        ustawObecnyIndeks((obecnyIndeks) => (obecnyIndeks + 1) % listaObiektow.length);
    };

    // Funckja.
    const pokazPoprzedniObiekt = () =>
    {
        ustawObecnyIndeks((obecnyIndeks) => (obecnyIndeks - 1 + listaObiektow.length) % listaObiektow.length);
    };

    // Funckja.
    const ustawIndex = (indeks) =>
    {
        ustawObecnyIndeks(indeks);
    };

    return (
        <>
            {/* Sprawdza czy ma co renderować. */}
            {listaObiektow.length > 0 && (
                <div className={"XRObiekt"} style={style}>
                    <div className={"XRObiekt-Nazwa"}>
                        {listaObiektow[obecnyIndeks].nazwa}
                    </div>
                    <div className={"XRObiekt-Opis"}>
                        {/* Sprawdza czy ma renderować obraz. */}
                        {listaObiektow[obecnyIndeks].obraz !== "" && (
                            <div className={"XRObiekt-Opis-Obraz"}>
                                <img src={listaObiektow[obecnyIndeks].obraz} alt=""/>
                            </div>
                        )}
                        {/* Sprawdza czy ma renderować opis. */}
                        {listaObiektow[obecnyIndeks].opis !== "" && (
                            < div className={"XRObiekt-Opis-Opis"}>
                                {listaObiektow[obecnyIndeks].opis}
                            </div>
                        )}
                    </div>
                    {/* Sprawdza czy ma renderować pole zmiany zdjęcia i strzałki. */}
                    {listaObiektow.length > 1 && (
                        <div className={"XRObiekt-Zdjecia"}>
                            {/* Generuje strzałki. */}
                            <XPMaly onClick={pokazPoprzedniObiekt} obraz={"./Ikonki/Strzałka_Lewo.png"}/>

                            <div className={"XRObiekt-Zdjecia-Wybor"}>
                                <div>
                                    {/* Wypisuje przyciski do zmiany obecnej zawartości z ramki. */}
                                    {listaObiektow.map((_, i) => (
                                        <XPWybor key={i} onClick={() => ustawIndex(i)} obraz={listaObiektow[i].obraz !== "" ? listaObiektow[i].obraz : './Ikonki/Tekst.png'} aktywny={obecnyIndeks === i && true} />
                                    ))}
                                </div>
                            </div>

                            {/* Generuje strzałki. */}
                            <XPMaly onClick={pokazNastepnyObiekt} obraz={"./Ikonki/Strzałka_Prawo.png"}/>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default XRObiekt;