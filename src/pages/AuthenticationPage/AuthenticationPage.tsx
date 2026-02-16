import classes from './AuthenticationPage.module.css';

import AuthDesignIcon from '../../assets/img/icons/AuthenticationDesignIcon.svg?react';
import OverflowCircle from '../../assets/img/design/Authentication/overflowCircle.svg?react';

import { useNavigate, Link } from 'react-router';
import { useEffect } from 'react';

import type { AuthData } from '../../types/types';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { uiActions } from '../../store/ui/uiSlice';
import { userActions } from '../../store/user/userSlice';

import { authDataValidation } from '../../validation';

import { userAuthentication } from '../../api/https';

import type { FormProps } from 'antd';
import { Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';


const AuthenticationPage: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const errorInfo = useAppSelector(state => state.ui.authErrorInfo);

    const handleLogin: FormProps<AuthData>['onFinish'] = async (loginInputData) => {
        try {
            dispatch(userActions.setIdleStatus()); //Костыль, чтобы если сделаю логаут, то статус встал обратно в idle.

            const errorInformation = authDataValidation(loginInputData);
            dispatch(uiActions.setAuthErrorInfo(errorInformation));
            if (errorInformation.isActiveError) {
                return;
            }

            const tokens = await userAuthentication(loginInputData);
            localStorage.setItem('refreshToken', tokens.refreshToken);

            dispatch(uiActions.setAuthErrorInfo({
                isActiveError: false,
                message: 'Успешная авторизация'
            }));
            navigate('/');

        }
        catch (errorMessage) {
            dispatch(uiActions.setAuthErrorInfo({
                isActiveError: true,
                message: errorMessage as string
            }));
        }
    };



    useEffect(() => {
        dispatch(uiActions.setAuthErrorInfo({
            isActiveError: false,
            message: ''
        }));
    }, [dispatch])


    return <div className={classes.formWrapper}>
        <AuthDesignIcon className={classes.authDesignIcon} />

        <h1>Login to your Account</h1>

        <p>See what is going on with your business</p>
        <Form onFinish={handleLogin}>
            <label htmlFor="login">Login</label>
            <FormItem<AuthData>
                name="login">
                <Input />
            </FormItem>

            <label htmlFor="password">Password</label>
            <FormItem<AuthData>
                name="password">
                <Input type='password' />
            </FormItem>

            <div className={classes.wrapperOfCheckboxAndLink}>
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox">Remember Me</label>
                <a href="">Forgot Password?</a>
            </div>
            <button type="submit">Login</button>
        </Form>

        {
            errorInfo.isActiveError && <div className={classes.errorBlock}>
                {errorInfo.message}
            </div>
        }


        <div className={classes.singupLinkWrapper}>

            <p>Not Registered Yet?</p>
            <Link to='/signup'>Create an account</Link>

        </div>

        <OverflowCircle className={classes.overflowCircle} />

    </div >

}

export default AuthenticationPage;