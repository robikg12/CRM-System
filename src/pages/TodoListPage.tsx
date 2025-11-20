import AddTodo from '../components/AddTodo/AddTodo';
import TodoFilter from '../components/TodoFilter/TodoFilter';
import TodosList from '../components/TodosList/TodosList'

import type { Todo, TodoInfo, MetaResponse, Status, Category } from '../types/types';

import { useState, useEffect } from "react";
import { fetchTodosData } from "../api/https";



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
    const [error, setError] = useState<Status>({ isValid: true, message: '' });


    async function handleSelectCategory(category: Category) {
        setCurrentCategory(category);
    }



    async function refreshData() {
        try {
            const responseData = await fetchTodosData(currentCategory);
            setTodosData(responseData);


        }
        catch (error) {
            alert(`Не удалось получить записи${error}`);
        }
    }


    function recordError(error: Status) {
        setError(error);
    }



    useEffect(() => {
        (async function () {
            await refreshData();
            setIsLoading(false);
        })();

    }, [currentCategory]);

    return (
        <div className="wrapper">
            <AddTodo refreshData={refreshData} recordError={recordError} />
            {!error.isValid && <div className="errorBlock">{error.message}</div>}
            <div className="wrapperOfAllList">

                {todosData.info && <TodoFilter
                    currentCategory={currentCategory}
                    counts={todosData.info}
                    handleSelectCategory={handleSelectCategory}
                />
                }
                {todosData.info &&
                    <TodosList
                        todosData={todosData}
                        refreshData={refreshData}
                        isLoading={isLoading}
                        recordError={recordError} />
                }
            </div>
        </div>
    )
}

export default TodoListPage
