import classes from './ProfilePage.module.css';

import { useAppSelector, useAppDispatch } from "../../store/hooks";

import { getProfile } from '../../store/user-actions';
import { uiActions } from '../../store/ui-slice';
import { userActions } from "../../store/user-slice";
import { userLogout } from '../../api/https';

const ProfilePage: React.FC = () => {

    const dispatch = useAppDispatch();

    const profileData = useAppSelector((state) => state.user.userProfile);

    const handleLogout = async () => {
        await dispatch(getProfile()); //Добавил, чтобы убедиться, что access-токен свежий, хотя, наверное лишнее.

        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const errorResponse = await userLogout(accessToken);
            if (!errorResponse) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                dispatch(userActions.setDeniedStatus());
                return
            }
            dispatch(uiActions.setErrorInfo({ isActiveError: true, message: errorResponse }));
        }
    }

    return <><h1 style={{ marginLeft: '500px' }} >
        привет
    </ h1>
        <div>
            <p>Твоё имя: {profileData.username}</p>
            <p>Твоя почта: {profileData.email}</p>
            <p>Твой номер телефона: {profileData.phoneNumber}</p>
        </div>
        <button onClick={handleLogout} className={classes.logoutButton}>Logout</button>
    </>
}
export default ProfilePage;