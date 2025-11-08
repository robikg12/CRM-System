import TodoItem from '../TodoItem/TodoItem';

import classes from './TodosList.module.css';

import type { TodosData, Status } from '../../types/types';

const TodosList: React.FC<{
    todosData: TodosData;
    isLoading: boolean;
    refreshData: (category?: string) => Promise<void>;
    recordError: (error: Status) => void;

}> = (props) => {


    return (
        <>
            {props.isLoading && <p className={classes.lodaingText}>Загрузочка...</p>}
            {(!props.isLoading) && <ul className={classes.list}> {(props.todosData.todos.map((todo) => {
                return <TodoItem key={todo.id}
                    // title={todo.title}
                    // isDone={todo.isDone}
                    // itemId={todo.id}

                    // Раньше я передавал информацию о туду через код который закоментирован выше, но сейчас когда переписывал на TS посчитал так,
                    // что правильнее будет передать целиком .map объект todo, чтобы в дочернем компоненте не прописывать каждому свойству типы, чтобы это было как бы единое целое, но, может я не прав.


                    todo={todo}
                    recordError={props.recordError}
                    refreshData={props.refreshData}
                />
            }))}</ul>
            }
        </>
    );

}

export default TodosList