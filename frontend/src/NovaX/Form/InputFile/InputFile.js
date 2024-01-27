import React, {useState} from 'react';
import './InputFile.css';

const InputFile = ({accept, onChange, ...rest}) =>
{
    // Statusy.
    const [nazwaPliku, ustawNazwaPliku] = useState('Wybierz Plik');
    const [poprawnyFormat, ustawPoprawnyFormat] = useState(true);

    // Działanie typu = File.
    const czyObrazWybrany = (e) =>
    {
        // Wykonanie zewnętrznych onchange.
        if (onChange)
        {
            onChange(e);
        }

        const wybranyPlik = e.target.files[0];

        if(wybranyPlik)
        {
            const fileName = wybranyPlik.name;
            const fileExtension = `.${fileName.split('.').pop().toLowerCase()}`;

            // Przygotowanie akceptowanych formatów do sprawdzenia.
            const acceptedFormats = accept.split(',').map(format => `.${format.split('/').pop()}`);

            if(!acceptedFormats.includes(fileExtension))
            {
                ustawNazwaPliku('Zły format');
                ustawPoprawnyFormat(false);
            }
            else
            {
                ustawNazwaPliku(fileName);
                ustawPoprawnyFormat(true);
            }
        }
        else
        {
            ustawNazwaPliku('Brak pliku wybranego');
            ustawPoprawnyFormat(false);
        }
    };

    let klasy = "FileInput";
    let style = null;

    // Jeśli wszystko poprawne zmień wygląd.
    if(poprawnyFormat && nazwaPliku !== 'Wybierz Plik')
    {
        klasy += " FileInput-Active";
        style = {backgroundImage: "url('./Ikonki/Zaznaczenie.png')", ...rest.style};
    }

    // Wyświetla nazwę pliku.
    const displayNazwaPliku = poprawnyFormat && nazwaPliku !== 'Wybierz Plik' && nazwaPliku.length > 8
        ? nazwaPliku.slice(0, 8) + "..."
        : nazwaPliku;

    return (
        <label className={klasy} style={style}>
            <input
                type={"file"}
                onChange={czyObrazWybrany}
                accept={accept}
                {...rest}
            />
            <span>{displayNazwaPliku}</span>
        </label>
    );

};

export default InputFile;
