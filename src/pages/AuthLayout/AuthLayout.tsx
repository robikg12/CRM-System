import { Outlet } from "react-router-dom";

import { useEffect } from "react";

import { useAppSelector } from "../../store/hooks";


import classes from './AuthLayout.module.css';


//Сначала пытался разместить картинку правильным способом для svg, но почему-то не отображались на ней некоторые 
//должные элементы (не те которые png, те которые png добавил отдельно), поэтому svg картинку добавил через обычный img
import authIllustration from '../../assets/img/design/Authentication/authenticationIllustration.svg';
import bigCirlce from '../../assets/img/design/Authentication/bigCircle.png';
import centerCircle from '../../assets/img/design/Authentication/centerCircleImage.png';

import { notification } from 'antd';
type NotificationType = 'success' | 'info' | 'warning' | 'error';



const AuthLayout: React.FC = () => {
    const [api, contextHolder] = notification.useNotification();

    const error = useAppSelector((state) => state.user.error);

    const openNotificationWithIcon = (type: NotificationType) => {

        api[type]({
            title: 'Ошибка!',
            description: error.message
        });
    };

    useEffect(() => {
        if (error.message === 'Серверная ошибка' || error.message === 'Ошибка =/' || error.message === 'Токен истёк') {

            openNotificationWithIcon('error');
        }

    }, [error.count]);

    return <div className={classes.pageWrapper}>
        {contextHolder}
        <div className={classes.illustrationWrapper}>
            <img src={authIllustration} className={classes.mainIllustration} alt="" />
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