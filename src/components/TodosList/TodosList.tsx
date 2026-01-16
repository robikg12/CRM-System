import React from 'react';

import TodoItem from '../TodoItem/TodoItem';

import classes from './TodosList.module.css';

import type { Todo, TodoInfo, MetaResponse, ErrorInfo } from '../../types/types';

import { List } from 'antd';

const TodosList: React.FC<{
    todosData: MetaResponse<Todo, TodoInfo>;
    isLoading: boolean;
    refreshData: () => Promise<void>;
    setErrorInfo: (error: ErrorInfo) => void;

}> = ({ todosData, refreshData, isLoading, setErrorInfo }) => {
    
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
                        refreshData={refreshData}
                        setErrorInfo={setErrorInfo}
                    />
                </List.Item>}
            />
            }
        </>
    );

}

export default TodosList;