import classes from './TodoFilter.module.css';

import type { ItemCount } from '../../types/types';

const TodoFilter: React.FC<{
    currentCategory: string;
    counts: ItemCount;
    handleSelectCategory: (category: string) => Promise<void>
}> = ({ currentCategory, counts, handleSelectCategory }) => {

    return (
        <nav>
            <ul className={classes.menu}>
                <li className={`${classes.menuItem} ${currentCategory === 'all' ? classes.selected : ''}`}
                    onClick={() => handleSelectCategory('all')}>
                    Все {`(${counts.all})`}
                </li>
                <li className={`${classes.menuItem} ${currentCategory === 'inWork' ? classes.selected : ''}`}
                    onClick={() => handleSelectCategory('inWork')}>
                    в работе {`(${counts.inWork})`}
                </li>
                <li className={`${classes.menuItem} ${currentCategory === 'completed' ? classes.selected : ''}`}
                    onClick={() => handleSelectCategory('completed')}>
                    сделано {`(${counts.completed})`}
                </li>
            </ul >
        </nav>
    );
}

export default TodoFilter