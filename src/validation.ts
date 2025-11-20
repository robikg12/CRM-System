type ValidationInfo = { isValid: boolean; message: string };

export function titleValidation(title: string): ValidationInfo {
    let validationInfo: ValidationInfo = { isValid: false, message: '' };

    if (title.length < 2) {
        validationInfo.message = 'Запись должна содержать от 2-х символов';
        return validationInfo;
    }
    if (title.length > 64) {
        validationInfo.message = 'В записи может быть максимум 64 символа';
        return validationInfo;
    }

    const filledText: string = title.trim();
    if (filledText.length < 2) {
        validationInfo.message = 'Запись должна содержать хотя бы 2 непустых символа';
        return validationInfo;
    }

    validationInfo = { isValid: true, message: 'Данные верны' };
    return validationInfo;
}