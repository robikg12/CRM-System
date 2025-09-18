import ListItem from './ListItem';

import classes from './ListInterface.module.css';

function ListInterface({ todosData, isLoading, setError, refreshData }) {

    return (
        <>
            {isLoading && <p className={classes.lodaingText}>Загрузочка...</p>}
            {(!isLoading) && (todosData.todos.map((item) => {
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