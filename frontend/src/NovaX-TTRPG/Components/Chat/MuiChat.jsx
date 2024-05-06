import React, {useEffect, useState} from 'react';
import {Button, TextField, Box} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const MuiChat = ({children, value = '', onChange, onClick, onKeyDown, inputPlaceholder, ...rest}) => {
    const [myValue, setMyValue] = useState(value);

    const takeValue = (event) => {
        setMyValue(event.target.value);
        if (onChange) {
            onChange(event);
        }
    };

    useEffect(() => {
        setMyValue(value);
    }, [value]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            margin: 'auto'
        }}>
            <Box sx={{
                width: '95%',
                height: '85%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'var(--Motyw-Przezroczysty)',
                borderRadius: 2,
                marginBottom: '0.5vw',
                paddingTop: '1vw',
                paddingBottom: '1vw'
            }}>
                <Box sx={{width: '100%', maxHeight: '100%', overflowY: 'auto'}}>
                    {children}
                </Box>
            </Box>
            <Box sx={{
                display: 'flex', width: '95%',
                height: '10%', background: 'var(--Motyw-Przezroczysty)'
            }}>
                <TextField
                    {...rest}
                    value={myValue}
                    onKeyDown={onKeyDown}
                    onChange={takeValue}
                    type="text"
                    placeholder={inputPlaceholder}
                    variant="outlined"
                    fullWidth
                    style={{
                        borderRadius: '2px',
                        height: '100%',
                        width: '100%'
                    }}
                />
                <Button onClick={onClick} startIcon={<SendIcon/>} disabled={myValue === ''} style={{
                    borderRadius: 'var(--Radius-2)', flex: 1
                }}/>
            </Box>
        </Box>);
};

export default MuiChat;