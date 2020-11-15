class FormValidator {
    private password: string;
    private passwordConfirmation: string|undefined;
    private name: string|undefined;

    constructor(password: string, passwordConfirmation?: string, name?: string) {
        this.password = password;
        this.passwordConfirmation = passwordConfirmation;
        this.name = name;
    }

    public validated(): boolean {
        return this.fieldsArentEmpty() && this.fieldsArentSame();
    }

    public fieldsArentEmpty(): boolean {
        if (this.name !== undefined && this.passwordConfirmation !== undefined) {
            return this.isEmptyField(this.password) || this.isEmptyField(this.passwordConfirmation) ||
                this.isEmptyField(this.name);
        }

        return this.isEmptyField(this.password);
    }

    private isEmptyField(field: string|undefined): boolean {
        return field !== undefined ? field.trim() === '' : true;
    }

    private fieldsArentSame(): boolean {
        return this.password !== this.passwordConfirmation;
    }
}

export default FormValidator;
