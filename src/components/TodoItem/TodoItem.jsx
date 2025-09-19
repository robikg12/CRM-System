import { useState } from 'react';
import { editItem, deleteItem } from '../../api/https';
import { titleValidation } from '../../validation';

import CancelIcon from "../../assets/img/icons/cancel.svg?react";
import EditIcon from "../../assets/img/icons/note.svg?react";
import SaveIcon from "../../assets/img/icons/save.svg?react";
import DeleteIcon from "../../assets/img/icons/trash.svg?react";

import classes from './TodoItem.module.css';


function TodoItem({ isDone, title, itemId, setError, refreshData }) {

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [isLoading, setIsLoading] = useState(false);


    async function handleEditStatus(event) {
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

    function handleChangeTitleText(event) {
        setEditedTitle(event.target.value);
    }

    async function handleEditing() {
        setIsEditing(true);
    }


    async function handleSave() {
        const validationInfo = titleValidation(editedTitle);
        setError(validationInfo);
        if (validationInfo.isValid) {
            try {
                setIsLoading(true);
                await editItem(itemId, isDone, editedTitle);
                await refreshData();
                setIsLoading(false);
                setIsEditing(false);
            }
            catch (error) {
                alert(`Не получилось отредактировать данные ${error}`);
            }
        }
    }

    function handleCancel() {
        setIsEditing(false);
        setEditedTitle(title);
        setError({ isValid: true, message: '' })
    }

    async function handleDelete() {

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

    let titleElement = <p className={`${classes.itemInputText} ${isDone ? classes.isDone : ''}`}>{title}</p>;
    if (isLoading) {
        titleElement = <p className={`${classes.itemInputText} ${classes.blue}`}>Загрузочка...</p>
    }
    return (
        <li className={classes.item}>
            <input type="checkbox" className={classes.checkbox} checked={isDone} onChange={handleEditStatus} />

            {isEditing ? <input className={`${classes.itemInputText} ${isDone ? classes.isDone : ''}`} value={editedTitle} onChange={handleChangeTitleText} /> :
                titleElement}

            {isEditing ? <button className={classes.saveBtn} onClick={handleSave}><SaveIcon className={classes.itemIcon} /></button> :
                <button className={classes.editBtn} onClick={handleEditing}><EditIcon className={classes.itemIcon} /></button>}

            {isEditing ? <button className={classes.cancelButton} onClick={handleCancel}>
                <CancelIcon className={classes.itemIcon} /></button> :
                <button className={classes.deleteBtn} onClick={handleDelete}><DeleteIcon className={classes.itemIcon} /></button>}
        </li>
    );
}

export default TodoItem