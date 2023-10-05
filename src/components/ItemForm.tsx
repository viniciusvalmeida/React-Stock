import { useRef, useState } from "react"
import { useStock } from "../hooks/useStock"
import { ItemIfc, DefaultItemIfc } from "../common/interfaces"

const CATEGORIES = [
  "Jogos",
  "Livros",
  "Brinquedos",
  "Acessórios"
]

interface ItemFormProps {
  itemToUpdate?: ItemIfc
}

export default function ItemForm({ itemToUpdate }: ItemFormProps) {
  const defaultItem: DefaultItemIfc = {
    name: "",
    description: "",
    qtd: 0,
    price: 0,
    category: ""
  }

  const [item, setItem] = useState(itemToUpdate ? itemToUpdate : defaultItem)
  const { addItem, updateItem } = useStock()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setItem((current) => ({ ...current, [ev.target.name]: ev.target.value }))
  }

  const handleSubmit = (ev: React.SyntheticEvent) => {
    ev.preventDefault()
    try {
      if (itemToUpdate) {
        updateItem(itemToUpdate.id, item)
        alert("Item atualizado com sucesso!")
      } else {
        addItem(item)
        setItem(defaultItem)
        alert("Item cadastrado com sucesso!")
      }
    } catch (err ) {
      if (err instanceof Error) console.log(err.message)      
      alert("Ocorreu um erro.")
    } finally {
      if (inputRef.current) inputRef.current.focus()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            ref={inputRef}
            value={item.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="qtd">Quantidade</label>
          <input
            type="number"
            name="qtd"
            id="qtd"
            required
            min={0}
            step={1}
            value={item.qtd}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Preço</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            min={0.00}
            step={0.01}
            value={item.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Categoria</label>
          <select
            name="category"
            id="category"
            required
            value={item.category}
            onChange={handleChange}
          >
            <option disabled value="">Selecione uma categoria...</option>
            {CATEGORIES.map((category) => (
              <option
                key={category}
                value={category}
                defaultChecked={item.category === category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-control">
        <label htmlFor="description">Descrição</label>
        <textarea
          name="description"
          id="description"
          required
          rows={6}
          value={item.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <button className="button is-primary is-large">
        Salvar
      </button>
    </form>
  )
}