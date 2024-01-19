import React, {useState} from 'react';
import './WindowModul.css';

const WindowModul = ({zawartosc}) =>
{
    const [isOpen, setIsOpen] = useState(true);
    const zamknij = () => setIsOpen(false);

    if(!isOpen) return null;

    return (
        <div className="WindowModul">
            {zawartosc(zamknij)}
        </div>
    );
};

export default WindowModul;
