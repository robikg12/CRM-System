import TodoItem from '../TodoItem/TodoItem';

import classes from './TodosList.module.css';

function TodosList({ todosData, isLoading, setError, refreshData }) {

    return (
        <>
            {isLoading && <p className={classes.lodaingText}>Загрузочка...</p>}
            {(!isLoading) && <ul className={classes.list}> {(todosData.todos.map((todo) => {
                return <TodoItem key={todo.id}
                    title={todo.title}
                    isDone={todo.isDone}
                    itemId={todo.id}
                    setError={setError}
                    refreshData={refreshData}
                />
            }))}</ul>
            }
        </>
    );

}

export default TodosList