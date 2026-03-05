import AddTodo from '../components/AddTodo/AddTodo';
import TodoFilter from '../components/TodoFilter/TodoFilter';
import TodosList from '../components/TodosList/TodosList'

import type { Todo, TodoInfo, MetaResponse, Category, ErrorInfo } from '../types/types';

import { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";



import { fetchTodos } from "../api/https";



const TodoListPage: React.FC = () => {

    const { handleSetErrorInfo: setErrorInfo } = useOutletContext<{ handleSetErrorInfo: (ErrorInfo: ErrorInfo) => void }>();
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

    const handleSelectCategory = useCallback((category: Category) => {
        setCurrentCategory(category);
    }, []);



    const refreshData = useCallback(async () => {
        try {
            const responseData = await fetchTodos(currentCategory);
            setTodosData(responseData);
        }
        catch (error) {
            if (error instanceof Error) { // К такому вот подходу дошёл не сам, а загуглил.
                setErrorInfo({
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
        return () => clearInterval(intervalId);
    }, [currentCategory]);


    return (
        <div className="wrapper">

            <AddTodo
                refreshData={refreshData}
                setErrorInfo={setErrorInfo} />

            <div className="wrapperOfAllList">

                {todosData?.info && <TodoFilter
                    counts={todosData.info}
                    handleSelectCategory={handleSelectCategory}
                    currentCategory={currentCategory}
                />}

                {todosData?.info && <TodosList
                    todosData={todosData}
                    refreshData={refreshData}
                    isLoading={isLoading}
                    setErrorInfo={setErrorInfo}
                />}
            </div>
        </div>
    )
}

export default TodoListPage
