import { Outlet } from "react-router-dom";
import { Flex } from "antd";
import NavigationMenu from "../components/NavigationMenu";

import { useEffect, useState, useCallback } from "react";

import { Navigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from '../store/hooks';

import { checkAuth } from "../store/user/userActions";

import { notification, Spin } from 'antd';

import type { ErrorInfo } from '../types/types.ts';

type NotificationType = 'success' | 'info' | 'warning' | 'error';


const RootLayout: React.FC = () => {

    const dispatch = useAppDispatch();
    const [api, contextHolder] = notification.useNotification();

    const { status, error: userError, isAuthorized } = useAppSelector(state => state.user);

    const [errorInfo, setErrorInfo] = useState<ErrorInfo>({ isActiveError: false, message: '' });

    const handleSetErrorInfo = useCallback((error: ErrorInfo) => {
        setErrorInfo(error);
    }, [])


    const openNotificationWithIcon = (type: NotificationType) => {

        api[type]({
            title: 'Ошибка!',
            description: userError.message || errorInfo.message
        });
    };

    useEffect(() => {

        (async () => {
            if (status === 'idle') {
                await dispatch(checkAuth());
            }
        })();
    }, [dispatch, status]);

    useEffect(() => {
        if (userError.message || errorInfo.message) {
            openNotificationWithIcon('error');
        }
    }, [userError.count, errorInfo]);



    if (status === 'idle' || status === 'pending') {
        return <Spin />
    }

    if (!isAuthorized) {
        return <Navigate to='/authentication' />
    }

    if (isAuthorized) {
        return <Flex style={{ minHeight: "100vh" }}>
            {contextHolder}
            <NavigationMenu />
            <Outlet context={handleSetErrorInfo} />
        </Flex >
    }
}

export default RootLayout;