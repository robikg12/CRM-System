import type { ClientSideUserRegistration, AuthData, ErrorInfo } from './types/types.ts';

export const MIN_TODO_TITLE_LENGHT = 2;
export const MAX_TODO_TITLE_LENGHT = 64;

// Регулярные выражения писал не сам, а загуглил.

const isRusAndEngLettersRegexp = /^[а-яА-ЯёЁa-zA-Z]+$/;
const isEngLettersRegexp = /^[a-zA-Z]+$/;
const isValidEmailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isValidRusPhoneRegexp = /^\+?(7|8)\s?(\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2})$/;

export const registrationDataValidation = (signupData: ClientSideUserRegistration): ErrorInfo => {

    const { login, username, password, repeatedPassword, email, phoneNumber } = signupData;

    if (!username) {
        return {
            isActiveError: true,
            message: 'Enter a name, this is a required field.'
        }
    }
    if ((username.length < 1 || username.length > 60) || !isRusAndEngLettersRegexp.test(username)) {
        return {
            isActiveError: true,
            message: 'The name must contain from 1 to 60 characters of the Russian or Latin alphabet'
        }
    }

    if (!login) {
        return {
            isActiveError: true,
            message: 'Enter a login, this is a required field.'
        }
    }
    if ((login.length < 2 || login.length > 60) || !isEngLettersRegexp.test(login)) {
        return {
            isActiveError: true,
            message: 'Login must contain from 2 to 60 characters of the Latin alphabet'
        }
    }

    if (!password) {
        return {
            isActiveError: true,
            message: 'Enter a password, this is a required field.'
        }
    }
    if (password.length < 6 || password.length > 60) {
        return {
            isActiveError: true,
            message: 'The password must be between 6 and 60 characters long.'
        }
    }

    if (password !== repeatedPassword) {
        return {
            isActiveError: true,
            message: 'Passwords must match.'
        }
    }

    if (!email) {
        return {
            isActiveError: true,
            message: 'Enter a email, this is a required field.'
        }
    }
    if (!isValidEmailRegexp.test(email)) {
        return {
            isActiveError: true,
            message: 'The email must be valid.'
        }
    }

    if (phoneNumber.length > 0 && !isValidRusPhoneRegexp.test(phoneNumber)) {
        return {
            isActiveError: true,
            message: 'If you enter a phone number, it must be valid.'
        }
    }

    return {
        isActiveError: false,
        message: 'The registration data is valid.'
    }

};

export const authDataValidation = (authData: AuthData): ErrorInfo => {

    const { login, password } = authData;

    if (!login) {
        return {
            isActiveError: true,
            message: 'Enter a login, this is a required field.'
        }
    }
    if ((login.length < 2 || login.length > 60) || !isEngLettersRegexp.test(login)) {
        return {
            isActiveError: true,
            message: 'Login must contain from 2 to 60 characters of the Latin alphabet'
        }
    }

    if (!password) {
        return {
            isActiveError: true,
            message: 'Enter a password, this is a required field.'
        }
    }
    if (password.length < 6 || password.length > 60) {
        return {
            isActiveError: true,
            message: 'The password must be between 6 and 60 characters long.'
        }
    }


    return {
        isActiveError: false,
        message: 'The authentication data is valid'
    }
}