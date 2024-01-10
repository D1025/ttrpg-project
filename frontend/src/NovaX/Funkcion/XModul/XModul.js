import React, { useState } from 'react';
import './XModul.css';

const XModul = ({ zawartosc }) => {
    const [isOpen, setIsOpen] = useState(true);
    const zamknij = () => setIsOpen(false);

    if (!isOpen) return null;

    return (
        <div className="XModul">
            {zawartosc(zamknij)}
        </div>
    );
};

export default XModul;
