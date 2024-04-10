const ImgBase64 = (imageExtension, image) =>
{
    return `data:image/${imageExtension};base64,${image}`;
}

export default ImgBase64;