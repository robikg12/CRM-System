import { createNewItem } from '../../api/https'
import type { TodoRequest, ErrorInfo } from '../../types/types';

import React from 'react';

import { Button, Form, Input, Flex } from 'antd';

import type { FormProps } from 'antd';

type FieldType = {
    title: string;
}

const REQUIRED_INPUT_LENGTH: { min: number; max: number } =
{
    min: 2,
    max: 64
};

const AddTodo: React.FC<{

    refreshData: () => Promise<void>;
    setErrorInfo: (error: ErrorInfo) => void;
}> = ({ refreshData, setErrorInfo }) => {

    const [form] = Form.useForm(); //К этой строчке дошёл не самостоятельно.

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
                    message: error.message
                });
            }
        }
    }

    console.log('adddd');

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
                        min: REQUIRED_INPUT_LENGTH.min,
                        max: REQUIRED_INPUT_LENGTH.max,
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