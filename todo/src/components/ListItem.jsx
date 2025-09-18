import classes from './ListItem.module.css';

import { useState } from 'react';
import { editItem, deleteItem } from '../api/https';
import { itemValidation } from '../validation';


function ListItem({ isDone, title, itemId, setError, refreshData }) {

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitleText, setEditedTitleText] = useState(title);
    const [isLoading, setIsLoading] = useState(false);


    async function handleEditStatus(event) {
        if (!isEditing) {
            try {
                setIsLoading(true);
                const newStatus = event.target.checked;
                await editItem(itemId, newStatus, title);
                await refreshData();
                setIsLoading(false);
            }
            catch (error) {
                alert(`Не удалось отредаткировать статус задачки ${error}`);
            }
        }
    }

    function handleChangeTitleText(event) {
        setEditedTitleText(event.target.value);
    }

    async function handleEditing() {
        if (!isDone) {
            setIsEditing((currentStatus) => !currentStatus);
            if (isEditing) {
                let validationStatus = itemValidation(editedTitleText);
                setError(validationStatus);
                if (validationStatus.isValid) {
                    try {
                        setIsLoading(true);
                        await editItem(itemId, isDone, editedTitleText);
                        await refreshData();
                        setIsLoading(false);
                    }
                    catch (error) {
                        alert(`Не получилось отредактировать данные ${error}`);
                    }
                }
                else {
                    setIsEditing(true);
                }
            }
        }
    }

    function handleCancel() {
        setIsEditing(false);
        setEditedTitleText(title);
        setError({ isValid: true, message: '' })

    }

    async function handleDelete() {
        if (itemId) {
            try {
                setIsLoading(true);
                await deleteItem(itemId);
                await refreshData();
                setIsLoading(false);
            }
            catch (error) {
                alert(`Ошибка при удалении записи ${error}`);
            }
        }
    }

    let editableItemTitle = <p className={`${classes.itemInputText} ${isDone ? classes.isDone : ''}`}>{title}</p>;
    if (isEditing) {
        editableItemTitle = <input className={classes.itemInputText} value={editedTitleText} onChange={handleChangeTitleText} />;
    }
    if (isLoading) {
        editableItemTitle = <p className={`${classes.itemInputText} ${classes.blue}`}>Загрузочка...</p>;
    }

    let editButton = <button className={`${classes.editBtn} ${isEditing ? classes.editBtnClicked : ''} ${isDone ? classes.buttonBlocked : ''}`} onClick={handleEditing}></button>;
    let cancelButton = <button className={`${classes.cancelButton}`} onClick={handleCancel}></button>;


    return (
        <div className={classes.item}>
            <input type="checkbox" className={classes.checkbox} checked={isDone} onChange={handleEditStatus} />
            {editableItemTitle}
            {editButton}
            {isEditing && cancelButton}
            {!isEditing && (<button className={classes.deleteBtn} onClick={handleDelete}></button>)}
        </div>
    );
}

export default ListItem