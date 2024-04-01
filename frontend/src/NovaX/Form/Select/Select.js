import React, {useEffect, useState, Children} from 'react';
import './Select.css';
import {Hr} from "../../index";

const Select = ({
                    children,
                    length = 13,
                    title = 'Select...',
                    src = "./Ikonki/Strzałka_Lewo.png",
                    alt = "",
                    width = 2,
                    marginBottom = false,
                    marginLeftRight = true,
                    className,
                    onChange,
                    required = false,
                    name,
                    value = '',
                    ...rest
                }) =>
{
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    const [selectedLabel, setSelectedLabel] = useState('');

    const options = Children.map(children, child =>
    {
        if(child.type !== 'option')
        {
            console.warn('Select accepts only "option" tags as children.');
            return null;
        }
        return {
            value: child.props.value,
            label: child.props.children,
        };
    }).filter(Boolean);

    // Aktualizacja etykiety na podstawie value.
    useEffect(() =>
    {
        const activeOption = options.find(option => option.value === value);
        if(activeOption)
        {
            setSelectedLabel(activeOption.label.length > length ? `${activeOption.label.slice(0, length)}...` : activeOption.label);
            setSelectedValue(value);
        }
    }, [value, length, options]);

    const handleToggle = () => setIsOpen(!isOpen);

    const handleSelect = (value, label) =>
    {
        setSelectedValue(value);
        setSelectedLabel(label.length > length ? `${label.slice(0, length)}...` : label);
        setIsOpen(false);

        const event = {target: {value, name}};
        onChange(event);
    };


    const classBuilder = () =>
    {
        let classList = ['Select'];

        if(width >= 0) classList.push(`Width-${width}`);
        if(marginBottom) classList.push('Select-MarginBottom');
        if(marginLeftRight) classList.push('Select-MarginLeftRight');
        if(selectedValue !== '') classList.push('Select-Active');
        if(className) classList.push(className);

        return classList.join(' ');
    };

    const myClass = classBuilder();

    return (
        <div {...rest} className={myClass}>
            <div className="Select-Value" onClick={handleToggle}>
                {selectedLabel || title}
                <img src={src} alt={alt} className={isOpen ? 'Select-ArrowActive' : undefined}/>
            </div>
            {isOpen && (
                <div className="Select-Options">
                    {options.map((option, index) => (
                        <React.Fragment key={option.value}>
                            <div
                                className="Option"
                                onClick={() => handleSelect(option.value, option.label)}
                            >
                                {option.label}
                            </div>
                            {index !== options.length - 1 && <Hr marginBottom={false}/>}
                        </React.Fragment>
                    ))}
                </div>
            )}

            {/* Ukryty natywny element select. */}
            <select
                name={name}
                required={required}
                value={selectedValue}
                onChange={() => {}}
                className={"nativeSelect-Hidden"}
            >
                <option value={""} disabled>{title}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
