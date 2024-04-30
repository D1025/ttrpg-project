import './AccountBox.css'
import {shortString} from "../../index";

// Account.png Box.
const AccountBox = ({
                        title,
                        tittleLength = 7,
                        subTitle,
                        active = undefined,
                        marginLeftRight = true,
                        marginBottom = false,
                        marginTop = false,
                        src,
                        alt = "",
                        className,
                        ...rest
                    }) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['AccountBox'];

        if(marginLeftRight) classList.push('MarginLeftRight');
        if(marginBottom) classList.push('MarginBottom');
        if(marginTop) classList.push('MarginTop');
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Return.
    return (
        <div {...rest} className={classBuilder()}>
            <div className={"AccountBox-Avatar"}>
                <img src={src} alt={alt}/>
            </div>

            {active !== undefined && (
                <div className={"AccountBox-Status"}>
                    <div className={active === true ? "Active" : undefined}/>
                </div>
            )}

            <div className={"AccountBox-Tittle"}>
                <div>{shortString(title, tittleLength)}</div>
                <div>{subTitle}</div>
            </div>
        </div>
    );
}

export default AccountBox;