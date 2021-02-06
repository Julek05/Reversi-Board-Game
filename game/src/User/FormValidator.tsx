class FormValidator {
    private readonly password: string;
    private readonly passwordConfirmation: string|undefined;
    private readonly name: string|undefined;

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
            return FormValidator.isEmptyField(this.password) || FormValidator.isEmptyField(this.passwordConfirmation) ||
                FormValidator.isEmptyField(this.name);
        }

        return FormValidator.isEmptyField(this.password);
    }

    private static isEmptyField(field: string|undefined): boolean {
        return field !== undefined ? field.trim() === '' : true;
    }

    private fieldsArentSame(): boolean {
        return this.password !== this.passwordConfirmation;
    }
}

export default FormValidator;
