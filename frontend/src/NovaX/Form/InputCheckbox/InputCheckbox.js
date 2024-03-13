import React, {useState, useEffect} from 'react';
import './InputCheckbox.css';
import {Label} from "../../index";

const InputCheckbox = ({
                           id = "id",
                           title = "name",
                           onChange,
                           name,
                           marginBottom = false,
                           marginLeftRight = true,
                           active = false,
                           className,
                           ...rest
                       }) =>
{
    const [isChecked, setIsChecked] = useState(active);

    // Synchronizacja stanu wewnętrznego z propsem 'active'.
    useEffect(() =>
    {
        setIsChecked(active);
    }, [active]);

    const handleChange = (event) =>
    {
        const newChecked = event.target.checked;
        setIsChecked(newChecked);
        if(onChange) onChange(newChecked);
    };

    const classBuilder = () =>
    {
        let classList = ['InputCheckbox'];
        if(marginLeftRight) classList.push("InputCheckbox-MarginLeftRight");
        if(marginBottom) classList.push("InputCheckbox-MarginBottom");
        if(className) classList.push(className);
        return classList.join(' ');
    };

    const myClass = classBuilder();

    return (
        <div className={myClass}>
            <input
                {...rest}
                id={id}
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
                name={name}
            />
            <Label htmlFor={id} marginLeftRight={false} marginBottom={false}>{title}</Label>
        </div>
    );
};

export default InputCheckbox;
