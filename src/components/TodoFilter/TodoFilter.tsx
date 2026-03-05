import React from 'react';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import type { TodoInfo, Category } from '../../types/types';


const TodoFilter: React.FC<{

    counts: TodoInfo;
    handleSelectCategory: (category: Category) => void;
    currentCategory: Category;
}> = ({ counts, handleSelectCategory, currentCategory }) => {



    const onChange = (key: string) => {
        handleSelectCategory(key as Category);
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