import AddTodo from '../components/AddTodo/AddTodo';
import TodoFilter from '../components/TodoFilter/TodoFilter';
import TodosList from '../components/TodosList/TodosList'

import type { Todo, TodoInfo, MetaResponse, Category, ErrorInfo } from '../types/types';

import { useState, useEffect, useCallback } from "react";
import { fetchTodosData } from "../api/https";

import { Alert } from 'antd';

const TodoListPage: React.FC = () => {

    const [todosData, setTodosData] = useState<MetaResponse<Todo, TodoInfo>>({
        data: [],
        info: {
            all: 0,
            inWork: 0,
            completed: 0
        },
        meta: {
            totalAmount: 0
        }
    });
    const [currentCategory, setCurrentCategory] = useState<Category>('all');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorInfo, setErrorInfo] = useState<ErrorInfo>({ isActiveError: false, message: '' });

    const handleSelectCategory = useCallback((category: Category) => {
        setCurrentCategory(category);
    }, []);

    const handleSetErrorInfo = useCallback((error: ErrorInfo) => {
        setErrorInfo(error);
    }, [])

    const onClose: React.MouseEventHandler<HTMLButtonElement> = () => {
        handleSetErrorInfo({
            isActiveError: false,
            message: ''
        })
    };


    const refreshData = useCallback(async () => {
        try {
            const responseData = await fetchTodosData(currentCategory);
            setTodosData(responseData);
        }
        catch (error) {
            if (error instanceof Error) { // К такому вот подходу дошёл не сам, а загуглил.
                handleSetErrorInfo({
                    isActiveError: true,
                    message: error.message
                });
            }
        }
    }, [currentCategory]);

    useEffect(() => {
        (async function () {
            await refreshData();
        })();

        setIsLoading(false);

        const intervalId = setInterval(refreshData, 5000);
        return () => clearInterval(intervalId); //Про вот эту вот штуку - загуглил.
    }, [currentCategory]);


    return (
        <div className="wrapper">
            {errorInfo.isActiveError &&
                <Alert
                    title={errorInfo.message}
                    type="error"
                    closable={{ closeIcon: true, onClose, 'aria-label': 'close' }} />}

            <AddTodo
                refreshData={refreshData}
                setErrorInfo={handleSetErrorInfo} />

            <div className="wrapperOfAllList">

                {todosData.info && <TodoFilter
                    counts={todosData.info}
                    handleSelectCategory={handleSelectCategory}
                />
                }
                {todosData.info &&
                    <TodosList
                        todosData={todosData}
                        refreshData={refreshData}
                        isLoading={isLoading}
                        setErrorInfo={handleSetErrorInfo}
                    />
                }
            </div>
        </div>
    )
}

export default TodoListPage
