import InputInterface from "./components/InputInterface"
import ListInterface from "./components/ListInterface"

import { useState } from "react";

function App() {

  const [items, setItems] = useState([]); //TODO: Думаю можно поменять имя стейта

  function getItems(items) { //Поменять имя функции
    setItems(items);
  }

  return (
    <>
      <div className="wrapper">
        <InputInterface fetchItems={getItems}></InputInterface>
        {/* TODO: посмотреть, может wrapper-list запихнуть в отдельный компонент / наоборот */}
        <ListInterface fetchItems={getItems} items={items}>

        </ListInterface>
      </div>



    </>
  )
}

export default App
