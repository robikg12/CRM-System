import { createNewItem } from '../../api/https'
import type { TodoRequest } from '../../types/types';

import React from 'react';

import { Button, Form, Input, Flex } from 'antd';

import type { FormProps } from 'antd';

import { useAppDispatch } from '../../store/hooks';
import { uiActions } from '../../store/ui-slice';

import { refreshTodosData } from '../../store/todos-actions.ts';

import { MIN_TODO_TITLE_LENGHT, MAX_TODO_TITLE_LENGHT } from '../../validation.ts';

type FieldType = {
    title: string;
}


const AddTodo: React.FC = () => {

    const dispatch = useAppDispatch();


    const [form] = Form.useForm();  //К этой строчке дошёл не самостоятельно.

    const handleAddTodo: FormProps<FieldType>['onFinish'] = async (values) => {
        const todoRequest: TodoRequest = { isDone: false, title: values.title }
        try {
            await createNewItem(todoRequest);
            await dispatch(refreshTodosData());
            form.resetFields();
        }
        catch (error) {
            if (error instanceof Error) {
                dispatch(uiActions.setErrorInfo({
                    isActiveError: true,
                    message: error.message
                }));
            }
        }
    }

    return (
        <Form
            form={form}
            onFinish={handleAddTodo} >
            <Flex gap="middle"
                align='center'>
                <Form.Item name="title"
                    rules={[{ required: true, message: 'Введите задачу' },
                    { whitespace: true, message: "Задача не может быть пустой" },
                    {
                        min: MIN_TODO_TITLE_LENGHT,
                        max: MAX_TODO_TITLE_LENGHT,
                        message: 'Задача должна содержать от 2 до 64 символов'
                    }]}>
                    <Input placeholder='Нужно сделать...' size='large' style={{ width: '415px' }} />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">Добавить</Button>
                </Form.Item>
            </Flex>
        </Form>
    );
}

export default React.memo(AddTodo);