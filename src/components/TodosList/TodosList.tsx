import React from 'react';

import TodoItem from '../TodoItem/TodoItem';

import classes from './TodosList.module.css';

import { List } from 'antd';

import { useAppSelector } from '../../store/hooks';

const TodosList: React.FC = () => {

    const todosData = useAppSelector((state) => state.todos.todos);

    return (
        <>
            {!todosData && <p className={classes.loadingText}>Загрузочка...</p>}

            {todosData && <List
                size="large"
                dataSource={todosData?.data}
                renderItem={(todo) => <List.Item >
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