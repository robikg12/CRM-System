import TodoItem from '../TodoItem/TodoItem';

import classes from './TodosList.module.css';

import type { TodosData, Status } from '../../types/types';

const TodosList: React.FC<{
    todosData: TodosData;
    isLoading: boolean;
    refreshData: (category?: string) => Promise<void>;
    recordError: (error: Status) => void;

}> = ({ todosData, refreshData, isLoading, recordError }) => {


    return (
        <>
            {isLoading && <p className={classes.lodaingText}>Загрузочка...</p>}
            {(!isLoading) && <ul className={classes.list}> {(todosData.data.map((todo) => {
                return <TodoItem key={todo.id}

                    todo={todo}
                    recordError={recordError}
                    refreshData={refreshData}
                />
            }))}</ul>
            }
        </>
    );

}

export default TodosList