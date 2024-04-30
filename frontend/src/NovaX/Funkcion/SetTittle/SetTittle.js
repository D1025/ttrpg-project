const setTittle = (newIcon, newTittle) =>
{
    document.title = newTittle;

    if(newIcon === true)
    {
        const linkFavicon = document.querySelector("link[rel~='icon']");
        linkFavicon.href = newIcon;
    }
}

export default setTittle;
