import { useState } from "react";
import Logo from './Logo'
import Form from './Form'
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState([])
  
  function handleAddItems(item){
    setItems((items) => [...items, item] )
  }

  function handleDeleteItem(id){
    setItems((items) => items.filter((item) => item.id !== id))
  }

  function handlePacked(id) {
    setItems((items) => items.map((item) => item.id === id ? {...item, "packed": !item.packed} : item))
  }
  function handleClear() {
    if (items.length === 0) {
      alert("Please add some items first!") 
      return
    }
    const confirm = window.confirm("Are you sure you wan to delete?")
    if (confirm) setItems([])
  }

  return (
    <div className="App">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList items={items} handleDeleteItem={handleDeleteItem} handlePacked={handlePacked} handleClear={handleClear}/>
      <Stats items={items} />
    </div>
  );
}