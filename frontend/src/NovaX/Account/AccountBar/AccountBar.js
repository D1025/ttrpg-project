import './AccountBar.css';
import {shortString} from "../../index";

// Button Acount.
const AccountBar = ({
                        design = 1,
                        title,
                        titleLength = 20,
                        subTitle,
                        subTitleLength = 20,
                        src,
                        alt = "",
                        width = 1,
                        marginLeftRight = true,
                        marginBottom = false,
                        marginTop = false,
                        colorNumber = 0,
                        className,
                        ...rest
                    }) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['AccountBar'];

        if(design > 0) classList.push(`AccountBar-D${design}`)
        if(width >= 0) classList.push(`Width-${width}`)
        if(marginLeftRight) classList.push('MarginLeftRight');
        if(marginBottom === true) classList.push('MarginBottom');
        if(marginTop) classList.push('MarginTop');
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Return.
    return (<div {...rest} className={classBuilder()}>
        {/* Avatar po lewej. */}
        {design === 2 && (
            <div className={"AccountBar-Img" + (colorNumber > 0 ? ` BackgroundColor-${colorNumber}` : '')}>
                {src && (<img src={src} alt={alt}/>)}
            </div>
        )}

        {/* Nazwa i podtytół. */}
        <div className={"AccountBar-Title"}>
            <div>{title && shortString(title, titleLength)}</div>
            {subTitle && (<div>{shortString(subTitle, subTitleLength)}</div>)}
        </div>

        {/* Avatar po prawej. */}
        {design === 1 && (
            <div className={"AccountBar-Img" + (colorNumber > 0 ? ` BackgroundColor-${colorNumber}` : '')}>
                {src && (<img src={src} alt={alt}/>)}
            </div>
        )}
    </div>)
}

export default AccountBar;