import React from 'react';

import classes from './AddTodo.module.css';

import { Button, Form, Input, Flex } from 'antd';

import { createNewItem } from '../../api/https.ts';

import { MIN_TODO_TITLE_LENGTH, MAX_TODO_TITLE_LENGTH } from '../../validation.ts';

import type { ErrorInfo, TodoRequest } from '../../types/types';

import type { FormProps } from 'antd';


type FieldType = {
    title: string;
}

const AddTodo: React.FC<{
    refreshData: () => Promise<void>;
    setErrorInfo: (error: ErrorInfo) => void;
}> = ({ refreshData, setErrorInfo }) => {



    const [form] = Form.useForm();  //К этой строчке дошёл не самостоятельно.


    const handleAddTodo: FormProps<FieldType>['onFinish'] = async (values) => {
        const todoRequest: TodoRequest = { isDone: false, title: values.title }
        try {
            await createNewItem(todoRequest);
            await refreshData();
            form.resetFields();
        }
        catch (error) {
            if (error instanceof Error) {
                setErrorInfo({
                    isActiveError: true,
                    message: error.message //TODO: Обратить внимание на текст ошибки
                });
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
                        min: MIN_TODO_TITLE_LENGTH,
                        max: MAX_TODO_TITLE_LENGTH,
                        message: 'Задача должна содержать от 2 до 64 символов'
                    }]}
                    className={classes.inputWrapper}>
                    <Input placeholder='Нужно сделать...' size='large' className={classes.input} />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">Добавить</Button>
                </Form.Item>
            </Flex>
        </Form>
    );
}

export default React.memo(AddTodo);