import classes from './AuthenticationPage.module.css';

import AuthDesignIcon from '../../assets/img/icons/AuthenticationDesignIcon.svg?react';
import OverflowCircle from '../../assets/img/design/Authentication/overflowCircle.svg?react';

import { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../store/hooks';

import { login } from '../../store/user/userActions';

import { Navigate, Link } from 'react-router';

import type { AuthData } from '../../types/types';


import type { FormProps } from 'antd';
import { Form, Input } from 'antd';

import { isEngLettersRegexp } from '../../validation';


const AuthenticationPage: React.FC = () => {

    const dispatch = useAppDispatch();

    const serverError = useAppSelector(state => state.user.error);
    const { isAuthorized, authStatus } = useAppSelector(state => state.user);

    const [localError, setLocalError] = useState<string>('');

    const handleLogin: FormProps<AuthData>['onFinish'] = async (loginInputData) => {

        await dispatch(login(loginInputData));
    };

    useEffect(() => {

        if ((serverError.message) && (serverError.message !== 'Серверная ошибка' && serverError.message !== 'Ошибка =/' && serverError.message !== 'Токен истёк')) {
            setLocalError(serverError.message);
        }
    }, [serverError.count, serverError])

    if (authStatus === 'fulfilled' && isAuthorized) {
        return <Navigate to='/' />;
    }

    return <div className={classes.formWrapper}>
        <AuthDesignIcon className={classes.authDesignIcon} />

        <h1>Login to your Account</h1>

        <p>See what is going on with your business</p>
        <Form onFinish={handleLogin}>
            <label htmlFor="login">Login</label>
            <Form.Item<AuthData>
                name="login"
                rules={[
                    { required: true, whitespace: true, message: "Введите ваш логин" },
                    { min: 2, max: 60, pattern: isEngLettersRegexp, message: "Неверный логин или пароль" }
                ]}>
                <Input />
            </Form.Item>

            <label htmlFor="password">Password</label>
            <Form.Item<AuthData>
                name="password"
                rules={[
                    { required: true, message: "Введите пароль" },
                    { min: 6, max: 60, message: "Неверный логин или пароль" }
                ]}>
                <Input.Password size="large" />
            </Form.Item>

            <div className={classes.wrapperOfCheckboxAndLink}>
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox">Remember Me</label>
                <a href="">Forgot Password?</a>
            </div>
            <button type="submit">Login</button>
        </Form>

        {
            localError && <div className={classes.errorBlock}>
                {localError}
            </div>
        }


        <div className={classes.authLinkWrapper}>

            <p>Not Registered Yet?</p>
            <Link to='/signup'>Create an account</Link>

        </div>

        <OverflowCircle className={classes.overflowCircle} />

    </div >

}

export default AuthenticationPage;