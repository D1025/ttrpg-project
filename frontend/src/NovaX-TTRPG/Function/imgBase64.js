// Image Base 64.
function ImgBase64(imageExtension, image)
{
    if(!imageExtension && !image) return;

    // Return.
    return `data:image/${imageExtension};base64,${image}`;
}

export default ImgBase64;