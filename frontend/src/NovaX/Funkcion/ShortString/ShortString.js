// short String.
const shortString = (string, length) =>
{
    if(string.length > length)
    {
        return string.slice(0, length) + '...';
    }
    return string;
};

export default shortString;