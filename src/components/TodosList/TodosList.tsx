import React from 'react';

import TodoItem from '../TodoItem/TodoItem';

import classes from './TodosList.module.css';

import { List } from 'antd';

import { useAppSelector } from '../../store/hooks';

const TodosList: React.FC = () => {
    
    const todosData = useAppSelector((state) => state.todos.asyncData.data);

    return (
        <>
            {/* TODO Разобрать из бестпрактикс про готовые именя для 'idle'/'pending' */}
            {!todosData && <p className={classes.loadingText}>Загрузочка...</p>}
            {/* Временный хитрый код - проверяет была ли первая прогрузка туду данных, чтобы не использовать 'idle'/'pending'... */}
            {todosData && <List
                size="large"
                dataSource={todosData?.data}
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