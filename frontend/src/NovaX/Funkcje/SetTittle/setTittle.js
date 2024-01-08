function setTittle(newFavicon, newTittle)
{
    document.title = newTittle;

    const linkFavicon = document.querySelector("link[rel~='icon']");
    if(linkFavicon)
    {
        linkFavicon.href = newFavicon;
    }
}

export default setTittle;
