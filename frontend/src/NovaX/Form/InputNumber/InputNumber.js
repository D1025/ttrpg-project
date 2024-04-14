import React, {useState, useEffect} from 'react';
import './InputNumber.css';
import {Button, iconArrowLeft, iconArrowRight} from "../../index";

const InputNumber = ({
                         srcLeftArrow = iconArrowLeft,
                         srcRightArrow = iconArrowRight,
                         valueMin = -Infinity,
                         valueMax = Infinity,
                         valueInLoop = false,
                         value = valueMin !== -Infinity && valueMin < valueMax ? valueMin : 0,
                         onChange,
                         width = 2,
                         marginBottom = false,
                         marginLeftRight = true,
                         marginTop = false,
                         colorNumber = 0,
                         buttonLeftActive = true,
                         buttonRightActive = true,
                         buttonShow = true,
                         active = true,
                         className,
                         ...rest
                     }) =>
{
    // Zażądzanie wartością [value].
    const [myValue, setMyValue] = useState(value);

    // Synchronizacja wewnętrznego z zewnętrznym stanem.
    useEffect(() =>
    {
        if(value !== undefined)
        {
            setMyValue(value);
        }
    }, [value]);

    // Aktualizacja wartości.
    const updateValue = (newValue) =>
    {
        let clampedValue;
        if(valueInLoop)
        {
            if(newValue > valueMax)
            {
                clampedValue = valueMin;
            }
            else if(newValue < valueMin)
            {
                clampedValue = valueMax;
            }
            else
            {
                clampedValue = newValue;
            }
        }
        else
        {
            clampedValue = Math.max(Math.min(newValue, valueMax), valueMin);
        }

        // Tworzenie eventu.
        const event = {
            target: {
                value: clampedValue,
                type: 'change'
            },
            type: 'change'
        };

        if(onChange)
        {
            onChange(event);
        }
        else
        {
            setMyValue(clampedValue);
        }
    };

    // Aktualizacja wartości.
    const handleInputChange = (e) =>
    {
        updateValue(Number(e.target.value));
    };

    // Aktualizacja wartości.
    const increment = () => updateValue(myValue + 1);
    const decrement = () => updateValue(myValue - 1);

    // Sprawdzanie aktywności przycisków.
    // Użytkownik nie wyłączył przycisku.
    // Jest opcia loop z przedziałamiw [nie wyłączy].
    // Jest opcia loop ale bez przedziałów [wyłączy].
    // Jeśli przycisk jest wyłączony [wyłączony].
    const compartment = (valueMin !== -Infinity) && (valueMax !== Infinity); // Czy istniej przedziały.
    const isLoop = compartment && valueInLoop; // Czy jest zapętlony.

    const isDecrementActive = active && buttonLeftActive && (isLoop || (myValue > valueMin));
    const isIncrementActive = active && buttonRightActive && (isLoop || (myValue < valueMax));


    // Class builder [Dla całeo komponentu].
    const classBuilder = () =>
    {
        let classList = ['InputNumber'];

        if(width > 0) classList.push(`Width-${width}`);
        if(marginLeftRight) classList.push('MarginLeftRight');
        if(marginBottom) classList.push('MarginBottom');
        if(marginTop) classList.push('MarginTop');
        if(active === false) classList.push('InputNumber-noActive');
        if(className) classList.push(className);

        return classList.join(' ');
    };
    const myClass = classBuilder();

    // Class builder [Dla Input'a].
    const classBuilder_2 = () =>
    {
        let classList = [];

        if(colorNumber > 0 && active === true) classList.push(`BorderColor-${colorNumber}`);

        return classList.join(' ');
    };
    const myClass_2 = classBuilder_2();

    return (
        <div className={myClass} {...rest}>
            {buttonShow && <Button
                onClick={decrement}
                src={srcLeftArrow}
                marginLeftRight={true}
                active={isDecrementActive}
                colorNumber={colorNumber}
            />}
            <input
                type={"number"}
                value={myValue}
                onChange={handleInputChange}
                min={valueMin}
                max={valueMax}
                className={myClass_2}
            />
            {buttonShow && <Button
                onClick={increment}
                src={srcRightArrow}
                marginLeftRight={true}
                active={isIncrementActive}
                colorNumber={colorNumber}
            />}
        </div>
    );
};

export default InputNumber;
