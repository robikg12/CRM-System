import type { Category } from '../../types/types';

import React from 'react';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { todosActions } from '../../store/todos/todosSlice.ts';

import { selectTodoInfo } from '../../store/todos/todosSlice.ts';

const TodoFilter: React.FC = () => {

    const counts = useAppSelector(selectTodoInfo);
    const currentCategory = useAppSelector((state) => state.todos.currentCategory);

    const dispatch = useAppDispatch();

    const onChange = (key: string) => {
        dispatch(todosActions.setCurrentCategory(key as Category));
    }

    const items: TabsProps['items'] = [
        {
            key: 'all',
            label: `Все (${counts && counts.all || 0})`,
        },
        {
            key: 'inWork',
            label: `В работе ${counts && counts.inWork || 0}`,
        },
        {
            key: 'completed',
            label: `Сделано ${counts && counts.completed || 0}`,
        },
    ];

    return (
        <Tabs items={items} onChange={onChange} activeKey={currentCategory} />
    );
}

export default TodoFilter;