import './AccountInformation.css';
import {Button} from "../../index";

// Account Information.
const AccountInformation = ({
                                src = "./Ikonki/Edycja.png",
                                alt = "",
                                dataType = "dataType",
                                data = "data",
                                canEdit = null,
                                width = 1,
                                marginLeftRight = false,
                                marginBottom = false,
                                buttonColorNumber = 3,
                                buttonActive = true,
                                className,
                                onclick,
                                ...rest
                            }) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['AccountInformation-Box'];

        // Dodawanie klasy na podstawie wartości.
        if(width >= 0) classList.push(`Width-${width}`);
        if(marginLeftRight === true) classList.push('AccountInformation-MarginLeftRight');
        if(marginBottom === true) classList.push('AccountInformation-MarginBottom');
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
            {
                (canEdit === true || canEdit === false) &&
                <Button onClick={onclick} src={src} alt={alt} colorNumber={buttonColorNumber} active={buttonActive}/>
            }
        </div>
    )
}

export default AccountInformation;