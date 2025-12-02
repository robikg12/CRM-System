import TodoItem from '../TodoItem/TodoItem';

import React from 'react';

import classes from './TodosList.module.css';

import type { Todo, TodoInfo, MetaResponse } from '../../types/types';

const TodosList: React.FC<{
    todosData: MetaResponse<Todo, TodoInfo>;
    isLoading: boolean;
    refreshData: () => Promise<void>;

}> = ({ todosData, refreshData, isLoading }) => {


    return (
        <>
            {/* Тут немного схалтурил, не стал добавлять antd на этом компоненте 
                так как элементы простые, да и посмотрел, компонент List в antd
                написано, что устарел. Надеюсь прокатит */}
            {isLoading && <p className={classes.lodaingText}>Загрузочка...</p>}
            {(!isLoading) && <ul className={classes.list}> {(todosData.data.map((todo) => {
                return <TodoItem key={todo.id}
                    todo={todo}
                    refreshData={refreshData}
                />
            }))}</ul>
            }
        </>
    );

}

export default React.memo(TodosList);