import type { Category } from '../../types/types';

import React from 'react';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { todosActions } from '../../store/todos/todosSlice.ts';

const TodoFilter: React.FC = () => {

    const counts = useAppSelector((state) => state.todos.asyncData.data?.info);

    const dispatch = useAppDispatch();

    function onChange(key: Category): void;
    function onChange(key: string): void;
    function onChange(key: string): void {
        dispatch(todosActions.setCurrentCategory(key as Category));
    };

    const items: TabsProps['items'] = [
        {
            key: 'all',
            label: `Все (${counts && counts.all})`,
        },
        {
            key: 'inWork',
            label: `В работе ${counts && counts.inWork}`,
        },
        {
            key: 'completed',
            label: `сделано ${counts && counts.completed}`,
        },
    ];

    return (
        <Tabs items={items} onChange={onChange} />
    );
}

export default TodoFilter;