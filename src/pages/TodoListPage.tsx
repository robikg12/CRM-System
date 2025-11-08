import AddTodo from '../components/AddTodo/AddTodo';
import TodoFilter from '../components/TodoFilter/TodoFilter';
import TodosList from '../components/TodosList/TodosList'

import type { Status, TodosData } from '../types/types';

import { useState, useEffect } from "react";
import { fetchItems } from "../api/https";



const TodoListPage: React.FC = () => {

    const [todosData, setTodosData] = useState<TodosData>({
        todos: [],
        counts: {
            all: null,
            inWork: null,
            completed: null
        }
    });
    const [currentCategory, setCurrentCategory] = useState<string>('all');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Status>({ isValid: true, message: '' });


    async function handleSelectCategory(category: string) {
        setCurrentCategory(category);
        await refreshData(category);
    }



    async function refreshData(category?: string) {
        try {
            const responseData = await fetchItems(category ?? currentCategory);

            // Дааа... Что-то явно идёт не так
            if (responseData &&
                typeof responseData === 'object' &&
                "data" in responseData && "info" in responseData &&
                Array.isArray(responseData.data) &&
                (responseData.data.length === 0 || ("created" in responseData.data[0] && "id" in responseData.data[0] && "isDone" in responseData.data[0] && "title" in responseData.data[0])) &&
                responseData.info &&
                typeof responseData.info === 'object' &&
                ("all" in responseData.info && "completed" in responseData.info && "inWork" in responseData.info) &&
                (typeof responseData.info.all === 'number' && typeof responseData.info.inWork === 'number' && typeof responseData.info.completed === 'number')
            ) {
                setTodosData({
                    todos: responseData.data,
                    counts: {
                        all: responseData.info.all,
                        completed: responseData.info.completed,
                        inWork: responseData.info.inWork
                    }
                });
            }
            else {
                alert('Произошла ошибка связанная с серверной составляющей сайта.');
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
                    todosData={todosData}
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
