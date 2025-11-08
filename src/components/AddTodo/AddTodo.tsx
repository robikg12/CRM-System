import { useState } from 'react';
import { createNewItem } from '../../api/https'
import { titleValidation } from '../../validation';


// TODO: Посмотреть должен ли я заносить типы в отдельный файл
import type { Status } from '../../types/types';

import classes from './AddTodo.module.css';

// TODO: Разобраться, показывает что category string | undefined - undefined смущает.
const AddTodo: React.FC<{
    refreshData: (category?: string) => Promise<void>;
    recordError(error: Status): void
}> = (props) => {


    const [title, setTitle] = useState<string>('');

    function handleChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    async function handleAddItem(event: React.FormEvent) {

        event.preventDefault();
        const validationInfo = titleValidation(title);
        props.recordError(validationInfo);
        if (validationInfo.isValid) {
            try {
                await createNewItem(title);
                await props.refreshData();
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