import classes from './RegistrationPage.module.css';

import AuthDesignIcon from '../../assets/img/icons/AuthenticationDesignIcon.svg?react';
import OverflowCircle from '../../assets/img/design/Authentication/overflowCircle.svg?react';

import type { UserRegistrationData } from '../../types/types';

import { useEffect } from 'react';
import { Link } from 'react-router';

import { useAppSelector, useAppDispatch } from '../../store/hooks';

import { uiActions } from '../../store/ui/uiSlice';

import { registrationDataValidation } from '../../validation';
import { registerNewUser } from '../../api/https';

import type { FormProps } from 'antd';
import { Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';





const RegistrationPage: React.FC = () => {

    const dispatch = useAppDispatch();


    const errorInfo = useAppSelector(state => state.ui.authErrorInfo);

    const handleSignup: FormProps<UserRegistrationData>['onFinish'] = async (signupData) => {

        try {
            const errorInformation = registrationDataValidation(signupData);
            dispatch(uiActions.setAuthErrorInfo(errorInformation));
            if (errorInformation.isActiveError) {
                return;
            }

            delete signupData.repeatedPassword;
            await registerNewUser(signupData);

            dispatch(uiActions.setAuthErrorInfo({
                isActiveError: false,
                message: 'Registration was successful'
            }));

        } catch (errorMessage) {

            dispatch(uiActions.setAuthErrorInfo(
                {
                    isActiveError: true,
                    message: errorMessage as string
                }
            ));
        }
    };

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
                <Form onFinish={handleSignup}>
                    <label htmlFor="name">Your name *</label>
                    <FormItem<UserRegistrationData>
                        name="username">
                        <Input id="name" />
                    </FormItem>

                    <label htmlFor="login">Login *</label>
                    <FormItem<UserRegistrationData>
                        name="login">
                        <Input id="login" />
                    </FormItem>

                    <label htmlFor="pwd">Password *</label>
                    <FormItem<UserRegistrationData>
                        name="password">
                        <Input type="password" id="pwd" />
                    </FormItem>

                    <label htmlFor="repeat-pwd">Repeat password *</label>
                    <FormItem<UserRegistrationData>
                        name="repeatedPassword">
                        <Input type="password" id="repeat-pwd" />
                    </FormItem>


                    <label htmlFor="email">Email *</label>
                    <FormItem<UserRegistrationData>
                        name="email">
                        <Input type="email" id="email" />
                    </FormItem>

                    <label htmlFor="tel">Phone number</label>
                    <FormItem<UserRegistrationData>
                        name="phoneNumber">
                        <Input type="tel" id="tel" />
                    </FormItem>

                    <button type="submit">Signup</button>
                </Form>}


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