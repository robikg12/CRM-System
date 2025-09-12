import classes from './ListMenu.module.css'

function ListMenu({ currentCategory, setCurrentCategory, items, itemsIsFetching }) {

    async function handleSelect(selected) {
        setCurrentCategory(selected);
    }

    return (
        <div className={classes.menu}>
            
            <p className={`${classes.menuItem} ${currentCategory === 'all' ? classes.selected : ''}`}
                onClick={() => handleSelect('all')}>
                Все {!itemsIsFetching && `(${items.all.length})`}
            </p>
            <p className={`${classes.menuItem} ${currentCategory === 'inWork' ? classes.selected : ''}`}
                onClick={() => handleSelect('inWork')}>
                в работе {!itemsIsFetching && `(${items.inWork.length})`}
            </p>
            <p className={`${classes.menuItem} ${currentCategory === 'completed' ? classes.selected : ''}`}
                onClick={() => handleSelect('completed')}>
                сделано {!itemsIsFetching && `(${items.completed.length})`}
            </p>
        </div >
    );
}

export default ListMenu