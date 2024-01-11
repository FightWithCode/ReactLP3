import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([])
  
  function handleAddItems(item){
    setItems((items) => [...items, item] )
  }

  function handleDeleteItem(id){
    setItems((items) => items.filter((item) => item.id !== id))
  }

  return (
    <div className="App">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList items={items} handleDeleteItem={handleDeleteItem}/>
      <Stats />
    </div>
  );
}

function Logo() {
  return (
    <div>
      <h1>🌳Far Away Travels👜</h1>
    </div>
  )
}
function Form({handleAddItems}) {
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)
  function handleSubmit(e){
    e.preventDefault()
    if (!description) return
    handleAddItems({"quantity": quantity, "description": description, "id": Number(Date.now())})
    setDescription("")
    setQuantity(1)
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {
          Array.from({length: 20}, (_, i) => i+1)
          .map((num) => <option value={num} key={num}>{num}</option>
        )}
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)}/>
      <button>Add</button>
    </form>
  )
}

function PackingList({items, handleDeleteItem}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} handleDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  )
}

function Item({item, handleDeleteItem}) {
  return (
    <li>
      <span style={item.packed ? {textDecoration:"line-through"} : {}}>{item.quantity} {item.description}</span>
      <button onClick={() => handleDeleteItem(item.id)}>&times;</button>
    </li>
  )
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have x items to pack, and you have already packed y itesm(z%).</em>
    </footer>
  )
}

