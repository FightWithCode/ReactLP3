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
  return (
    <div className="add-form">
      <h3>What do you need for your 😍 trip</h3>
    </div>
  )
}
function PackingList() {
  return (
    <div className="list">List</div>
  )
}
function Stats() {
  return (
    <footer className="stats">
      <em>You have x items to pack, and you have already packed y itesm(z%).</em>
    </footer>
  )
}

