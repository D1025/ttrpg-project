import React, {useState} from 'react';
import './InputNumber.css';
import {Button} from "../../index";

// InputNumber.
const InputNumber = ({
                         serLeftArrow = "Ikonki/Strzałka_Lewo.png",
                         srcRightArrow = "Ikonki/Strzałka_Prawo.png",
                         numberMin = -Infinity,
                         numberMax = Infinity,
                         numberStart = 0,
                         onChange,
                         width = 2,
                         marginBottom = false,
                         marginLeftRight = true,
                         arrows = true,
                         className,
                         ...rest
                     }) =>
{
    // Przechowuje obecną wartość.
    const [number, setNumber] = useState(numberStart);

    // Zmienia liczbę.
    const changeNumber = (newValue) =>
    {
        const clampedValue = Math.min(Math.max(newValue, numberMin), numberMax);
        setNumber(clampedValue);
        if(onChange)
        {
            onChange(clampedValue);
        }
    };

    // Następna liczba.
    const nextNumber = () =>
    {
        const temp = number + 1;
        if(temp <= numberMax)
        {
            changeNumber(temp);
        }
    };

    // Poprzednia liczba.
    const prevNumber = () =>
    {
        const temp = number - 1;
        if(temp >= numberMin)
        {
            changeNumber(temp);
        }
    };

    // Pobiera liczbę.
    const handleInputChange = (e) =>
    {
        const newValue = Number(e.target.value);
        changeNumber(newValue);
    };

    // Class builder.
    const classBuilder = () =>
    {
        let classList = ['InputNumber'];

        if(marginBottom) classList.push('InputNumber-MarginBottom');
        if(width > 0) classList.push(`Width-${width}`);
        if(marginLeftRight) classList.push('InputNumber-MarginLeftRight');
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Gotowe klasy.
    const myClass = classBuilder();

    // Return.
    return (
        <div className={myClass} {...rest}>
            {arrows === true && <Button onClick={prevNumber} src={serLeftArrow}/>}
            <input
                type={"number"}
                value={number}
                onChange={handleInputChange}
            />
            {arrows === true && <Button onClick={nextNumber} src={srcRightArrow}/>}
        </div>
    );
}

export default InputNumber;