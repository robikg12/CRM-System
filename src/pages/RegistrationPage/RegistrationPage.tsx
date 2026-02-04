import classes from './RegistrationPage.module.css';

import AuthDesignIcon from '../../assets/img/icons/AuthenticationDesignIcon.svg?react';
import OverflowCircle from '../../assets/img/design/Authentication/overflowCircle.svg?react';

import type { ClientSideUserRegistration } from '../../types/types';

import { useState, useEffect } from 'react';
import { Link } from 'react-router';

import { useAppSelector, useAppDispatch } from '../../store/hooks';

import { uiActions } from '../../store/ui-slice';

import { registrationDataValidation } from '../../validation';
import { registerNewUser } from '../../api/https';



const initialSignupData: ClientSideUserRegistration = {
    login: '',
    username: '',
    password: '',
    repeatedPassword: '',
    email: '',
    phoneNumber: ''
};

const RegistrationPage: React.FC = () => {

    const dispatch = useAppDispatch();

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


    const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault();

        const errorInformation = registrationDataValidation(signupInputData);
        dispatch(uiActions.setAuthErrorInfo(errorInformation));
        if (errorInformation.isActiveError) {
            return;
        }

        console.log(signupInputData);
        const resData = await registerNewUser(signupInputData);
        if ('isActiveError' in resData) {
            dispatch(uiActions.setAuthErrorInfo(resData));
            return;
        }
        dispatch(uiActions.setAuthErrorInfo({
            isActiveError: false,
            message: 'Registration was successful'
        }));

    }

    useEffect(() => {
        dispatch(uiActions.setAuthErrorInfo({
            isActiveError: false,
            message: ''
        }));
    }, [dispatch])

    return <>


        <div className={classes.formWrapper}>

            <AuthDesignIcon className={classes.authDesignIcon} />

            <h1>Create your account</h1>

            {(errorInfo.message !== 'Registration was successful') &&
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

            {(errorInfo.message === 'Registration was successful') &&
                <div className={classes.successfulRegistrationBlock}>
                    <p>{errorInfo.message}</p>
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