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

    const rolesOfCurrentUser = useAppSelector(state => state.user.profile.roles);
    const isAdmin = rolesOfCurrentUser.includes('ADMIN');
    const isModerator = rolesOfCurrentUser.includes('MODERATOR');


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


    // Грубейшая халтура суть которой вот в чём:
    // У меня thunk функция checkAuth в себе проверяет токены, обновляет их т.д
    // Раздел пользователи был написан без redux (надеюсь я правильно понял, что его не нужно было использовать)
    // На странице "Пользователи" когда пройдёт 3 минуты и я её обновлю - меня выкенет, потому что ни один мой axios
    // запрос там не использует этот thunk.
    // Переделывать всё под axios interceptors будет давольно муторно, да может и не нужно, если в этой задаче нужно было
    // также использовать redux. В общем, прошу осветить этот вопрос в код ревью. 
    useEffect(() => {
        setInterval(async () => {
            await dispatch(checkAuth());
        }, 150000);
    }, []);



    if (status === 'idle' || status === 'pending') {
        return <Spin />
    }

    if (!isAuthorized && (status === 'fulfilled' || status === 'rejected')) {
        return <Navigate to='/authentication' />
    }

    if (isAuthorized && status === 'fulfilled' || status === 'rejected') {
        return <Flex style={{ minHeight: "100vh" }}>
            {contextHolder}
            <NavigationMenu isAdmin={isAdmin} isModerator={isModerator} />
            <Outlet context={{ handleSetErrorInfo: handleSetErrorInfo, isAdmin, isModerator }} />
        </Flex >
    }
}

export default RootLayout;