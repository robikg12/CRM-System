import classes from './ProfilePage.module.css';

import { useAppSelector, useAppDispatch } from "../../store/hooks";

import { logout } from '../../store/user/userActions';

import { Typography, Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';




const { Title } = Typography;

const ProfilePage: React.FC = () => {


    const dispatch = useAppDispatch();

    const profileData = useAppSelector((state) => state.user.profile);

    const handleLogout = async () => {
        await dispatch(logout());
    }



    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Ваше имя',
            children: profileData.username,
        },
        {
            key: '2',
            label: 'Ваша почта',
            children: profileData.email,
        },
        {
            key: '3',
            label: 'Ваш номер телефона',
            children: profileData.phoneNumber,
        }
    ];


    return <>
        <Title>
            привет
        </ Title>
        {profileData && <div style={{ width: '30%', padding: '0px 40px 0px 40px' }}><Descriptions title="Данные" items={items} layout='vertical' /></div>}
        <button onClick={handleLogout} className={classes.logoutButton}>Logout</button>
    </>


}
export default ProfilePage;