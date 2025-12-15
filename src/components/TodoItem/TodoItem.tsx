import React, { useState } from 'react';
import { editItem, deleteItem } from '../../api/https';

import type { Todo, TodoRequest, ErrorInfo } from '../../types/types';

import classes from './TodoItem.module.css';

import { Card, Flex, Checkbox, Button, Input, Form } from 'antd';
import type { CheckboxProps, FormProps } from 'antd';
import { StopOutlined, FormOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

type FieldType = {
    title: string;
}

const TodoItem: React.FC<{
    todo: Todo;
    refreshData: () => Promise<void>;
    setErrorInfo: (error: ErrorInfo) => void;

}> = ({ todo, refreshData, setErrorInfo }) => {



    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedTitle, setEditedTitle] = useState<string>(todo.title);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [form] = Form.useForm();

    const handleEditStatus: CheckboxProps['onChange'] = async (e) => {
        try {
            setIsLoading(true);
            const newStatus = e.target.checked;
            const todoRequest: TodoRequest = { isDone: newStatus, title: todo.title };
            await editItem(todo.id, todoRequest);
            await refreshData();
            setIsLoading(false);
        }
        catch (error) {
            if (error instanceof Error) {
                setErrorInfo({
                    isActiveError: true,
                    message: error.message
                });
            }
        }
    };

    function handleChangeTitleText(event: React.ChangeEvent<HTMLInputElement>) {
        setEditedTitle(event.target.value);
    }

    async function handleEditing() {
        setIsEditing(true);
    }


    const handleSaveTodo: FormProps<FieldType>['onFinish'] = async () => {
        try {
            setIsLoading(true);
            const todoRequest: TodoRequest = { isDone: todo.isDone, title: editedTitle }
            await editItem(todo.id, todoRequest);
            await refreshData();
            setIsLoading(false);
            setIsEditing(false);
        }
        catch (error) {
            if (error instanceof Error) {
                setErrorInfo({
                    isActiveError: true,
                    message: error.message
                });
            }
        }
    };

    function handleCancelEditing() {
        setEditedTitle(todo.title);
        form.setFieldValue('title', todo.title); //Пришлось добавить эту строчку, чтобы исправить ошибку.
        setIsEditing(false);

    }

    async function handleDelete() {

        try {
            setIsLoading(true);
            await deleteItem(todo.id);
            await refreshData();
            setIsLoading(false);
        }
        catch (error) {
            if (error instanceof Error) {
                setErrorInfo({
                    isActiveError: true,
                    message: error.message
                });
            }
        }
    }

    let titleElement = <p className={`${classes.itemInputText} ${todo.isDone ? classes.isDone : ''}`}>{todo.title}</p>;
    if (isLoading) {
        titleElement = <p className={`${classes.itemInputText} ${classes.blue}`}>Загрузочка...</p>
    }
    return (
        <Card style={{ width: '100%' }}>
            <Form
                form={form}
                initialValues={{ title: editedTitle }}
                onFinish={handleSaveTodo}>

                <Flex align='center' >

                    <Checkbox defaultChecked={todo.isDone} onChange={handleEditStatus} />


                    {isEditing ? <>
                        <Form.Item
                            style={{ flexGrow: 1, marginTop: "20px" }} //как я понял обёртки Form.item сбивают flex align center для этих элементов, самый простой способ который придумал - добавить margin
                            rules={[{ required: true, message: 'Введите задачу' },
                            { whitespace: true, message: "Задача не может быть пустой" },
                            { min: 2, max: 64, message: 'Задача должна содержать от 2 до 64 символов' }]}
                            name='title'>

                            <Input
                                variant='borderless'
                                className={`${todo.isDone ? classes.isDone : ''}`}
                                onChange={handleChangeTitleText} />
                        </Form.Item>
                        <Form.Item >
                            <Button type='primary' size='large' htmlType='submit' style={{ marginTop: "22px" }}>
                                <SaveOutlined style={{ fontSize: '24px', color: 'white' }} />
                            </Button>
                        </Form.Item>
                        <Button color='yellow' variant='solid' size='large' onClick={handleCancelEditing}>
                            <StopOutlined style={{ fontSize: '24px', color: 'white' }} />
                        </Button>
                    </> : <>
                        {titleElement}
                        <Button type='primary' size='large' onClick={handleEditing}>
                            <FormOutlined style={{ fontSize: '24px', color: 'white' }} />
                        </Button>
                        <Button color='danger' variant='solid' size='large' onClick={handleDelete}>
                            <DeleteOutlined style={{ fontSize: '24px', color: 'white' }} />
                        </Button>
                    </>}

                </Flex>
            </Form>
        </Card >
    );
}

export default TodoItem;