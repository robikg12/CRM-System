import AddTodo from '../components/AddTodo/AddTodo';
import TodoFilter from '../components/TodoFilter/TodoFilter';
import TodosList from '../components/TodosList/TodosList'

import type { Todo, TodoInfo, MetaResponse, Category } from '../types/types';

import { useState, useEffect, useCallback } from "react";
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


    const handleSelectCategory = useCallback((category: Category) => {
        setCurrentCategory(category);
    }, [])


    const refreshData = useCallback(async () => {
        try {
            const responseData = await fetchTodosData(currentCategory);
            setTodosData(responseData);
        }
        catch (error) {
            alert(`Не удалось получить записи${error}`);
        }
    }, [todosData, currentCategory]);

    useEffect(() => {
        (async function () {
            await refreshData();
            if (isLoading) {
                setIsLoading(false); //Думал как сделать useCallback/memo для стейта isLoading, а потом подумал
                //  просто оставить, не делать, так как он менятся только один раз при начальном useEffect.
                // Правда, на случай, если isLoading был false и когда я пишу setIsLoading(false) это считается за
                // изменение стейта (не знаю), то на всякий случай добавил if
            }
        })();

        const intervalId = setInterval(refreshData, 5000);
        return () => clearInterval(intervalId); //Про вот эту вот штуку - загуглил.
    }, [currentCategory]);



    return (
        <div className="wrapper">
            <AddTodo refreshData={refreshData} />
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
                    />
                }
            </div>
        </div>
    )
}

export default TodoListPage
