export function itemValidation(itemText) {
    let validationStatus = { isValid: false, message: '' };
    if ((itemText.length >= 2) && (itemText.length <= 64)) {

        const emptySpaceValidation = /\S{2}/; //TODO: Да, что-то намутил 
        if (emptySpaceValidation.test(itemText)) {
            validationStatus = { isValid: true, message: 'Данные верны' };
        }
        else {
            validationStatus.message = 'Запись должна содержать от 2х непустых символов'
        }
    }
    else {
        validationStatus.message = 'Запись должна содержать от 2 до 64 символов.';

    }
    return validationStatus;
}