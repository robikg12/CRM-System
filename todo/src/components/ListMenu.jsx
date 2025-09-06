import classes from './ListMenu.module.css'

import { fetchTodoItems } from '../https';
import { useState, useEffect } from 'react';

function ListMenu({ fetchItems }) {

    const [currentCategory, setCurrentCategory] = useState('all');

    // TODO: подумать над именем функции, а то сейчас не логично.
    async function handleSelect(selected = 'all') {
        try {
            setCurrentCategory(selected);
            const todoItems = await fetchTodoItems(selected);
            await fetchItems(todoItems);
            console.log(todoItems)
        }
        catch (error) {
            console.log(`Не удалось получить список задач.${error}`);
        }
    }

    useEffect(() => {
        handleSelect('all');
    }, []);

    return (
        <div className={classes.menu}>
            {/* TODO: Поменять p на какой-то другой тег и div тоже */}
            <p className={`${classes.menuItem} ${currentCategory === 'all' ? classes.selected : ''}`}
                onClick={() => handleSelect('all')}>Все</p>
            <p className={`${classes.menuItem} ${currentCategory === 'inWork' ? classes.selected : ''}`}
                onClick={() => handleSelect('inWork')}>в работе </p>
            <p className={`${classes.menuItem} ${currentCategory === 'completed' ? classes.selected : ''}`}
                onClick={() => handleSelect('completed')}>сделано</p>
        </div >
    );
}

export default ListMenu