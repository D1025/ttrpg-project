import './AccountInformation.css';
import {Button, iconEdit} from "../../index";

// Account.png Information.
const AccountInformation = ({
                                src = iconEdit,
                                alt = "",
                                dataType = "dataType",
                                data = "data",
                                showButton = false,
                                width = 1,
                                marginLeftRight = false,
                                marginBottom = false,
                                marginTop = false,
                                buttonColorNumber = 0,
                                buttonActive = true,
                                className,
                                onClick,
                                ...rest
                            }) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['AccountInformation-Box'];

        // Dodawanie klasy na podstawie wartości.
        if(width >= 0) classList.push(`Width-${width}`);
        if(marginLeftRight === true) classList.push('MarginLeftRight');
        if(marginBottom === true) classList.push('MarginBottom');
        if(marginTop) classList.push('MarginTop');
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'.
    const myClass = classBuilder();

    // Return.
    return (
        <div {...rest} className={myClass}>
            <div className={"AccountInformation"}>
                <div>
                    <div>
                        {dataType}
                    </div>
                    <div>
                        {data}
                    </div>
                </div>
            </div>
            {showButton === true &&
                <Button
                    onClick={onClick}
                    src={src}
                    alt={alt}
                    colorNumber={buttonColorNumber}
                    active={buttonActive}
                    marginLeftRight={false}
                />}
        </div>
    )
}

export default AccountInformation;