import classes from './ListMenu.module.css';

function ListMenu({ currentCategory, setCurrentCategory, items, refreshData }) {

    async function handleSelect(selected) {
        setCurrentCategory(selected);
        await refreshData(selected);
    }

    return (
        <div className={classes.menu}>

            <p className={`${classes.menuItem} ${currentCategory === 'all' ? classes.selected : ''}`}
                onClick={() => handleSelect('all')}>
                Все {items.count.all !== null && `(${items.count.all})`}
            </p>
            <p className={`${classes.menuItem} ${currentCategory === 'inWork' ? classes.selected : ''}`}
                onClick={() => handleSelect('inWork')}>
                в работе {items.count.all !== null && `(${items.count.inWork})`}
            </p>
            <p className={`${classes.menuItem} ${currentCategory === 'completed' ? classes.selected : ''}`}
                onClick={() => handleSelect('completed')}>
                сделано {items.count.all !== null && `(${items.count.completed})`}
            </p>
        </div >
    );
}

export default ListMenu