import React, { useState } from 'react';
import { editItem, deleteItem } from '../../api/https';
import { titleValidation } from '../../validation';

import type { Todo, Status } from '../../types/types';

import CancelIcon from "../../assets/img/icons/cancel.svg?react";
import EditIcon from "../../assets/img/icons/note.svg?react";
import SaveIcon from "../../assets/img/icons/save.svg?react";
import DeleteIcon from "../../assets/img/icons/trash.svg?react";

import classes from './TodoItem.module.css';



const TodoItem: React.FC<{
    todo: Todo;
    refreshData: (category?: string) => Promise<void>;
    recordError: (error: Status) => void;
}> = ({ todo, recordError, refreshData }) => {

    // function TodoItem({ isDone, title, itemId, setError, refreshData }) {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedTitle, setEditedTitle] = useState<string>(todo.title);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    async function handleEditStatus(event: React.ChangeEvent<HTMLInputElement>) {
        try {
            setIsLoading(true);
            const newStatus = event.target.checked;
            await editItem(todo.id, newStatus, todo.title);
            await refreshData();
            setIsLoading(false);
        }
        catch (error) {
            alert(`Не удалось отредаткировать статус задачки ${error}`);
        }

    }

    function handleChangeTitleText(event: React.ChangeEvent<HTMLInputElement>) {
        setEditedTitle(event.target.value);
    }

    async function handleEditing() {
        setIsEditing(true);
    }


    async function handleSave() {
        const validationInfo = titleValidation(editedTitle);
        recordError(validationInfo);
        if (validationInfo.isValid) {
            try {
                setIsLoading(true);
                await editItem(todo.id, todo.isDone, editedTitle);
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
        setEditedTitle(todo.title);
        recordError({ isValid: true, message: '' })
    }

    async function handleDelete() {

        try {
            setIsLoading(true);
            await deleteItem(todo.id);
            await refreshData();
            setIsLoading(false);
        }
        catch (error) {
            alert(`Ошибка при удалении записи ${error}`);
        }
    }

    let titleElement = <p className={`${classes.itemInputText} ${todo.isDone ? classes.isDone : ''}`}>{todo.title}</p>;
    if (isLoading) {
        titleElement = <p className={`${classes.itemInputText} ${classes.blue}`}>Загрузочка...</p>
    }
    return (
        <li className={classes.item}>
            <input type="checkbox" className={classes.checkbox} checked={todo.isDone} onChange={handleEditStatus} />

            {isEditing ? <input className={`${classes.itemInputText} ${todo.isDone ? classes.isDone : ''}`} value={editedTitle} onChange={handleChangeTitleText} /> :
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