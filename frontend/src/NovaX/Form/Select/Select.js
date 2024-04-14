import React, {useEffect, useState, Children} from 'react';
import './Select.css';
import {Hr, iconArrowDown, iconArrowLeft} from "../../index";

// Select.
const Select = ({
                    children,
                    length = 11,
                    title = 'Select...',
                    srcHide = iconArrowLeft,
                    srcShow = iconArrowDown,
                    alt = "",
                    width = 2,
                    marginBottom = false,
                    marginLeftRight = true,
                    marginTop = false,
                    required = false,
                    colorNumber = 0,
                    active = true,
                    onChange,
                    name,
                    value = '',
                    className,
                    ...rest
                }) =>
{
    // Zmienne.
    const [isOpen, setIsOpen] = useState(false);
    const [myValue, setMyValue] = useState(value);
    const [selectedLabel, setSelectedLabel] = useState('');

    // Renderowanie opcji.
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
            setMyValue(value);
        }
    }, [value, length, options]);

    // Uwidocznij.
    const handleToggle = () => setIsOpen(!isOpen);

    // Zmień wartość.
    const handleSelect = (value, label) =>
    {
        setMyValue(value);
        setSelectedLabel(label.length > length ? `${label.slice(0, length)}...` : label);
        setIsOpen(false);

        const event = {target: {value, name}};
        onChange && onChange(event);
    };

    // Obsługa spacji.
    const handleKeyDown_Select = (event, value, label) =>
    {
        if(event.keyCode === 32 || event.keyCode === 13)
        {
            event.preventDefault();
            handleSelect(value, label);
        }
    };

    // Obsługa spacji.
    const handleKeyDown_Toggle = (event) =>
    {
        if(event.keyCode === 32 || event.keyCode === 13)
        {
            event.preventDefault();
            handleToggle();
        }
    };

    // Class Builder [Dla pola].
    const classBuilder_Box = () =>
    {
        let classList = ['Select'];

        if(width >= 0) classList.push(`Width-${width}`);
        if(marginLeftRight) classList.push('MarginLeftRight');
        if(marginBottom) classList.push('MarginBottom');
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Class Builder [Dla przycisku].
    const classBuilder_Choice = () =>
    {
        let classList = ['Select-Checkd'];

        if(colorNumber > 0 && active !== false) classList.push(`BorderColor-${colorNumber}`);
        if(myValue !== '' && active !== false) classList.push('Select-Active');
        if(active === false) classList.push(`Select-noActive`);

        return classList.join(' ');
    };

    // Return.
    return (
        <div {...rest} className={classBuilder_Box()}>
            <div
                className={classBuilder_Choice()}
                onClick={handleToggle}
                onKeyDown={handleKeyDown_Toggle}
                tabIndex={0}
            >
                <div>{selectedLabel || title}</div>
                <img src={isOpen ? srcShow : srcHide} alt={alt}/>
            </div>
            {isOpen && (
                <div className={"Select-Options"}>
                    {options.map((option, index) => (
                        <React.Fragment key={option.value}>
                            <div
                                className={"Option"}
                                onClick={() => handleSelect(option.value, option.label)}
                                tabIndex={0}
                                onKeyDown={(event) => handleKeyDown_Select(event, option.value, option.label)}
                            >
                                {option.label}
                            </div>
                            {index !== options.length - 1 && <Hr colorNumber={colorNumber} marginBottom={false}/>}
                        </React.Fragment>
                    ))}
                </div>
            )}

            {/* Ukryty natywny element select. */}
            <select
                name={name}
                required={required}
                value={myValue}
                onChange={() => {}}
                className={"Select-Orygin"}
                tabIndex={-1}
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
