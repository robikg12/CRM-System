import React from 'react';

import classes from './AddTodo.module.css';

import { Button, Form, Input, Flex } from 'antd';

import { useAppDispatch } from '../../store/hooks';

import { createTodo } from '../../store/todos/todosActions.ts';

import { MIN_TODO_TITLE_LENGTH, MAX_TODO_TITLE_LENGTH } from '../../validation.ts';

import type { TodoRequest } from '../../types/types';

import type { FormProps } from 'antd';


type FieldType = {
    title: string;
}

const AddTodo: React.FC = () => {

    const dispatch = useAppDispatch();


    const [form] = Form.useForm();  //К этой строчке дошёл не самостоятельно.

    const handleAddTodo: FormProps<FieldType>['onFinish'] = async (values) => {
        const todoRequest: TodoRequest = { isDone: false, title: values.title };
        await dispatch(createTodo(todoRequest));
        form.resetFields();
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