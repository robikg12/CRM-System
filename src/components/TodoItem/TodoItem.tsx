import React, { useState } from 'react';
import { editItem, deleteItem } from '../../api/https';

import type { Todo, TodoRequest } from '../../types/types';




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

}> = ({ todo, refreshData }) => {



    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedTitle, setEditedTitle] = useState<string>(todo.title);
    const [isLoading, setIsLoading] = useState<boolean>(false);


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
            alert(`Не удалось отредаткировать статус задачки ${error}`);
        }
    };

    function handleChangeTitleText(event: React.ChangeEvent<HTMLInputElement>) {
        setEditedTitle(event.target.value);
    }

    async function handleEditing() {
        setIsEditing(true);
    }


    const onFinish: FormProps<FieldType>['onFinish'] = async () => {
        await handleSave();
    };

    async function handleSave() {
        try {
            setIsLoading(true);
            const todoRequest: TodoRequest = { isDone: todo.isDone, title: editedTitle }
            await editItem(todo.id, todoRequest);
            await refreshData();
            setIsLoading(false);
            setIsEditing(false);
        }
        catch (error) {
            alert(`Не получилось отредактировать данные ${error}`);
        }
    }

    function handleCancel() {
        setIsEditing(false);
        setEditedTitle(todo.title);
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
        <li>
            <Card >
                <Form
                    onFinish={onFinish}
                    initialValues={{
                        title: editedTitle
                    }}>

                    <Flex align='center' >

                        <Checkbox defaultChecked={todo.isDone} onChange={handleEditStatus} />


                        {isEditing ? <Form.Item
                            style={{ flexGrow: 1, marginTop: "20px" }} //как я понял обёртки Form.item сбивают flex align center для этих элементов, самый простой способ который придумал - добавить margin
                            rules={[{ required: true, message: 'Запись не может быть пустой' },
                            { min: 2, max: 64, message: 'Запись должна содержать от 2 до 64 символов' }]}
                            name='title'>
                            {/* Эх, не стал возится. Оставил классы для этого инпута. Надеюсь не критично. */}
                            <Input
                                variant='borderless'
                                className={`${todo.isDone ? classes.isDone : ''}`}
                                onChange={handleChangeTitleText} />

                        </Form.Item> : titleElement}

                        {isEditing ? <Form.Item >
                            <Button type='primary' size='large' htmlType='submit' style={{ marginTop: "22px" }}>
                                <SaveOutlined style={{ fontSize: '24px', color: 'white' }} />
                            </Button>
                        </Form.Item> :
                            <Button type='primary' size='large' onClick={handleEditing}>
                                <FormOutlined style={{ fontSize: '24px', color: 'white' }} />
                            </Button>

                        }


                        {isEditing ? <Button color='yellow' variant='solid' size='large' onClick={handleCancel}>
                            <StopOutlined style={{ fontSize: '24px', color: 'white' }} />
                        </Button> :
                            <Button color='danger' variant='solid' size='large' onClick={handleDelete}>
                                <DeleteOutlined style={{ fontSize: '24px', color: 'white' }} />
                            </Button>}

                    </Flex>
                </Form>
            </Card >
        </li >
    );
}

export default React.memo(TodoItem);