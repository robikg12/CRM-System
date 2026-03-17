import classes from './RegistrationPage.module.css';

import AuthDesignIcon from '../../assets/img/icons/AuthenticationDesignIcon.svg?react';
import OverflowCircle from '../../assets/img/design/Authentication/overflowCircle.svg?react';

import type { UserRegistrationData } from '../../types/types';

import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { useAppSelector, useAppDispatch } from '../../store/hooks';


import { registration } from '../../store/user/userActions';

import type { FormProps } from 'antd';
import { Form, Input } from 'antd';

import { isRusAndEngLettersRegexp, isEngLettersRegexp, isValidRusPhoneRegexp } from '../../validation.ts';



const RegistrationPage: React.FC = () => {

    const dispatch = useAppDispatch();

    const registrationServerError = useAppSelector((state) => state.user.error.message);
    const registrationStatus = useAppSelector((state) => state.user.registrationStatus);

    const [registrationLocalError, setRegistrationLocalError] = useState<string>('');
    const [registrationIsSuccessful, setRegistrationIsSuccessful] = useState<boolean>(false);

    const handleSignup: FormProps<UserRegistrationData>['onFinish'] = async (signupData) => {

        if (signupData.password !== signupData.repeatedPassword) {

            setRegistrationLocalError('Пароли должны совпадать');
            return
        }

        await dispatch(registration(signupData));
    };

    useEffect(() => {

        if (registrationStatus === 'fulfilled' && registrationServerError === null) {
            // понимаю, что мог бы не создавать этот стейт,
            // но почему-то посчитал, что правильнее будет создать переменную, 
            // отвечающую за успешную регистрациию, чем писать условие у jsx 
            setRegistrationIsSuccessful(true);
            return
        }

        //Решил разместить здесь, а не в уведомлении, т.к по идее когда
        //  что-то не так с данными для регистрации, то сообщение отображается рядом с формой
        if ((registrationServerError) && (registrationServerError !== 'Серверная ошибка' && registrationServerError !== 'Ошибка =/')) {
            setRegistrationLocalError(registrationServerError);
        }

    }, [registrationStatus, registrationServerError])

    return <>

        <div className={classes.formWrapper}>

            <AuthDesignIcon className={classes.authDesignIcon} />

            <h1>Create your account</h1>

            {!registrationIsSuccessful &&
                <Form onFinish={handleSignup}>
                    <label htmlFor="name">Your name *</label>
                    <Form.Item<UserRegistrationData>
                        name="username"
                        rules={[
                            { required: true, whitespace: true, message: "Введите имя" },
                            { min: 1, max: 60, pattern: isRusAndEngLettersRegexp, message: "Имя должно содержать от 1 до 60 символов русского или латинского алфавита" }
                        ]}>
                        <Input id="name" />
                    </Form.Item>

                    <label htmlFor="login">Login *</label>
                    <Form.Item<UserRegistrationData>
                        name="login"
                        rules={[
                            { required: true, whitespace: true, message: "Введите логин" },
                            { min: 2, max: 60, pattern: isEngLettersRegexp, message: "Логин должен содержать от 2 до 60 символов латинского алфавита" }
                        ]}>
                        <Input id="login" />
                    </Form.Item>

                    <label htmlFor="pwd">Password *</label>
                    <Form.Item<UserRegistrationData>
                        name="password"
                        rules={[
                            { required: true, message: "Введите пароль" },
                            { min: 6, max: 60, message: "Пароль должен содержать от 6 до 60 символов" }
                        ]}
                    >
                        <Input type="password" id="pwd" />
                    </Form.Item>

                    <label htmlFor="repeat-pwd">Repeat password *</label>
                    <Form.Item<UserRegistrationData>
                        name="repeatedPassword"
                        rules={[
                            { required: true, message: "Введите пароль" },
                            { min: 6, max: 60, message: "Пароль должен содержать от 6 до 60 символов" }
                        ]}>
                        <Input type="password" id="repeat-pwd" />
                    </Form.Item>


                    <label htmlFor="email">Email *</label>
                    <Form.Item<UserRegistrationData>
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'Введите корректный адрес электронной почты',
                            },
                            {
                                required: true,
                                message: 'Введите адрес электронной почты',
                            },
                        ]}>
                        <Input id="email" />
                    </Form.Item>

                    <label htmlFor="tel">Phone number</label>
                    <Form.Item<UserRegistrationData>
                        name="phoneNumber"
                        rules={[{
                            pattern: isValidRusPhoneRegexp, message: 'Введите номер телефона'
                        }]}
                    >
                        <Input type="tel" id="tel" />
                    </Form.Item>

                    <button type="submit">Signup</button>
                </Form>}


            {registrationLocalError && <div className={classes.errorBlock}>
                {registrationLocalError}
            </div>}

            {registrationIsSuccessful &&
                <div className={classes.successfulRegistrationBlock}>
                    <p>Регистрация прошла успешно</p>
                    <Link to='/authentication'>Login</Link>
                </div>}


            <div className={classes.singupLinkWrapper}>
                <p>Already registered?</p>
                <Link to='/authentication'>Login</Link>
            </div>

            <OverflowCircle className={classes.overflowCircle} />

        </div>
    </>
}

export default RegistrationPage;