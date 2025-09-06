import ListMenu from './ListMenu';
import ListItem from './ListItem';

import { useState } from 'react';

import classes from './ListInterface.module.css';

function ListInterface({ fetchItems, items }) {


    return (
        <div className={classes.wrapperOfAllList}>
            <ListMenu fetchItems={fetchItems} />
            {items.map((item) => {
                return (
                    <ListItem key={item.id} title={item.title} isDone={item.isDone} />
                );
            })}
        </div>
    );

}

export default ListInterface;