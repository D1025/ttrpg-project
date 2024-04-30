const ImgBase64 = (imageExtension, image) =>
{
    if(!imageExtension && !image) return;

    return `data:image/${imageExtension};base64,${image}`;
}

export default ImgBase64;