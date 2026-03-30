import classes from './UserProfilePage.module.css';

import { useState, useEffect } from 'react';

import { useParams, Link, useOutletContext, Navigate } from 'react-router-dom';

import { fetchUser } from '../../api/https';

import { Typography, Divider, Button, Form, Input } from 'antd';

import { StopOutlined, FormOutlined, SaveOutlined } from '@ant-design/icons';

import { isRusAndEngLettersRegexp, isValidRusPhoneRegexp } from '../../validation';

import { updateUserProfile } from '../../api/https.ts';

import type { Profile, UserRequest, ErrorInfo } from '../../types/types';
import type { FormProps } from 'antd';





const { Title } = Typography;

const UserProfilePage: React.FC = () => {

    const { isAdmin, isModerator, handleSetErrorInfo } = useOutletContext<
        {
            isAdmin: boolean,
            isModerator: boolean,
            handleSetErrorInfo: (ErrorInfo: ErrorInfo) => void
        }>();

    const { userId } = useParams();
    const [userInfo, setUserInfo] = useState<Profile>({
        id: 0,
        username: '',
        email: '',
        date: '',
        isBlocked: true,
        roles: [],
        phoneNumber: ''
    });

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const onEditProfile: FormProps<UserRequest>['onFinish'] = async (userData) => {

        if (!(isAdmin || isModerator)) {
            return
        }
        if (!userId) {
            return
        }
        try {
            // Здесь я допёр, что нужно передавать только изменённые поля. Из-за сообщения во флудилке чата о том, 
            // что здесь подвох, обратил внимание, что у запроса вопросики ("?") стоят у полей, сообразил, что задумка
            // такая, чтобы бек не нагружать повторяющимися данными.
            for (let key in userData) {
                if (userData[key as keyof UserRequest] === userInfo[key as keyof UserRequest]) { //Выскакивала ошибка, загуглил про keyof
                    delete userData[key as keyof UserRequest]
                }
            }

            const updatedUserInfo = await updateUserProfile(userId, userData);
            setUserInfo(updatedUserInfo);
            setIsEditing(false);
        }
        catch (error) {
            setIsEditing(false);
            handleSetErrorInfo({
                isActiveError: true,
                message: 'Не удалось отредактировать данные пользователя'
            });
        }
    };


    useEffect(() => {
        if (typeof userId !== 'string') { //написал вот так вот вместо !userId на случай вдруг есть id - 0
            return
        }
        (async () => {
            try {
                const userInfo = await fetchUser(userId);
                setUserInfo(userInfo);

            }
            catch (error) {
                handleSetErrorInfo({
                    isActiveError: true,
                    message: 'Не удалось получить данные пользователя'
                });
            }
        })()
    }, [])


    if (!(isAdmin || isModerator)) {
        return <Navigate to="/" />
    }

    return <div className={classes.pageWrapper}>
        <Title className={classes.pageTitle}>Пользователь {userInfo.username}</Title>
        <Divider size="large" />

        <div className={classes.userInfoBlock}>
            {!isEditing && <>
                <div>
                    <p>Имя</p>
                    <p>{userInfo.username}</p>
                </div>

                <div>
                    <p>Email</p>
                    <p>{userInfo.email}</p>
                </div>

                <div>
                    <p>Номер телефона</p>
                    <p>{userInfo.phoneNumber}</p>
                </div>
            </>}

            {isEditing && <Form
                id="updateProfileForm" //Загуглил, что можно вне формы разместить submit button
                onFinish={onEditProfile}
                style={{ display: 'flex', flexGrow: '1' }}>
                <div>
                    <p>Имя</p>
                    <Form.Item<UserRequest>
                        name="username"
                        initialValue={userInfo.username}
                        rules={[
                            { required: true, whitespace: true, message: "Введите имя" },
                            { min: 1, max: 60, pattern: isRusAndEngLettersRegexp, message: "Имя должно содержать от 1 до 60 символов русского или латинского алфавита" }
                        ]}>
                        <Input />
                    </Form.Item>
                </div>

                <div>
                    <p>Email</p>
                    <Form.Item<UserRequest>
                        name="email"
                        initialValue={userInfo.email}
                        rules={[
                            {
                                type: 'email',
                                message: 'Введите корректный адрес электронной почты',
                            },
                            {
                                required: true,
                                message: 'Введите адрес электронной почты',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                </div>

                <div>
                    <p>Номер телефона</p>
                    <Form.Item<UserRequest> name="phoneNumber"
                        initialValue={userInfo.phoneNumber}
                        rules={[{
                            pattern: isValidRusPhoneRegexp, message: 'Введите номер телефона'
                        }]}>
                        <Input />
                    </Form.Item>
                </div>
            </Form>}

            {!isEditing && < div >
                <Button onClick={() => { setIsEditing(true) }} type="primary">
                    <FormOutlined style={{ fontSize: '22px' }} />
                </Button>
            </div>
            }
            {isEditing && < div >
                <Button htmlType='submit' form='updateProfileForm' type="primary" >
                    <SaveOutlined style={{ fontSize: '22px' }} />
                </Button>
                <Button onClick={() => { setIsEditing(false) }} color='yellow' variant='solid'>
                    <StopOutlined style={{ fontSize: '22px' }} />
                </Button>
            </div>
            }
        </div>


        <Link to=".." relative="path">
            <Button color='primary' variant='outlined' style={{ marginLeft: '20px' }}>
                Вернутся
            </Button>
        </Link>

    </div >
}

export default UserProfilePage;