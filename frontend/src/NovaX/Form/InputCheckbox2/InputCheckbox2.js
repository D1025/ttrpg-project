import React, {useState, useEffect} from 'react';
import './InputCheckbox2.css';
import {Label} from "../../index";

const InputCheckbox2 = ({
                            id,
                            name,
                            value = false,
                            onChange,
                            title = "name",
                            marginBottom = false,
                            marginLeftRight = true,
                            marginTop = false,
                            colorNumber = 0,
                            active = true,
                            className,
                            ...rest
                        }) =>
{
    const uniqueId = `InputCheckbox2-${id || Math.floor(Math.random() * 1000000)}`;
    const [isChecked, setIsChecked] = useState(value);

    useEffect(() =>
    {
        setIsChecked(value);
    }, [value]);

    const handleChange = () =>
    {
        if(active)
        {
            setIsChecked(!isChecked);
            if(onChange) onChange({target: {name, checked: !isChecked}});
        }
    };

    // Obsługa spacji.
    const handleKeyDown = (event) =>
    {
        if(event.keyCode === 32 || event.keyCode === 13)
        {
            event.preventDefault();
            handleChange();
        }
    };

    const classBuilder_Box = () =>
    {
        let classList = ['InputCheckbox2'];

        if(marginLeftRight) classList.push("MarginLeftRight");
        if(marginBottom) classList.push("MarginBottom");
        if(marginTop) classList.push('MarginTop');
        if(!active) classList.push('InputCheckbox2-noActive');
        if(className) classList.push(className);
        return classList.join(' ');
    };

    const classBuilder = () =>
    {
        let classList = ['newCheckbox2'];

        if(isChecked) classList.push('newCheckbox2-Checked');
        if(isChecked && colorNumber > 0 && active !== false) classList.push(`BackgroundColor-${colorNumber}`);
        if(colorNumber > 0 && active !== false) classList.push(`BorderColor-${colorNumber}`);

        return classList.join(' ');
    };

    return (
        <div className={classBuilder_Box()}>
            <div
                className={classBuilder()}
                onClick={handleChange}
                onKeyDown={handleKeyDown}
                role={"checkbox"}
                aria-checked={isChecked}
                tabIndex={0}
            />
            <input
                {...rest}
                id={uniqueId}
                type={"checkbox"}
                className={"InputCheckbox2-Orygin"}
                checked={isChecked}
                onChange={handleChange}
                name={name}
                aria-hidden={"true"}
                tabIndex={-1}
            />
            <Label htmlFor={uniqueId} marginBottom={false}>
                {title}
            </Label>
        </div>
    );
};

export default InputCheckbox2;
