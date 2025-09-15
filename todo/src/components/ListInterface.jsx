import ListItem from './ListItem';

import classes from './ListInterface.module.css';

function ListInterface({ items, itemsIsFetching, setError, refreshData }) {

    return (
        <>
            {itemsIsFetching && <p className={classes.lodaingText}>Загрузочка...</p>}
            {(!itemsIsFetching) && (items.categoryList.map((item) => {
                return <ListItem key={item.id}
                    title={item.title}
                    isDone={item.isDone}
                    itemId={item.id}
                    setError={setError}
                    refreshData={refreshData}
                />
            }))
            }
        </>
    );

}

export default ListInterface;