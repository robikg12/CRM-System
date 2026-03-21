import classes from './RegistrationPage.module.css';

import AuthDesignIcon from '../../assets/img/icons/AuthenticationDesignIcon.svg?react';
import OverflowCircle from '../../assets/img/design/Authentication/overflowCircle.svg?react';

import { Link } from 'react-router';

import { useAppSelector, useAppDispatch } from '../../store/hooks';

import { generalErrorMessages } from '../../api/errors.ts';

import { registration } from '../../store/user/userActions';


import { Form, Input } from 'antd';

import { isRusAndEngLettersRegexp, isEngLettersRegexp, isValidRusPhoneRegexp } from '../../validation.ts';

import type { UserRegistrationData } from '../../types/types';
import type { FormProps } from 'antd';


const RegistrationPage: React.FC = () => {

    const dispatch = useAppDispatch();

    const registrationServerError = useAppSelector((state) => state.user.error.message);
    const registrationStatus = useAppSelector((state) => state.user.registrationStatus);

    const handleSignup: FormProps<UserRegistrationData>['onFinish'] = async (signupData) => {

        await dispatch(registration(signupData));
    };


    return <>

        <div className={classes.formWrapper}>

            <AuthDesignIcon className={classes.authDesignIcon} />

            <h1>Create your account</h1>

            {!(registrationStatus === 'fulfilled' && registrationServerError === null) &&
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
                        dependencies={['password']}
                        rules={[
                            { required: true, message: "Введите пароль" },
                            ({ getFieldValue }) => ({ //Скопировал код с antd доки
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли должны совпадать'));
                                },
                            }),
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


            {
                registrationServerError &&
                !generalErrorMessages.includes(registrationServerError) &&
                <div className={classes.errorBlock}>
                    {registrationServerError}
                </div>
            }

            {(registrationStatus === 'fulfilled' && registrationServerError === null) &&
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