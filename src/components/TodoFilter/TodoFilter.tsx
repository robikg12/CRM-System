import type { TodoInfo, Category } from '../../types/types';

import React from 'react';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';


const TodoFilter: React.FC<{

    counts: TodoInfo;
    handleSelectCategory: (category: Category) => void
}> = ({ counts, handleSelectCategory }) => {

    function onChange(key: Category): void;
    function onChange(key: string): void;
    function onChange(key: string): void {
        // Раньше у меня вместо того, что выше был такой type guard, да и считаю вполне правильный. В ревью засчиталось как ошибка.
        // if (key === 'all' || key === 'inWork' || key === 'completed') 
        handleSelectCategory(key as Category);
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
        <Tabs items={items} onChange={onChange} />
    );
}

export default TodoFilter;