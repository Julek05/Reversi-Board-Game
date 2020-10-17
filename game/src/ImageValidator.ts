
class ImageValidator {
    private readonly image: string|File;

    constructor(image: string|File) {
        this.image = image;
    }

    public isInvalidFile() {
        return this.image === '' || this.image === undefined || !this.isImage();
    }

    private isImage() {
        return typeof this.image === 'object' && this.image.type.includes('image');
    }
}

export default ImageValidator;