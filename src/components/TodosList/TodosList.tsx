import React from 'react';

import TodoItem from '../TodoItem/TodoItem';

import { List, Spin } from 'antd';

import type { MetaResponse, Todo, TodoInfo, ErrorInfo } from '../../types/types';


const TodosList: React.FC<{
    todosData: MetaResponse<Todo, TodoInfo>;
    isLoading: boolean;
    refreshData: () => Promise<void>;
    setErrorInfo: (error: ErrorInfo) => void;

}> = ({ todosData, refreshData, isLoading, setErrorInfo }) => {



    return (
        <>
            {isLoading && <Spin />}
            {(!isLoading) && <List
                size="large"
                dataSource={todosData?.data}
                renderItem={(todo) => <List.Item >
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