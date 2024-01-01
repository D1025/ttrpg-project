import './XNav.css';

const XNav = ({children}) => {
    return (
        <nav className={"XNav"}>
            {children}
        </nav>
    );
}

export default XNav;