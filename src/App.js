import { useState } from "react";

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

  return (
    <div className="App">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList items={items} handleDeleteItem={handleDeleteItem} handlePacked={handlePacked}/>
      <Stats items={items} />
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
    handleAddItems({"quantity": quantity, "description": description, "id": Number(Date.now()), "packed": false})
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

function PackingList({items, handleDeleteItem, handlePacked}) {
  const [sortBy, setSortBy] = useState("input")
  let sortedItems
  if (sortBy === "input") sortedItems = items
  if (sortBy === "packed") sortedItems = items.slice().sort((a,b) => Number(a.packed) - Number(b.packed))
  if (sortBy === "description") sortedItems = items.slice().sort((a,b) => a.description.localeCompare(b.description))
  // function handleSortItems(){
  //   setSortBy(sortBy)
  // }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item key={item.id} item={item} handleDeleteItem={handleDeleteItem} handlePacked={handlePacked}/>
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        {/* <button onClick={() => handleSortItems(sortBy)}>Sort</button> */}
      </div>
    </div>

  )
}

function Item({item, handleDeleteItem, handlePacked}) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onClick={() => handlePacked(item.id)}></input>
      <span style={item.packed ? {textDecoration:"line-through"} : {}}>{item.quantity} {item.description}</span>
      <button onClick={() => handleDeleteItem(item.id)}>&times;</button>
    </li>
  )
}

function Stats({items}) {
  if (items.length < 1) return <footer className="stats"><em>No Items found! Start adding them.</em></footer>
  const totalItems = items.length
  const totalPacked = items.filter((item) => item.packed).length
  const packedPercent = Math.round(totalPacked / totalItems * 100, 2)
  return (
    <footer className="stats">
      <em>
        {packedPercent === 100
          ? "You got everything! Ready to go ✈️"
          : `You have ${totalItems} on your list, and you have already packed ${totalPacked} items(${packedPercent}%).}`
        }
      </em>
    </footer>
  )
}

