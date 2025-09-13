import InputInterface from "./components/InputInterface";
import ListInterface from "./components/ListInterface";

import { useState, useEffect } from "react";
import { fetchTodoItems } from "./https";

function App() {

  const [items, setItems] = useState({
    all: [],
    inWork: [],
    completed: []
  });
  const [itemsIsFetching, setItemsIsFetching] = useState(false);
  const [error, setError] = useState({ isValid: true, message: '' });

  function setItemsList(updatedItems) { //Поменять имя функции
    setItems(updatedItems);
  }
  async function getItems() {  // Подумать, как измнить
    setItemsIsFetching(true);
    const fetchItemsResponse = await fetchTodoItems();
    setItems(fetchItemsResponse);
    setItemsIsFetching(false);
  }

  useEffect(() => {
    getItems();
  }, []);

  let errorBlock = (<div className="errorBlock">{error.message}</div>)


  return (
    <>
      <div className="wrapper">
        <InputInterface setItemsList={setItemsList} setItemsIsFetching={setItemsIsFetching} setError={setError}></InputInterface>
        {!error.isValid && errorBlock}
        <ListInterface setItemsList={setItemsList} items={items} itemsIsFetching={itemsIsFetching} setError={setError} />

      </div>



    </>
  )
}

export default App
