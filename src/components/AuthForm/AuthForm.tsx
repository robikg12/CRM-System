import classes from './AuthForm.module.css';

import AuthDesignIcon from '../../assets/img/icons/AuthenticationDesignIcon.svg?react';
import OverflowCircle from '../../assets/img/design/Authentication/overflowCircle.svg?react';

import { useState, useEffect } from 'react';

import { useSearchParams, Link, useNavigate } from 'react-router';

import type { ClientSideUserRegistration, AuthData } from '../../types/types.ts';

import { registrationDataValidation, authDataValidation } from '../../validation.ts';
import { registerNewUser, userAuthentication } from '../../api/https.ts';

import { useAppSelector, useAppDispatch } from '../../store/hooks.ts';
import { uiActions } from '../../store/ui-slice.ts';
import { userActions } from '../../store/user-slice.ts';

const initialSignupData: ClientSideUserRegistration = {
    login: '',
    username: '',
    password: '',
    repeatedPassword: '',
    email: '',
    phoneNumber: ''
};

const initialAuthData: AuthData = {
    login: '',
    password: ''
}

const AuthForm: React.FC = () => {


    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';

    const [loginInputData, setLoginInputData] = useState<AuthData>(initialAuthData);
    const [signupInputData, setSignupInputFields] = useState<ClientSideUserRegistration>(initialSignupData); // TODO: подумать над названием стейта
    const errorInfo = useAppSelector(state => state.ui.authErrorInfo);

    const handleChangeSignupData = (event: React.ChangeEvent<HTMLInputElement>, input: string) => {

        if (input in signupInputData) {
            setSignupInputFields((prevData) => ({
                ...prevData,
                [input]: event.target.value
            }));
        }
    }

    const handleChangeLoginData = (event: React.ChangeEvent<HTMLInputElement>, input: string) => {
        if (input in loginInputData) {
            setLoginInputData((prevData) => ({
                ...prevData,
                [input]: event.target.value
            }))
        }
    }

    const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault();

        const errorInformation = registrationDataValidation(signupInputData);
        dispatch(uiActions.setAuthErrorInfo(errorInformation));
        if (errorInformation.isActiveError) {
            return;
        }

        const resData = await registerNewUser(signupInputData);
        if ('isActiveError' in resData) {
            dispatch(uiActions.setAuthErrorInfo(resData));
            return;
        }
        dispatch(uiActions.setAuthErrorInfo({
            isActiveError: false,
            message: 'Registration was successful!'
        }));

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


    const authMode = searchParams.get('mode');

    useEffect(() => {
        if (!searchParams.get('mode')) {
            setSearchParams({ mode: 'login' });
        }
    }, []);

    useEffect(() => {
        dispatch(uiActions.setAuthErrorInfo({
            isActiveError: false,
            message: ''
        }));
    }, [authMode])

    return <div className={classes.formSectionWrapper}>

        <div className={classes.formWrapper}>
            <AuthDesignIcon />

            <h1>{isLogin ? 'Login to your Account' : 'Create your account'}</h1>
            <p>See what is going on with your business</p>
            {isLogin && <form onSubmit={handleLogin}>
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
            </form>}

            {(!isLogin && errorInfo.message !== 'Registration was successful') &&
                <form onSubmit={handleSignup}>
                    <label htmlFor="name">Your name *</label>
                    <input value={signupInputData.username} type="text" id="name" onChange={(event) => { handleChangeSignupData(event, 'username') }} />

                    <label htmlFor="login">Login *</label>
                    <input value={signupInputData.login} type="text" id="login" onChange={(event) => { handleChangeSignupData(event, 'login') }} />

                    <label htmlFor="pwd">Password *</label>
                    <input value={signupInputData.password} type="password" id="pwd" onChange={(event) => { handleChangeSignupData(event, 'password') }} />

                    <label htmlFor="repeat-pwd">Repeat password *</label>
                    <input value={signupInputData.repeatedPassword} type="password" id="repeat-pwd" onChange={(event) => { handleChangeSignupData(event, 'repeatedPassword') }} />

                    <label htmlFor="email">Email *</label>
                    <input value={signupInputData.email} type="email" id="email" onChange={(event) => { handleChangeSignupData(event, 'email') }} />

                    <label htmlFor="tel">Phone number</label>
                    <input value={signupInputData.phoneNumber} type="tel" id="tel" onChange={(event) => { handleChangeSignupData(event, 'phoneNumber') }} />

                    <button type="submit">Signup</button>
                </form>}

            {errorInfo.isActiveError && <div className={classes.errorBlock}>
                {errorInfo.message}
            </div>}

            {(!isLogin && errorInfo.message === 'Registration was successful') &&
                <div className={classes.successfulRegistrationBlock}>
                    <p>{errorInfo.message}</p>
                    <Link to="?mode=login">Login</Link>
                </div>}
        </div>

        <div className={classes.singupLinkWrapper}>

            {isLogin ? <>
                <p>Not Registered Yet?</p>
                <Link to="?mode=signup">Create an account</Link>
            </> : <>
                <p>Already registered?</p>
                <Link to="?mode=login">Login</Link>
            </>}

        </div>

        <OverflowCircle className={classes.overflowCircle} />

    </div >

}
export default AuthForm;