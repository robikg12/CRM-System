import { useState } from 'react';
import { createNewItem } from '../../api/https'
import { titleValidation } from '../../validation';



import type { Status, TodoRequest } from '../../types/types';

import classes from './AddTodo.module.css';


const AddTodo: React.FC<{

    refreshData: () => Promise<void>;
    recordError(error: Status): void
}> = ({ refreshData, recordError }) => {


    const [title, setTitle] = useState<string>('');

    function handleChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    async function handleAddItem(event: React.FormEvent) {

        event.preventDefault();
        const validationInfo = titleValidation(title);
        recordError(validationInfo);
        if (validationInfo.isValid) {
            const todoRequest: TodoRequest = { isDone: false, title: title }
            try {
                await createNewItem(todoRequest);
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

export default AddTodo;