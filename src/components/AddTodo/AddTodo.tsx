import { createNewItem } from '../../api/https'
import type { TodoRequest } from '../../types/types';

import { Button, Form, Input, Flex } from 'antd';

import type { FormProps } from 'antd';

type FieldType = {
    title?: string;
}

const AddTodo: React.FC<{

    refreshData: () => Promise<void>;
}> = ({ refreshData }) => {

    const [form] = Form.useForm(); //К этой строчке дошёл не самостоятельно.

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const todoRequest: TodoRequest = { isDone: false, title: values.title }
        try {
            await createNewItem(todoRequest);
            await refreshData();
            form.resetFields();
        }
        catch (error) {
            alert(`Не получилось создать запись. Ошибка ${error}`);
        }
    }

    return (
        <Form form={form} onFinish={onFinish} >
            <Flex gap="middle" align='center'>
                <Form.Item name="title" rules={[{ required: true, message: 'Введите задачу' }, { min: 2, max: 64, message: 'Задача должна содержать от 2 до 64 символов' }]}>
                    <Input placeholder='Нужно сделать...' size='large' style={{width: '415px'}}/>
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">Add</Button>
                </Form.Item>
            </Flex>
        </Form>
    );
}

export default AddTodo;