import classes from './ListItem.module.css';

function ListItem({ title, isDone }) {

    return (
        <div className={classes.item}>
            <input type="checkbox" className={classes.checkbox} />
            <p className={`${classes.itemText} ${isDone ? classes.isDone : ''}`}>{title}</p>
            <button className={classes.completeBtn}></button>
            <button className={classes.deleteBtn}></button>
        </div>
    );
}

export default ListItem