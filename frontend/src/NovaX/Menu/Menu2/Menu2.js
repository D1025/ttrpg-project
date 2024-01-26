import './Menu2.css';

const Menu2 = ({children, tag="ol", ...rest}) => {

    const Tag = tag;

    return (
        <Tag {...rest} className={"Menu2"}>
            {children}
        </Tag>
    );
}

export default Menu2;