import InputInterface from "./components/InputInterface";
import ListInterface from "./components/ListInterface";
import ListMenu from './components/ListMenu';

import { useState, useEffect } from "react";
import { fetchItems } from "./api/https";

function App() {

  const [items, setItems] = useState({
    categoryList: [],
    count: {
      all: null,
      inWork: null,
      completed: null
    }
  });
  const [currentCategory, setCurrentCategory] = useState('all');
  const [itemsIsFetching, setItemsIsFetching] = useState(false);
  const [error, setError] = useState({ isValid: true, message: '' });


  async function refreshData(category) {
    try {
      const responseData = await fetchItems(category || currentCategory);
      setItems({
        categoryList: responseData.categoryArray,
        count: responseData.count
      });
    }
    catch (error) {
      console.log(`Не удалось получить записи${error}`);
    }
  }

  useEffect(() => {
    async function firstRendering() { //Не в курсе может ли быть безымянная асинхронная функция в React.
      setItemsIsFetching(true);
      await refreshData(currentCategory);
      setItemsIsFetching(false);
    };
    firstRendering();
  }, []);

  let errorBlock = (<div className="errorBlock">{error.message}</div>)

  return (
    <>
      <div className="wrapper">
        <InputInterface refreshData={refreshData} setError={setError} />
        {!error.isValid && errorBlock}
        <div className="wrapperOfAllList">
          <ListMenu
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            items={items}
            refreshData={refreshData}
          />

          <ListInterface
            items={items}
            refreshData={refreshData}
            itemsIsFetching={itemsIsFetching}
            setError={setError} />
        </div>
      </div>
    </>
  )
}

export default App
