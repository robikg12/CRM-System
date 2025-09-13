import ListMenu from './ListMenu';
import ListItem from './ListItem';

import classes from './ListInterface.module.css';

import { useState } from 'react';


function ListInterface({ items, itemsIsFetching, setItemsList, setError }) {

    const [currentCategory, setCurrentCategory] = useState('all');

    return (
        <div className={classes.wrapperOfAllList}>
            <ListMenu setItemsList={setItemsList} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} items={items} itemsIsFetching={itemsIsFetching} />

            {itemsIsFetching && <p className={classes.lodaingText}>Загрузочка...</p>}
            {(!itemsIsFetching) && (items[currentCategory].map((item) => {
                return <ListItem key={item.id} setItemsList={setItemsList} title={item.title} isDone={item.isDone} currentCategory={currentCategory} itemId={item.id} setError={setError}/>
            }))
            }

        </div>
    );

}

export default ListInterface;