import classes from './ProfilePage.module.css';

import { useNavigate } from 'react-router';

import { useAppSelector, useAppDispatch } from "../../store/hooks";

import { userLogout } from '../../api/https';

import { userActions } from '../../store/user/userSlice';
import { uiActions } from '../../store/ui/uiSlice';

const ProfilePage: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const profileData = useAppSelector((state) => state.user.asyncData.data);

    const handleLogout = async () => {

        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken || !accessToken) { //на всякий случай
            dispatch(userActions.setIsAuthorized(false));
            return navigate('/authentication');
        }

        try {

            await userLogout(accessToken);
            dispatch(userActions.setIsAuthorized(false));
            localStorage.removeItem('refreshToken');
            return navigate('/authentication');
        }
        catch (error) {

            dispatch(uiActions.setErrorInfo({
                isActiveError: true,
                message: error as string
            }));
            localStorage.removeItem('refreshToken');
            dispatch(userActions.setIsAuthorized(false));
            return navigate('/authentication');
        }
    }

    return <><h1 style={{ marginLeft: '500px' }} >
        привет
    </ h1>
        {profileData && <div>
            <p>Твоё имя: {profileData.username}</p>
            <p>Твоя почта: {profileData.email}</p>
            <p>Твой номер телефона: {profileData.phoneNumber}</p>
        </div>}
        <button onClick={handleLogout} className={classes.logoutButton}>Logout</button>
    </>
}
export default ProfilePage;