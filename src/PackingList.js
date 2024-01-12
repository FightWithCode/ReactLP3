import Item from "./Item"
import { useState } from "react"

function PackingList({items, handleDeleteItem, handlePacked, handleClear}) {
    const [sortBy, setSortBy] = useState("input")
    let sortedItems
    if (sortBy === "input") sortedItems = items
    if (sortBy === "packed") sortedItems = items.slice().sort((a,b) => Number(a.packed) - Number(b.packed))
    if (sortBy === "description") sortedItems = items.slice().sort((a,b) => a.description.localeCompare(b.description))
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
          <button onClick={handleClear}>Clear</button>
        </div>
      </div>
  
    )
  }
  
export default PackingList