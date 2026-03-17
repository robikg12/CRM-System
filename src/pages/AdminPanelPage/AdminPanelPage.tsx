import classes from './AdminPanelPage.module.css';

import UserCard from '../../components/UserCard/UserCard';

import { useState, useEffect } from 'react';
import { useOutletContext, Navigate } from 'react-router';

import { fetchUsers } from '../../api/https';


import FilterIcon from '../../assets/img/icons/filter.svg?react';
import VerticalArrow from '../../assets/img/icons/verticalArrow.svg?react';

import { Typography, Divider, Form, Input, List, Pagination, Select } from 'antd';


import type { ErrorInfo } from '../../types/types.ts';
import type { UserFilters, UsersMetaResponse, User } from '../../types/types.ts';
import type { FormProps, PaginationProps } from 'antd';

const { Title } = Typography;


type FieldType = {
    username?: string;
};

const AdminPanel: React.FC = () => {

    const { isAdmin, isModerator, handleSetErrorInfo } = useOutletContext<
        {
            isAdmin: boolean,
            isModerator: boolean,
            handleSetErrorInfo: (ErrorInfo: ErrorInfo) => void
        }>();
    const [usersInfo, setUsersInfo] = useState<UsersMetaResponse<User>>({
        data: [],
        meta: {
            totalAmount: 0,
            sortBy: 'id',
            sortOrder: 'asc'
        }
    });

    const [filterParams, setFilterParams] = useState<UserFilters>({
        sortOrder: 'asc'
    });



    const getUsers = async (params: UserFilters) => {

        if (!(isAdmin || isModerator)) {
            return
        }
        try {
            const usersInfo = await fetchUsers(params);
            setUsersInfo(usersInfo);
        }
        catch (error) {
            handleSetErrorInfo({
                isActiveError: true,
                message: 'Не удалось получить пользователей'
            });
        }
    }

    const onChangePagination: PaginationProps['onChange'] = (pageNumber) => {

        if (!(isAdmin || isModerator)) {
            return
        }

        setFilterParams(params => {
            return {
                ...params,
                page: pageNumber - 1
            }
        })
    };

    const handleChangeSortBy = (sortBy: 'id' | 'email' | 'username') => {

        if (!(isAdmin || isModerator)) {
            return
        }

        setFilterParams(params => {
            return {
                ...params,
                sortBy: sortBy,
                sortOrder: 'asc'
            }
        })
    }

    const handleChangeSortDirection = (sortOrder: 'asc' | 'desc') => {

        if (!(isAdmin || isModerator)) {
            return
        }
        setFilterParams(params => {
            return {
                ...params,
                sortOrder: sortOrder
            }
        })
    }

    const searchByName: FormProps<FieldType>['onFinish'] = (values) => { //TODO: Название функции неправильное

        if (!(isAdmin || isModerator)) {
            return
        }

        setFilterParams(params => {
            return {
                ...params,
                search: values.username
            }
        });
    };

    const handleSortIsBlocked = (value: 'all' | 'blocked' | 'unblocked') => {

        if (!isAdmin) {
            return
        }

        if (value === 'blocked' || value === 'unblocked') {
            setFilterParams(params => {
                return {
                    ...params,
                    isBlocked: value === 'blocked' ? true : false
                }
            });
            return;
        }

        if ('isBlocked' in filterParams) {
            setFilterParams(params => {
                delete params.isBlocked;
                return {
                    ...params,
                }
            });
        }
    }


    useEffect(() => {
        (async () => {
            await getUsers(filterParams);
        })();

    }, [filterParams]);


    if (!(isAdmin || isModerator)) {
        return <Navigate to="/" />
    }

    return <div className={classes.pageWrapper}>
        <Title className={classes.pageTitle}>Пользователи</Title>
        <Divider size="large" />

        <div className={classes.userListSection}>

            <Form
                className={classes.filterForm}
                onFinish={searchByName}
            >
                <Title level={3} style={{ margin: '0px auto 0px 0px' }}>Пользователи</Title>
                <Form.Item name="username">
                    <Input disabled={!(isAdmin || isModerator)} className={classes.filterInput} />
                </Form.Item>
                <button type='submit' className={classes.filterButton} disabled={!(isAdmin || isModerator)}>
                    <FilterIcon style={{ width: '16px', height: '16px' }} />
                    Filter
                </button>
            </Form>

            <div className={classes.tableHeader}>
                <div style={{ flexBasis: '16%' }}>
                    <p
                        className={`${filterParams.sortBy === 'username' ? classes.activeColumnTitle : ''}`}
                        onClick={() => { handleChangeSortBy('username') }}>
                        Имя
                    </p>
                    <div>
                        <VerticalArrow
                            className={`${(filterParams.sortBy === 'username' && filterParams.sortOrder === 'asc') ? classes.activeSortOrder : ''}`}
                            onClick={() => { handleChangeSortDirection('asc') }} />
                        <VerticalArrow
                            className={`${(filterParams.sortBy === 'username' && filterParams.sortOrder === 'desc') ? classes.activeSortOrder : ''}`}
                            onClick={() => { handleChangeSortDirection('desc') }} />
                    </div>
                </div>
                <div style={{ flexBasis: '16%' }}>
                    <p
                        className={`${filterParams.sortBy === 'email' ? classes.activeColumnTitle : ''}`}
                        onClick={() => { handleChangeSortBy('email') }} >
                        Email
                    </p>
                    <div>
                        <VerticalArrow
                            className={`${(filterParams.sortBy === 'email' && filterParams.sortOrder === 'asc') ? classes.activeSortOrder : ''}`}
                            onClick={() => { handleChangeSortDirection('asc') }}
                        />
                        <VerticalArrow
                            className={`${(filterParams.sortBy === 'email' && filterParams.sortOrder === 'desc') ? classes.activeSortOrder : ''}`}
                            onClick={() => { handleChangeSortDirection('desc') }}
                        />
                    </div>
                </div>
                <div style={{ flexBasis: '16%' }}>Телефон</div>
                <div style={{ flexBasis: '16%' }}>Роли</div>
                <div style={{ flexBasis: '16%' }}>Статус блокировки</div>
                <div style={{ flexBasis: '16%' }}>Дата регистрации</div>
                {isAdmin && <div style={{ flexBasis: '9%' }}>
                    <Select
                        defaultValue='all'
                        style={{ width: 210, backgroundColor: '#F9F9F9' }}
                        onChange={handleSortIsBlocked}
                        options={[
                            { value: 'all', label: 'Все пользователи' },
                            { value: 'blocked', label: 'Заблокированные' },
                            { value: 'unblocked', label: 'Незаблокированные' },
                        ]}
                    />
                </div>}
            </div>


            {usersInfo.data ? < List //Добавил проверочку, а то если ввести несуществующее имя, то страница выпадет в ошибку.
                style={{ padding: '6px 0px 6px 0px' }}
                size="large"
                dataSource={usersInfo.data}
                renderItem={(user) => <List.Item
                    style={{ padding: '0px', margin: '0px 0px 13px 0px' }}
                    key={user.id}>
                    <UserCard
                        user={user}
                        isAdmin={isAdmin}
                        isModerator={isModerator}
                        getUsers={async () => { await getUsers(filterParams) }}
                        handleSetErrorInfo={handleSetErrorInfo} />
                </List.Item>}
            /> : <p>Пользователей нет</p>}

            {(isAdmin || isModerator) && (usersInfo.meta.totalAmount) > 20 && < Pagination
                defaultCurrent={1}
                total={usersInfo.meta.totalAmount}
                pageSize={20}
                showSizeChanger={false}
                onChange={onChangePagination}
            />}


        </div>
    </div >
}

export default AdminPanel;