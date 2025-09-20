import AddTodo from "../components/AddTodo/AddTodo";
import TodoFilter from "../components/TodoFilter/TodoFilter";
import TodosList from "../components/TodosList/TodosList"

import { useState, useEffect } from "react";
import { fetchItems } from "../api/https";

function TodoListPage() {

    const [todosData, setTodosData] = useState({
        todos: [],
        counts: {
            all: null,
            inWork: null,
            completed: null
        }
    });
    const [currentCategory, setCurrentCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ isValid: true, message: '' });


    // Не врубился немного с этой правкой, что значит перезарослить, но надеюсь делаю правильно
    async function handleSelectCategory(category) {
        setCurrentCategory(category);
        await refreshData(category);
    }


    async function refreshData(category) {
        try {
            const responseData = await fetchItems(category || currentCategory);
            setTodosData({
                todos: responseData.data,
                counts: responseData.info
            });
        }
        catch (error) {
            alert(`Не удалось получить записи${error}`);
        }
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
            <AddTodo refreshData={refreshData} setError={setError} />
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
                    setError={setError} />
            </div>
        </div>
    )
}

export default TodoListPage
