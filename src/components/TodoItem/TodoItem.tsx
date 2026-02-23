import React, { useState } from 'react';

import type { Todo, TodoRequest } from '../../types/types';

import classes from './TodoItem.module.css';

import { Card, Flex, Checkbox, Button, Input, Form } from 'antd';
import type { CheckboxProps, FormProps } from 'antd';
import { StopOutlined, FormOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

import { useAppDispatch } from '../../store/hooks';

import { MIN_TODO_TITLE_LENGTH, MAX_TODO_TITLE_LENGTH } from '../../validation.ts';

import { editTodo, deleteTodo } from '../../store/todos/todosActions.ts';

import { Spin } from 'antd';


type FieldType = {
    title: string;
}

const TodoItem: React.FC<{
    todo: Todo;
}> = ({ todo }) => {

    const dispatch = useAppDispatch();

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedTitle, setEditedTitle] = useState<string>(todo.title);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [form] = Form.useForm();

    const handleChangeTitleText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTitle(event.target.value);
    }

    const handleEditing = () => {
        setIsEditing(true);
    }

    const handleCancelEditing = () => {
        setEditedTitle(todo.title);
        form.setFieldValue('title', todo.title); //Пришлось добавить эту строчку, чтобы исправить ошибку.
        setIsEditing(false);
    }

    const handleEditStatus: CheckboxProps['onChange'] = async (e) => {
        setIsLoading(true);
        const newStatus = e.target.checked;
        const todoRequest: TodoRequest = { isDone: newStatus, title: todo.title };


        await dispatch(editTodo({
            id: todo.id,
            request: todoRequest
        }));

        setIsLoading(false);
    };

    const handleSaveTodo: FormProps<FieldType>['onFinish'] = async () => {

        setIsLoading(true);
        setIsEditing(false);
        const todoRequest: TodoRequest = { isDone: todo.isDone, title: editedTitle };

        await dispatch(editTodo({ id: todo.id, request: todoRequest }));

        setIsLoading(false);

    };

    const handleDelete = async () => {

        setIsLoading(true);
        await dispatch(deleteTodo(todo.id));
        setIsLoading(false);
    }



    let titleElement = <p className={`${classes.itemInputText} ${todo.isDone ? classes.isDone : ''}`}>{todo.title}</p>;
    if (isLoading) {
        titleElement = <div className={classes.spinWrapper}><Spin /></div>
    }
    return (
        <Card style={{ width: '100%' }}>
            <Form
                form={form}
                initialValues={{ title: editedTitle }}
                onFinish={handleSaveTodo}>

                <Flex align='center' >

                    <Checkbox checked={todo.isDone} onChange={handleEditStatus} />


                    {isEditing ? <>
                        <Form.Item
                            style={{ flexGrow: 1, marginBottom: '0px' }} //как я понял обёртки Form.item сбивают flex align center для этих элементов, самый простой способ который придумал - добавить margin
                            rules={[{ required: true, message: 'Введите задачу' },
                            { whitespace: true, message: "Задача не может быть пустой" },
                            { min: MIN_TODO_TITLE_LENGTH, max: MAX_TODO_TITLE_LENGTH, message: 'Задача должна содержать от 2 до 64 символов' }]}
                            name='title'>

                            <Input
                                variant='borderless'
                                className={`${todo.isDone ? classes.isDone : ''}`}
                                onChange={handleChangeTitleText} />
                        </Form.Item>
                        <Form.Item >
                            <Button type='primary' size='large' htmlType='submit' style={{ marginBottom: '0px' }}>
                                <SaveOutlined style={{ fontSize: '24px', color: 'white' }} />
                            </Button>
                        </Form.Item>
                        <Button color='yellow' variant='solid' size='large' onClick={handleCancelEditing}>
                            <StopOutlined style={{ fontSize: '24px', color: 'white' }} />
                        </Button>
                    </> : <>
                        {titleElement}
                        <Button type='primary' size='large' onClick={handleEditing} disabled={isLoading}>
                            <FormOutlined style={{ fontSize: '24px', color: 'white' }} />
                        </Button>
                        <Button color='danger' variant='solid' size='large' onClick={handleDelete} disabled={isLoading}>
                            <DeleteOutlined style={{ fontSize: '24px', color: 'white' }} />
                        </Button>
                    </>}

                </Flex>
            </Form>
        </Card >
    );
}

export default TodoItem;