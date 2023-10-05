import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <header>
        <Link to="/" className="logo">REACT STOCK</Link>
        <nav>
          <Link to="/">Início</Link>
          <Link to="/items">Items</Link>
        </nav>
      </header>
  )
}