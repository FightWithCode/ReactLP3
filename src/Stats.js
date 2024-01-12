export default function Stats({items}) {
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