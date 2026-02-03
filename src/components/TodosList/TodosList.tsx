import React from 'react';

import TodoItem from '../TodoItem/TodoItem';

import classes from './TodosList.module.css';

import { List } from 'antd';

import { useAppSelector } from '../../store/hooks';

const TodosList: React.FC = () => {

    const isLoading = useAppSelector((state) => state.ui.isLoading);
    const todosData = useAppSelector((state) => state.todos.todosData);

    return (
        <>
            {isLoading && <p className={classes.loadingText}>Загрузочка...</p>}
            {(!isLoading) && <List
                size="large"
                dataSource={todosData.data}
                renderItem={(todo) => <List.Item style={{ padding: '5px 0px 5px 0px' }}>
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                    />
                </List.Item>}
            />
            }
        </>
    );

}

export default TodosList;