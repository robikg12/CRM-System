import { useState } from 'react';
import { createNewItem, fetchTodoItems } from '../https';
import { itemValidation } from '../validation';

import classes from './InputInterface.module.css';


function InputInterface({ setItemsList, setError }) {

    const [newItemText, setNewItemText] = useState('');

    function handleChange(event) {
        setNewItemText(event.target.value);
    }

    async function handleAddItem() {

        let validationResponse = itemValidation(newItemText);
        setError(validationResponse);
        if (validationResponse.isValid) {
            try {
                await createNewItem(newItemText);
                const updatedItems = await fetchTodoItems();
                await setItemsList(updatedItems);
                setNewItemText('');
            }
            catch (error) {
                console.log(`Не получилось создать запись. Ошибка ${error}`);
            }
        }
    }

    return (
        <div className={classes.wrapperInterface}>
            <input className={classes.input} type="text" placeholder='Нужно сделать...' value={newItemText} onChange={handleChange} />
            <button className={classes.button} onClick={handleAddItem}>Add</button>
        </div>
    );
}

export default InputInterface