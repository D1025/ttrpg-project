import React, {useState} from 'react';
import './InputFile.css';
import {Button} from "../../index";

const InputFile = ({title = 'Wybierz Plik', accept, onChange, ...rest}) =>
{
    // Stan komponentu.
    const [nazwaPliku, ustawNazwePliku] = useState(title);
    const [formatPoprawny, ustawFormatPoprawny] = useState(true);
    const [elementInputuPliku, ustawElementInputuPliku] = useState(null);

    // Obsługa wyboru pliku.
    const obsluzWyborPliku = (event) =>
    {
        const wybranyPlik = event.target.files[0];

        if(wybranyPlik)
        {
            const nazwaWybranegoPliku = wybranyPlik.name;
            const rozszerzeniePliku = `.${nazwaWybranegoPliku.split('.').pop().toLowerCase()}`;

            const akceptowaneFormaty = accept.split(',').map(format => `.${format.split('/').pop()}`);

            if(!akceptowaneFormaty.includes(rozszerzeniePliku))
            {
                ustawNazwePliku('Zły format');
                ustawFormatPoprawny(false);
                event.target.value = '';
                if(onChange)
                {
                    onChange('');
                }
            }
            else
            {
                ustawNazwePliku(nazwaWybranegoPliku);
                ustawFormatPoprawny(true);
                ustawElementInputuPliku(event.target);
                if(onChange)
                {
                    onChange(event);
                }
            }
        }
        else
        {
            ustawNazwePliku('Brak pliku wybranego');
            ustawFormatPoprawny(false);
            if(onChange)
            {
                onChange(event);
            }
        }
    };

    // Usuwanie wybranego pliku.
    const usunWybranyPlik = () =>
    {
        ustawNazwePliku(title);
        ustawFormatPoprawny(true);
        if(elementInputuPliku)
        {
            elementInputuPliku.value = '';
        }
        if(onChange)
        {
            onChange('');
        }
    };

    let klasyInputu = "FileInput";
    let styl = null;

    if(formatPoprawny && nazwaPliku !== title)
    {
        klasyInputu += " FileInput-Active";
        styl = {backgroundImage: "url('./Ikonki/Zaznaczenie.png')", ...rest.style};
    }

    const wyswietlanaNazwaPliku = formatPoprawny && nazwaPliku !== title && nazwaPliku.length > 8
        ? nazwaPliku.slice(0, 8) + "..." : nazwaPliku;

    return (
        <div style={{display: "flex"}}>
            <label className={klasyInputu} style={styl}>
                <input
                    type="file"
                    onChange={obsluzWyborPliku}
                    accept={accept}
                    {...rest}
                />
                <span>{wyswietlanaNazwaPliku}</span>
            </label>
            {formatPoprawny && nazwaPliku !== title && (
                <Button src={"./Ikonki/Kosz.png"} onClick={usunWybranyPlik}/>
            )}
        </div>
    );
};

export default InputFile;
