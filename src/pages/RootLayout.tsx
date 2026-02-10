import { Outlet } from "react-router-dom";
import { Flex } from "antd";
import NavigationMenu from "../components/NavigationMenu";

import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from '../store/hooks';

import { refreshAccessToken } from '../api/https.ts';

import { getProfile } from "../store/user/user-actions";
import { userActions } from "../store/user/user-slice";

import { notification } from 'antd';
type NotificationType = 'success' | 'info' | 'warning' | 'error';


const RootLayout: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [api, contextHolder] = notification.useNotification();

    const { status, error } = useAppSelector(state => state.user.asyncData);
    const isAuthorized = useAppSelector(state => state.user.isAuthorized);
    const errorInfo = useAppSelector(state => state.ui.errorInfo);
    const todoFetchingError = useAppSelector(state => state.todos.asyncData.error);

    const authorize = async () => {

        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
            dispatch(userActions.setIsAuthorized(false));
            return navigate('/authentication');
        }

        try {
            const tokens = await refreshAccessToken(refreshToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);

            await dispatch(getProfile(tokens.accessToken));

            if (status === 'rejected') {
                return navigate('/authentication');

            }

            dispatch(userActions.setIsAuthorized(true));
        }
        catch (error) {
            dispatch(userActions.setIsAuthorized(false));
            return navigate('/authentication');
        }
    }

    const openNotificationWithIcon = (type: NotificationType) => {

        api[type]({
            title: 'Ошибка!',
            description: error?.message || errorInfo.message || todoFetchingError?.message
        });
    };

    useEffect(() => {

        (async () => {
            if (status === 'idle') {
                await authorize();
            }
        })();
    }, [dispatch, status]);

    useEffect(() => {
        if (errorInfo.isActiveError || error?.isActiveError || todoFetchingError?.isActiveError) {
            openNotificationWithIcon('error');
        }
    }, [errorInfo, error, todoFetchingError]);



    if (status === 'idle' || status === 'pending') {
        return 'Загрузка...'
    }

    if (isAuthorized) {
        return <Flex style={{ minHeight: "100vh" }}>
            {contextHolder}
            <NavigationMenu />
            <Outlet />
        </Flex >
    }
}

export default RootLayout;