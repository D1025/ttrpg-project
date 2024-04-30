import './AccountInformation.css';
import {Button, shortString, iconEdit} from "../../index";

// Account Information.
const AccountInformation = ({
                                src = iconEdit,
                                alt = "",
                                dataType = "dataType",
                                dataTypeLenght = 15,
                                data = "data",
                                dataLength = 15,
                                width = 1,
                                marginLeftRight = true,
                                marginBottom = false,
                                marginTop = false,
                                showButton = false,
                                buttonColorNumber = 0,
                                buttonActive = true,
                                onClick,
                                className,
                                ...rest
                            }) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['AccountInformation'];

        if(width >= 0) classList.push(`Width-${width}`);
        if(marginLeftRight === true) classList.push('MarginLeftRight');
        if(marginBottom === true) classList.push('MarginBottom');
        if(marginTop) classList.push('MarginTop');
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Return.
    return (
        <div {...rest} className={classBuilder()}>
            <div className={"AccountInformation-DataType"}>
                {shortString(dataType, dataTypeLenght)}
            </div>
            <div className={"AccountInformation-InfoAndButton"}>
                <div>
                    {shortString(data, dataLength)}
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
        </div>
    )
}

export default AccountInformation;