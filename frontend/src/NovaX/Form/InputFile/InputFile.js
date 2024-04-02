import React, {useState} from 'react';
import './InputFile.css';
import {Button, iconCheckMark2, iconTrashCan} from "../../index";

// Input File.
const InputFile = ({
                       title = 'Wybierz Plik',
                       srcTrashCan = iconTrashCan,
                       buttonColorNumber = 4,
                       srcChecked = iconCheckMark2,
                       accept,
                       onChange,
                       marginBottom = false,
                       marginLeftRight = true,
                       width = 2,
                       className,
                       ...rest
                   }) =>
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

            // Domyślnie akceptuj wszystko, jeśli nie podano `accept`
            const akceptujeWszystko = !accept;
            let akceptowanyFormat = true; // Zakładamy, że format jest akceptowany

            if(!akceptujeWszystko)
            {
                const akceptowaneFormaty = accept.split(',').map(format => `.${format.split('/').pop()}`);
                akceptowanyFormat = akceptowaneFormaty.includes(rozszerzeniePliku);
            }

            if(!akceptowanyFormat)
            {
                ustawNazwePliku('Zły format');
                ustawFormatPoprawny(false);
                event.target.value = ''; // Resetuj pole wyboru pliku
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


    // Decyduje o wyglądzie [Boxa trzymającego].
    const classBuilderBox = () =>
    {
        let classList = ['InputFile-Box'];

        // Dodawanie klasy na podstawie wartości.
        if(marginBottom === true) classList.push('InputFile-MarginBottom');
        if(width > 0) classList.push(`Width-${width}`);
        if(marginLeftRight === true) classList.push('InputFile-MarginLeftRight');
        if(className) classList.push(className);

        return classList.join(' ');
    };
    // Przypisanie listy klas w postaci 'String'.
    const myClassBox = classBuilderBox();


    // Decyduje o wyglądzie [Środka].
    const classBuilder = () =>
    {
        let classList = ['InputFile'];

        // Dodawanie klasy na podstawie wartości.
        if(formatPoprawny && nazwaPliku !== title) classList.push('InputFile-Active');

        return classList.join(' ');
    };
    // Przypisanie listy klas w postaci 'String'.
    const myClass = classBuilder();
    let myStyle = {...rest.style};
    if(formatPoprawny && nazwaPliku !== title)
    {
        myStyle = {backgroundImage: `url('${srcChecked}')`, ...rest.style};
    }

    let skrocone = 6; // Mówi o ile skrócić tekst.
    const wyswietlanaNazwaPliku = formatPoprawny && nazwaPliku !== title && nazwaPliku.length > skrocone ? nazwaPliku.slice(0, skrocone) + "..." : nazwaPliku; // Skraca tekst.


    // Return.
    return (
        <div className={myClassBox}>
            <label className={myClass} style={myStyle}>
                <input
                    type={"file"}
                    onChange={obsluzWyborPliku}
                    accept={accept}
                    {...rest}
                />
                <span>{wyswietlanaNazwaPliku}</span>
            </label>
            {formatPoprawny && nazwaPliku !== title && (
                <Button src={srcTrashCan} onClick={usunWybranyPlik} colorNumber={buttonColorNumber} active={true}/>
            )}
        </div>
    );
};

export default InputFile;
