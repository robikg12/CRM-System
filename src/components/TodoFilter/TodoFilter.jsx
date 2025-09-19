import classes from './TodoFilter.module.css';

function TodoFilter({ currentCategory, handleSelectCategory, todosData }) {

    return (
        <nav>
            <ul className={classes.menu}>
                <li className={`${classes.menuItem} ${currentCategory === 'all' ? classes.selected : ''}`}
                    onClick={() => handleSelectCategory('all')}>
                    Все {todosData.counts.all !== null && `(${todosData.counts.all})`}
                </li>
                <li className={`${classes.menuItem} ${currentCategory === 'inWork' ? classes.selected : ''}`}
                    onClick={() => handleSelectCategory('inWork')}>
                    в работе {todosData.counts.all !== null && `(${todosData.counts.inWork})`}
                </li>
                <li className={`${classes.menuItem} ${currentCategory === 'completed' ? classes.selected : ''}`}
                    onClick={() => handleSelectCategory('completed')}>
                    сделано {todosData.counts.all !== null && `(${todosData.counts.completed})`}
                </li>
            </ul >
        </nav>
    );
}

export default TodoFilter