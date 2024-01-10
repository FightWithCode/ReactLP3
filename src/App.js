import { useState } from "react";

export default function App() {
  return (
    <div className="App">
      <Logo />
      <Form />
      <PackingList />
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
function Form() {
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)
  function handleSubmit(e){
    e.preventDefault()
    if (!description) return
    console.log(description, quantity)
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

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  )
}

function Item({item}) {
  return (
    <li>
      <span style={item.packed ? {textDecoration:"line-through"} : {}}>{item.quantity} {item.description}</span>
      <button>&times;</button>
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

