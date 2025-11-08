import classes from './TodoFilter.module.css';

import type { TodosData } from '../../types/types';

const TodoFilter: React.FC<{
    currentCategory: string;
    todosData: TodosData;
    handleSelectCategory: (category: string) => Promise<void>
}> = (props) => {

    return (
        <nav>
            <ul className={classes.menu}>
                <li className={`${classes.menuItem} ${props.currentCategory === 'all' ? classes.selected : ''}`}
                    onClick={() => props.handleSelectCategory('all')}>
                    Все {props.todosData.counts.all !== null && `(${props.todosData.counts.all})`}
                </li>
                <li className={`${classes.menuItem} ${props.currentCategory === 'inWork' ? classes.selected : ''}`}
                    onClick={() => props.handleSelectCategory('inWork')}>
                    в работе {props.todosData.counts.all !== null && `(${props.todosData.counts.inWork})`}
                </li>
                <li className={`${classes.menuItem} ${props.currentCategory === 'completed' ? classes.selected : ''}`}
                    onClick={() => props.handleSelectCategory('completed')}>
                    сделано {props.todosData.counts.all !== null && `(${props.todosData.counts.completed})`}
                </li>
            </ul >
        </nav>
    );
}

export default TodoFilter