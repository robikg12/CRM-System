import { useState } from 'react';
import { createNewItem } from '../../api/https'
import { titleValidation } from '../../validation';

import classes from './AddTodo.module.css';


function AddTodo({ setError, refreshData }) {

    const [title, setTitle] = useState('');

    function handleChangeTitle(event) {
        setTitle(event.target.value);
    }

    async function handleAddItem(event) {

        event.preventDefault();
        const validationInfo = titleValidation(title);
        setError(validationInfo);
        if (validationInfo.isValid) {
            try {
                await createNewItem(title);
                await refreshData();
                setTitle('');
            }
            catch (error) {
                alert(`Не получилось создать запись. Ошибка ${error}`);
            }
        }
    }

    return (
        // загуглил про onSubmit
        <form onSubmit={handleAddItem} className={classes.wrapperInterface}>
            <input className={classes.input} type="text" placeholder='Нужно сделать...' value={title} onChange={handleChangeTitle} />
            <button type="submit" className={classes.button}>Add</button>
        </form>
    );
}

export default AddTodo