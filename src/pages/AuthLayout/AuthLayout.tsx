import { Outlet } from "react-router-dom";

import classes from './AuthLayout.module.css';

import AuthIllustration from '../../assets/img/design/Authentication/authenticationIllustration.svg?react';
import bigCirlce from '../../assets/img/design/Authentication/bigCircle.png';

const AuthLayout: React.FC = () => {

    return <div className={classes.pageWrapper}>
        <div className={classes.illustrationWrapper}>
            <AuthIllustration />
            <img src={bigCirlce} alt="" />
        </div>

        <Outlet />
    </div >
}

export default AuthLayout;