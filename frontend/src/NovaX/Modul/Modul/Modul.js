import './Modul.css';

const Modul = ({children, src, ...rest}) =>
{
    let style;

    if(src) style = "backgroundImage:" + `url(${src})`;

    return (
        <div {...rest} className={"Modul"} style={{style, ...rest.style}}>
            {children}
        </div>
    );
}

export default Modul;