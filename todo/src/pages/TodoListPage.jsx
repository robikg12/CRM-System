import AddTodo from "../components/AddTodo";
import ListInterface from "../components/ListInterface";
import ListMenu from '../components/ListMenu';

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
                <ListMenu
                    currentCategory={currentCategory}
                    setCurrentCategory={setCurrentCategory}
                    todosData={todosData}
                    refreshData={refreshData}
                />

                <ListInterface
                    todosData={todosData}
                    refreshData={refreshData}
                    isLoading={isLoading}
                    setError={setError} />
            </div>
        </div>
    )
}

export default TodoListPage
