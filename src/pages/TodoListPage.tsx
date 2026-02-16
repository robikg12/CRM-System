import AddTodo from '../components/AddTodo/AddTodo';
import TodoFilter from '../components/TodoFilter/TodoFilter';
import TodosList from '../components/TodosList/TodosList'


import { useEffect } from "react";



import { useAppSelector, useAppDispatch } from '../store/hooks';
import { refreshTodosData } from '../store/todos/todosActions';



const TodoListPage: React.FC = () => {


    const todosData = useAppSelector((state) => state.todos.asyncData.data);
    const currentCategory = useAppSelector((state) => state.todos.currentCategory);

    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(refreshTodosData());
        const intervalId = setInterval(() => {
            dispatch(refreshTodosData());
        }, 5000);
        return () => clearInterval(intervalId);
    }, [currentCategory, dispatch]);


    return (
        <div className="wrapper">

            <AddTodo />

            <div className="wrapperOfAllList">

                {todosData?.info && <TodoFilter />}
                {todosData?.info && <TodosList />}
            </div>
        </div>
    )
}

export default TodoListPage
