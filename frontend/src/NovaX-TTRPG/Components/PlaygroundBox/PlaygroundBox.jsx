import React, {useLayoutEffect, useRef, useState} from 'react';
import { Box } from '@mui/material';

const PlaygroundBox = ({ imageUrl, gridSize }) => {
    // Stan dla przybliżenia
    const [scale, setScale] = useState(1);
    // Stan dla przesunięcia
    const [position, setPosition] = useState({ x: 0, y: 0 });
    // Stan dla wymiarów diva
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    // Stan dla pozycji obrazka
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

    // Referencja do diva
    const divRef = useRef();

    // Obsługa przybliżenia i oddalania
    const handleZoom = (event) => {
        const newScale = Math.min(Math.max(0.1, scale + event.deltaY * -0.01), 3);
        setScale(newScale);
    };

    // Obsługa przesunięcia diva
    const handleMove = (event) => {
        setPosition({
            x: position.x + event.movementX / (1/ scale),
            y: position.y + event.movementY / (1/ scale)
        });
    };

    // Aktualizacja wymiarów diva po załadowaniu
    useLayoutEffect(() => {
        if (divRef.current) {
            setDimensions({
                width: divRef.current.offsetWidth,
                height: divRef.current.offsetHeight
            });
        }
    }, [divRef.current]);

    // Obliczanie ilości kwadratów na podstawie wielkości kwadratów
    const squaresCount = dimensions.width > 0 && gridSize > 0
        ? Math.ceil(dimensions.width / gridSize)
        : 0;

    // Obsługa przeciągania obrazka
    const handleDrag = (event) => {
        if (divRef.current) {
            setImagePosition({
                x: event.clientX - divRef.current.getBoundingClientRect().left,
                y: event.clientY - divRef.current.getBoundingClientRect().top
            });
        }
    };
    // Obsługa zakończenia przeciągania obrazka
    const handleDragEnd = () => {
        setImagePosition(prevPosition => ({
            x: Math.max(0, Math.round(prevPosition.x / gridSize) * gridSize),
            y: Math.max(0, Math.round(prevPosition.y / gridSize) * gridSize)
        }));
    };

    return (
        <Box
            sx={{
                width: '95%',
                height: '95%',
                overflow: 'hidden',
                position: 'relative',
                margin: '2.5%',
                marginTop: '0',
                marginBottom: '5%'
            }}
            onWheel={handleZoom}
            onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
        >
            <Box
                ref={divRef}
                sx={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    width: '100%',
                    height: '100%',
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transition: 'transform 0.01s ease-in-out',
                    position: 'absolute',
                    overflow: 'hidden',
                    top: 0,
                    left: 0
                }}
            >
                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    {[...Array(squaresCount)].map((_, index) => (
                        <Box key={index} sx={{ position: 'absolute', top: `${index * gridSize}px`, left: 0, width: '100%', height: '1px', background: '#ccc' }} />
                    ))}
                    {[...Array(squaresCount)].map((_, index) => (
                        <Box key={index} sx={{ position: 'absolute', top: 0, left: `${index * gridSize}px`, width: '1px', height: '100%', background: '#ccc' }} />
                    ))}
                </Box>
                <img
                    src={imageUrl}
                    style={{
                        position: 'absolute',
                        top: `${imagePosition.y}px`,
                        left: `${imagePosition.x}px`,
                        width: `${gridSize}px`,
                        height: `${gridSize}px`
                    }}
                    draggable="true"
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                />
            </Box>
        </Box>
    );
};

export default PlaygroundBox;