function ustawNaglowek(nowyFavicon, nowyNaglowek)
{
    document.title = nowyNaglowek;

    const linkFavicon = document.querySelector("link[rel~='icon']");
    if(linkFavicon)
    {
        linkFavicon.href = nowyFavicon;
    }
}

export default ustawNaglowek;
