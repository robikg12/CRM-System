import { useState } from 'react';
import { createNewItem, fetchTodoItems } from '../https'

import classes from './InputInterface.module.css';


function InputInterface({ fetchItems }) {

    const [newItemText, setNewItemText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function handleChange(event) {
        setNewItemText(event.target.value);
    }

    async function handleAddItem() {

        if ((newItemText.length >= 2) && (newItemText.length <= 64)) {

            const emptySpaceValidation = /\S{2}/; //TODO: Да, что-то намутил 
            if (emptySpaceValidation.test(newItemText)) {

                try {
                    const response = await createNewItem(newItemText);
                    console.log(`Запись создана, вот она: ${response}`);
                    const updatedItems = await fetchTodoItems('all');
                    await fetchItems(updatedItems);
                }
                catch (error) {
                    console.log('Не получилось создать запись');
                }
            }
            else {
                setErrorMessage('Запись должна содержать от 2х не пустых символов');
                console.log('Запись должна содержать от 2х не пустых символов');
            }
        }
        else {
            setErrorMessage('Запись должна содержать от 2 до 64 символов.');
            console.log('Запись должна содержать от 2 до 64 символов.');
        }
    }

    return (
        <div className={classes.wrapperInterface}>
            {/* TODO: Цвет и Opacity для placeholder */}
            <input className={classes.input} type="text" placeholder='Нужно сделать...' value={newItemText} onChange={handleChange} />
            <button className={classes.button} onClick={handleAddItem}>Add</button>
        </div>
    );
}

export default InputInterface