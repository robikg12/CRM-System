import classes from './UserCard.module.css';

import { useState } from 'react';

import { Link } from 'react-router-dom';

import { blockUser, deleteUser, unblockUser, updateUserRoles } from '../../api/https';

import { Modal, Button, Select, Tag } from 'antd';

import { UserOutlined, DeleteOutlined, EditOutlined, StopOutlined, SaveOutlined } from '@ant-design/icons';
import EnvelopeIcon from '../../assets/img/icons/envelope.svg?react';
import PhoneIcon from '../../assets/img/icons/phone.svg?react';
import ArrowIcon from '../../assets/img/icons/arrow.svg?react';

import type { Role, Profile, ErrorInfo } from '../../types/types';
import type { SelectProps } from 'antd';


type TagRender = SelectProps['tagRender'];

const options: SelectProps['options'] = [
    { value: 'USER' },
    { value: 'MODERATOR' },
    { value: 'ADMIN' }
];

const tagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
            color={value === 'USER' ? 'magenta' : value === 'MODERATOR' ? 'orange' : value === 'ADMIN' ? 'blue' : 'default'}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{ marginInlineEnd: 4 }}
        >
            {label}
        </Tag>
    );
};

type ActionToConfirm = 'block' | 'delete' | 'updateRoles' | null;

interface Props {
    user: Profile;
    isAdmin: boolean;
    isModerator: boolean;
    getUsers: () => Promise<void>;
    handleSetErrorInfo: (ErrorInfo: ErrorInfo) => void;
}

const UserCard: React.FC<Props> = ({ user, isAdmin, isModerator, getUsers, handleSetErrorInfo }) => {

    const [open, setOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [modalText, setModalText] = useState<string>('');
    const [actionToConfirm, setActionToConfirm] = useState<ActionToConfirm>(null);
    //единственное, что удалось придумать, 
    // чтобы разные функции использовали одно модальное окно.
    const [isRoleEditing, setIsRoleEditing] = useState<boolean>(false);
    const [editedRoles, setEditedRoles] = useState<Role[]>([]);

    const registrationDate = new Date(user.date);
    const formattedRegistrationDate = registrationDate.toLocaleDateString('ru-RU');

    const showModal = (actionToConfirm: ActionToConfirm) => {

        setActionToConfirm(actionToConfirm);
        if (actionToConfirm === 'block' && (isAdmin || isModerator)) {
            setModalText(`Вы уверены что хотите ${user.isBlocked ? 'разблокировать' : 'заблокировать'} пользователя ${user.username}?`);
            setOpen(true);
        }
        if (actionToConfirm === 'delete' && isAdmin) {
            setModalText(`Вы уверены, что хотите удалить пользователя ${user.username} ?`)
            setOpen(true);
        }
        if (actionToConfirm === 'updateRoles' && isAdmin) {
            setModalText(`Вы уверены, что хотите назначить пользователю ${user.username} роли: ${editedRoles.join(', ')}?`);
            setOpen(true);
        }
    };

    const handleConfirmModal = async () => {
        setConfirmLoading(true);
        if (actionToConfirm === 'block' && (isAdmin || isModerator)) {
            await handleChangeBlock();
        }
        if (actionToConfirm === 'delete' && isAdmin) {
            await handleDeleteUser();
        }
        if (actionToConfirm === 'updateRoles' && isAdmin) {
            await handleUpdateUserRoles();
        }

        setOpen(false);
        setConfirmLoading(false);
        setActionToConfirm(null);
        setModalText('');
    };

    const handleCancel = () => {
        setOpen(false);
        setActionToConfirm(null);
        setModalText('');
    };

    const handleChangeBlock = async () => {

        if (!(isAdmin || isModerator)) {
            return
        }
        try {
            if (!user.isBlocked) {
                await blockUser(user.id.toString());
            }
            else {
                await unblockUser(user.id.toString());
            }
            await getUsers();
        }
        catch (error) {
            handleSetErrorInfo({
                isActiveError: true,
                message: 'Не удалось изменить статус блокировки пользователя'
            });
        }
    }

    const handleDeleteUser = async () => {

        if (!isAdmin) {
            return
        }
        try {
            await deleteUser(user.id.toString());
            await getUsers();
        }
        catch (error) {
            handleSetErrorInfo({
                isActiveError: true,
                message: 'Не удалось удалить пользователя'
            });
        }
    }

    const handleUpdateUserRoles = async () => {
        if (!isAdmin) {
            return
        }
        try {
            await updateUserRoles(user.id.toString(), editedRoles);
            await getUsers();
        }
        catch {
            handleSetErrorInfo({
                isActiveError: true,
                message: 'Не удалось изменить роли пользователя'
            });
        }
        setIsRoleEditing(false);
    }

    return <div className={classes.card}>
        <div style={{ flexBasis: '16%' }}>
            {/*Чекбокс есть в дизайне, но не используется, лучше уберу его наверное <Checkbox /> */}
            <div className={classes.personIcon}>
                <UserOutlined style={{ fontSize: '18px', color: '#a0a0a0' }} />
            </div>
            <p>{user.username}</p>
        </div>

        <div style={{ flexBasis: '16%' }}>
            <EnvelopeIcon style={{ width: '20px', height: '20px' }} />
            {/* TODO: Добавить семантический email */}
            <p className={classes.emailAdress}>
                {user.email}
            </p>
        </div>

        <div style={{ flexBasis: '16%' }}>
            <PhoneIcon style={{ width: '20px', height: '20px' }} />
            <p className={classes.phoneNumber}>
                {user.phoneNumber}
            </p>
        </div>

        <div style={{ flexBasis: '16%' }}>
            {!isRoleEditing && user.roles.map((role) => {
                return <Tag
                    key={role}
                    color={role === 'USER' ? 'magenta' : role === 'MODERATOR' ? 'orange' : role === 'ADMIN' ? 'blue' : 'default'}
                    style={{ marginInlineEnd: 4 }}
                >
                    {role}
                </Tag>
            })
            }

            {isAdmin && <>
                {isRoleEditing && <Select
                    onChange={setEditedRoles}
                    mode="multiple"
                    tagRender={tagRender}
                    defaultValue={user.roles}
                    style={{ width: '100%' }}
                    options={options}
                />
                }

                {!isRoleEditing ? <EditOutlined onClick={() => { setIsRoleEditing(true) }} style={{ marginLeft: '20px', color: "#727272" }} /> :
                    <>
                        <SaveOutlined onClick={() => { showModal('updateRoles') }} style={{ fontSize: '20px', color: "#727272", marginLeft: '20px' }} />
                        <StopOutlined onClick={() => { setIsRoleEditing(false) }} style={{ fontSize: '20px', color: "#727272", margin: '0px 10px 0px 10px' }} />
                    </>}
            </>}
        </div>

        <div style={{ flexBasis: '16%' }}>
            <p className={classes.grayText}>{user.isBlocked ? "+" : '-'}</p>
        </div>

        <div style={{ flexBasis: '8%' }}>
            <p className={classes.grayText}>{formattedRegistrationDate}</p>
        </div>

        <div style={{ flexBasis: '8%' }}>
            {(isAdmin || isModerator) && <button onClick={() => { showModal('block') }} className={classes.blockButton}>
                {user.isBlocked ? 'разблок' : 'блок'}
            </button>}

            <Link to={`${user.id}`}>
                <button className={` ${classes.goToProfileButton} ${classes.blockButton}`}>
                    <ArrowIcon style={{ width: '12px', height: '8px' }} />
                </button>
            </Link>
        </div>

        <div style={{ flexBasis: '4%' }}>
            {isAdmin && <Button onClick={() => { showModal('delete') }} style={{ marginLeft: 'auto' }}>
                <DeleteOutlined />
            </Button>}
        </div>

        <Modal
            title="Подтвердите действие"
            open={open}
            onOk={handleConfirmModal}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <p>{modalText}</p>
        </Modal>
    </div >
}

export default UserCard;