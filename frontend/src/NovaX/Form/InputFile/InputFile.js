import React, {useRef, useState} from 'react';
import './InputFile.css';
import {Button, iconCheckMark2, iconTrashCan, shortString} from "../../index";

// Input File.
const InputFile = ({
                       title = 'Wybierz Plik',
                       titleLength = 10,
                       srcTrashCan = iconTrashCan,
                       buttonColorNumber = 4,
                       srcChecked = iconCheckMark2,
                       alt = "",
                       accept,
                       onChange,
                       marginBottom = false,
                       marginLeftRight = true,
                       marginTop = false,
                       width = 2,
                       active = true,
                       colorNumber = 0,
                       className,
                       ...rest
                   }) =>
{
    // Zmienne.
    const [fileName, setFileName] = useState(title);
    const [correctFileExtension, setCorrectFileExtension] = useState(true);
    const fileInputRef = useRef(null);

    // Sprawdzanie pliku.
    const validateFile = (event) =>
    {
        const file = event.target.files[0];
        if(!file)
        {
            setFileName('Brak pliku wybranego');
            setCorrectFileExtension(false);
            onChange && onChange('');
            return;
        }

        const fileName = file.name;
        const fileExtension = fileName.split('.').pop().toLowerCase();
        const isFormatAccepted = accept ? accept.split(',').some(format => format.includes(fileExtension)) : true;

        if(!isFormatAccepted)
        {
            setFileName('Zły format');
            setCorrectFileExtension(false);
            event.target.value = '';
            onChange && onChange('');
        }
        else
        {
            setFileName(fileName);
            setCorrectFileExtension(true);
            onChange && onChange(event);
        }
    };

    // Usuwanie pliku.
    const removeFile = () =>
    {
        setFileName(title);
        setCorrectFileExtension(true);
        fileInputRef.current.value = '';
        onChange && onChange('');
    };

    // Obsługa klawiatóry.
    const handleKeyDown = (event) =>
    {
        if(event.keyCode === 32 || event.keyCode === 13)
        {
            event.preventDefault();
            fileInputRef.current.click();
        }
    };

    // Class Builder [Dla Pola].
    const classBuilder_Box = () =>
    {
        let classes = ['InputFile'];
        if(width > 0) classes.push(`Width-${width}`);
        if(marginLeftRight) classes.push('MarginLeftRight');
        if(marginBottom) classes.push('MarginBottom');
        if(marginTop) classes.push('MarginTop');
        if(className) classes.push(className);
        return classes.join(' ');
    };

    // Class Builder [Dla Przycisku].
    const classBuilder = () =>
    {
        let classes = ['newInputFile'];
        if(correctFileExtension && fileName !== title) classes.push('newInputFile-Active');
        if(!active) classes.push('newInputFile-noActive');
        if(colorNumber > 0) classes.push(`BackgroundColor-${colorNumber}`);

        return classes.join(' ');
    };

    // Skrócona nazwa.
    const displayFileName = correctFileExtension && fileName !== title && fileName.length > titleLength ? shortString(fileName, titleLength) : fileName;

    // Return.
    return (
        <div className={classBuilder_Box()}>
            <label className={classBuilder()} onKeyDown={handleKeyDown} tabIndex={0}>
                <input
                    ref={fileInputRef}
                    type={"file"}
                    onChange={validateFile}
                    accept={accept}
                    {...rest}
                    tabIndex={-1}
                />
                <span>{displayFileName}</span>
                {correctFileExtension && fileName !== title &&
                    <div>
                        <img src={srcChecked} alt={alt}/>
                    </div>}
            </label>
            {(correctFileExtension && fileName !== title) &&
                <Button
                    src={srcTrashCan}
                    onClick={removeFile}
                    colorNumber={buttonColorNumber}
                    active={true}
                    marginLeftRight={false}
                />}
        </div>);
};

export default InputFile;
