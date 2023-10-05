import { useNavigate } from "react-router-dom"
import { useStock } from "../hooks/useStock"

interface DeleteButtonProps {
  itemId: number
  itemName: string
}

export default function DeleteButton({ itemId, itemName }: DeleteButtonProps) {
  const { deleteItem } = useStock()
  const navigate = useNavigate()

  const handleDelete = () => {
    if (confirm(`Tem certeza que deseja excluir ${itemName}?`)) {
      deleteItem(itemId)
      navigate("/items")
    }
  }

  return (
    <button
    className="button is-danger is-small"
    onClick={handleDelete}
  >
    Excluir
  </button>
  )
}