import classes from './AuthenticationPage.module.css';

import AuthDesignIcon from '../../assets/img/icons/AuthenticationDesignIcon.svg?react';
import OverflowCircle from '../../assets/img/design/Authentication/overflowCircle.svg?react';

import { useNavigate, Link } from 'react-router';
import { useState, useEffect } from 'react';

import type { AuthData } from '../../types/types';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { uiActions } from '../../store/ui-slice';
import { userActions } from '../../store/user-slice';

import { authDataValidation } from '../../validation';

import { userAuthentication } from '../../api/https';






const initialAuthData: AuthData = {
    login: '',
    password: ''
}

const AuthenticationPage: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [loginInputData, setLoginInputData] = useState<AuthData>(initialAuthData);
    const errorInfo = useAppSelector(state => state.ui.authErrorInfo);

    const handleChangeLoginData = (event: React.ChangeEvent<HTMLInputElement>, input: string) => {
        if (input in loginInputData) {
            setLoginInputData((prevData) => ({
                ...prevData,
                [input]: event.target.value
            }))
        }
    }

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        dispatch(userActions.setIdleStatus());

        const errorInformation = authDataValidation(loginInputData);
        dispatch(uiActions.setAuthErrorInfo(errorInformation));
        if (errorInformation.isActiveError) {
            return;
        }

        const authResponse = await userAuthentication(loginInputData);

        if ("accessToken" in authResponse) {
            localStorage.setItem('accessToken', authResponse.accessToken);
            localStorage.setItem('refreshToken', authResponse.refreshToken);

            dispatch(uiActions.setAuthErrorInfo({
                isActiveError: false,
                message: 'Успешная авторизация'
            }));
            navigate('/');
            return;
        }
        dispatch(uiActions.setAuthErrorInfo(authResponse));
    }


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
        <form onSubmit={handleLogin}>
            <label htmlFor="login">Login</label>
            <input value={loginInputData.login} type="text" id="login" onChange={(event) => { handleChangeLoginData(event, 'login') }} />

            <label htmlFor="pwd">Password</label>
            <input value={loginInputData.password} type="password" id="pwd" onChange={(event) => { handleChangeLoginData(event, 'password') }} />

            <div className={classes.wrapperOfCheckboxAndLink}>
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox">Remember Me</label>
                <a href="">Forgot Password?</a>
            </div>
            <button type="submit">Login</button>
        </form>

        {errorInfo.isActiveError && <div className={classes.errorBlock}>
            {errorInfo.message}
        </div>}


        <div className={classes.singupLinkWrapper}>

            <p>Not Registered Yet?</p>
            <Link to='/signup'>Create an account</Link>

        </div>

        <OverflowCircle className={classes.overflowCircle} />

    </div>

}

export default AuthenticationPage;