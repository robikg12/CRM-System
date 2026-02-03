import { Outlet } from "react-router-dom";
import { Flex } from "antd";
import NavigationMenu from "../components/NavigationMenu";

import { useEffect } from "react";

import { Navigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from '../store/hooks';

import { getProfile } from "../store/user-actions";

import { notification } from 'antd';
type NotificationType = 'success' | 'info' | 'warning' | 'error';


const RootLayout: React.FC = () => {

    const dispatch = useAppDispatch();
    const [api, contextHolder] = notification.useNotification();

    const profileFetchingStatus = useAppSelector((state) => state.user.fetchingStatus);
    const errorInfo = useAppSelector((state) => state.ui.errorInfo);

    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            title: 'Ошибка!',
            description: errorInfo.message
        });
    };

    useEffect(() => {

        if (profileFetchingStatus === 'idle') {
            dispatch(getProfile());
        }
    }, [dispatch, profileFetchingStatus]);

    useEffect(() => {
        if (errorInfo.isActiveError) {
            openNotificationWithIcon('error');
        }
    }, [errorInfo]);






    if (profileFetchingStatus === 'idle' || profileFetchingStatus === 'loading') {
        return 'Загрузка...'
    }

    if (profileFetchingStatus === 'denied') {
        return <Navigate to='/authentication' />
    }
    if (profileFetchingStatus === 'good') {
        return <Flex style={{ minHeight: "100vh" }}>
            {contextHolder}
            <NavigationMenu />
            <Outlet />
        </Flex >
    }
}

export default RootLayout;