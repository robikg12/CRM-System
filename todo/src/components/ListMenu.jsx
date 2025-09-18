import classes from './ListMenu.module.css';

function ListMenu({ currentCategory, setCurrentCategory, todosData, refreshData }) {

    async function handleSelect(selected) {
        setCurrentCategory(selected);
        await refreshData(selected);
    }

    return (
        <div className={classes.menu}>

            <p className={`${classes.menuItem} ${currentCategory === 'all' ? classes.selected : ''}`}
                onClick={() => handleSelect('all')}>
                Все {todosData.counts.all !== null && `(${todosData.counts.all})`}
            </p>
            <p className={`${classes.menuItem} ${currentCategory === 'inWork' ? classes.selected : ''}`}
                onClick={() => handleSelect('inWork')}>
                в работе {todosData.counts.all !== null && `(${todosData.counts.inWork})`}
            </p>
            <p className={`${classes.menuItem} ${currentCategory === 'completed' ? classes.selected : ''}`}
                onClick={() => handleSelect('completed')}>
                сделано {todosData.counts.all !== null && `(${todosData.counts.completed})`}
            </p>
        </div >
    );
}

export default ListMenu