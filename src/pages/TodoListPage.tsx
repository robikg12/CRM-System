import AddTodo from '../components/AddTodo/AddTodo';
import TodoFilter from '../components/TodoFilter/TodoFilter';
import TodosList from '../components/TodosList/TodosList'

import type { Status, TodosData } from '../types/types';

import { useState, useEffect } from "react";
import { fetchItems } from "../api/https";



const TodoListPage: React.FC = () => {

    const [todosData, setTodosData] = useState<TodosData>({
        data: [],
        info: {
            all: null,
            inWork: null,
            completed: null
        },
        meta: {
            totalAmount: 0
        }
    });
    const [currentCategory, setCurrentCategory] = useState<string>('all');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Status>({ isValid: true, message: '' });


    async function handleSelectCategory(category: string) {
        setCurrentCategory(category);
        await refreshData(category);
    }



    async function refreshData(category: string = currentCategory) {
        try {
            const responseData = await fetchItems(category);

            // Дааа... Что-то явно идёт не так
            if (typeof responseData === 'object') {
                setTodosData(responseData);
            }
            else {
                alert(`Произошла ошибка связанная с серверной составляющей сайта. ${responseData}`);
            }

        }
        catch (error) {
            alert(`Не удалось получить записи${error}`);
        }
    }

    // Раньше state-функцию setError я передавал напрямую, без обёртывания в другую функцию, но 
    // теперь при TS я кажется понял, что если передам напрямую в другой компонент setError, то в дочернем
    // компоненте при указании типа этого пропса придётся указывать длинный непонятный тип, и видимо такой
    // подход в TS не распростанён.

    function recordError(error: Status) {
        setError(error);
    }



    useEffect(() => {
        (async function () {
            setIsLoading(true);
            await refreshData(currentCategory);
            setIsLoading(false);
        })();

    }, []);

    return (
        <div className="wrapper">
            <AddTodo refreshData={refreshData} recordError={recordError} />
            {!error.isValid && <div className="errorBlock">{error.message}</div>}
            <div className="wrapperOfAllList">
                <TodoFilter
                    currentCategory={currentCategory}
                    counts={todosData.info}
                    handleSelectCategory={handleSelectCategory}
                />

                <TodosList
                    todosData={todosData}
                    refreshData={refreshData}
                    isLoading={isLoading}
                    recordError={recordError} />
            </div>
        </div>
    )
}

export default TodoListPage
