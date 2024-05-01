import {useCallback} from 'react';

// Toggle Const.
const useToggleConst = ({setData, button = 'Escape'}) =>
{
    const handleEscape = useCallback((event) =>
    {
        if(event.key === button)
        {
            setData(false);
            document.removeEventListener('keydown', handleEscape);
        }
    }, [setData]);

    // Return.
    return () =>
    {
        setData(data =>
        {
            const newData = !data;
            if(newData)
            {
                document.addEventListener('keydown', handleEscape);
            }
            else
            {
                document.removeEventListener('keydown', handleEscape);
            }
            return newData;
        });
    };
};

export default useToggleConst;
