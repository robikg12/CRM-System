import type { TodoInfo, Category } from '../../types/types';

import React from 'react';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';


const TodoFilter: React.FC<{
    currentCategory: Category;
    counts: TodoInfo;
    handleSelectCategory: (category: Category) => void
}> = ({ counts, handleSelectCategory }) => {

    const onChange = (key: string) => {
        if (key === 'all' || key === 'inWork' || key === 'completed')
            handleSelectCategory(key);
    };

    const items: TabsProps['items'] = [
        {
            key: 'all',
            label: `Все (${counts.all})`,
        },
        {
            key: 'inWork',
            label: `В работе ${counts.inWork}`,
        },
        {
            key: 'completed',
            label: `сделано ${counts.completed}`,
        },
    ];

    return (
        <Tabs defaultActiveKey="all" items={items} onChange={onChange} />
    );
}

export default React.memo(TodoFilter);