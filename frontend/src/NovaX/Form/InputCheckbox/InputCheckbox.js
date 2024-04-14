import React, {useState, useEffect, useMemo} from 'react';
import './InputCheckbox.css';
import {Label} from "../../index";

const InputCheckbox = ({
                           id,
                           name,
                           value = false,
                           onChange,
                           title = "name",
                           marginBottom = false,
                           marginLeftRight = true,
                           marginTop = false,
                           active = true,
                           className,
                           ...rest
                       }) =>
{
    const uniqueId = useMemo(() => id || `InputCheckbox-${Math.floor(Math.random() * 1000000)}`, [id]);
    const [myChecked, setMyChecked] = useState(value);

    useEffect(() =>
    {
        setMyChecked(value);
    }, [value]);

    const handleChange = (checked) =>
    {
        if(active)
        {
            setMyChecked(checked);
            if(onChange) onChange({target: {name, checked}});
        }
    };

    // Obsługa spacji.
    const handleKeyDown = (event) =>
    {
        if(event.keyCode === 32 || event.keyCode === 13)
        {
            event.preventDefault();
            handleChange(!myChecked);
        }
    };

    const classBuilder = () =>
    {
        let classList = ['InputCheckbox'];

        if(marginLeftRight) classList.push("MarginLeftRight");
        if(marginBottom) classList.push("MarginBottom");
        if(marginTop) classList.push('MarginTop');
        if(!active) classList.push('InputCheckbox-noActive');
        if(className) classList.push(className);
        return classList.join(' ');
    };

    return (
        <div className={classBuilder()}>
            <input
                {...rest}
                id={uniqueId}
                type={"checkbox"}
                checked={myChecked}
                onChange={(event) => handleChange(event.target.checked)}
                name={name}
                tabIndex={-1}
            />
            <Label
                htmlFor={uniqueId}
                marginLeftRight={false}
                marginBottom={false}
                marginTop={false}
                onKeyDown={handleKeyDown}
                tabIndex={0}
            >
                {title}
            </Label>
        </div>
    );
};

export default InputCheckbox;
