import { Outlet } from "react-router-dom";

import classes from './AuthLayout.module.css';


//Сначала пытался разместить картинку правильным способом для svg, но почему-то не отображались на ней некоторые 
//должные элементы (не те которые png, те которые png добавил отдельно), поэтому svg картинку добавил через обычный img
import AuthIllustrationn from '../../assets/img/design/Authentication/authenticationIllustration.svg';
import bigCirlce from '../../assets/img/design/Authentication/bigCircle.png';
import centerCircle from '../../assets/img/design/Authentication/centerCircleImage.png';

const AuthLayout: React.FC = () => {

    return <div className={classes.pageWrapper}>
        <div className={classes.illustrationWrapper}>
            <img src={AuthIllustrationn} className={classes.mainIllustration} />
            <img src={bigCirlce} className={classes.leftTopCircle} alt="" />
            <img src={centerCircle} className={classes.centerCircle} alt="" />

            <h2>Turn your ideas into reality.</h2>
            <h3>Start for free and get attractive offers from the community</h3>

        </div>
        <div className={classes.formSectionWrapper}>
            <Outlet />
        </div>
    </div >
}

export default AuthLayout;