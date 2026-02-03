import classes from './AuthenticationPage.module.css';

import AuthDesignIcon from '../../assets/img/icons/AuthenticationDesignIcon.svg?react';
import OverflowCircle from '../../assets/img/design/Authentication/overflowCircle.svg?react';



const AuthenticationPage: React.FC = () => {
    return  <div className={classes.formSectionWrapper}>

            <div className={classes.formWrapper}>
                <AuthDesignIcon />
                <h1>Login to your Account</h1>
                <p>See what is going on with your business</p>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" />

                <label htmlFor="pwd">Password</label>
                <input type="password" id="pwd" />

                <div className={classes.wrapperOfCheckboxAndLink}>
                    <input type="checkbox" id="checkbox" />
                    <label htmlFor="checkbox">Remember Me</label>
                    <a href="">Forgot Password?</a>
                </div>

                <button>Login</button>
            </div>

            <div className={classes.singupLinkWrapper}>
                <p>Not Registered Yet?</p><a href="">Create an account</a>
            </div>
            <OverflowCircle className={classes.overflowCircle} />
        </div>

}

export default AuthenticationPage;