import { useParams } from "react-router-dom"
import ItemForm from "../components/ItemForm"
import { useStock } from "../hooks/useStock"

export const UpdateItem = () => {
  const { getItem } = useStock()
  const { id } = useParams()

  if (!id) return alert('Produto não encontrado!');
  
  const item = getItem(+id)

  return (
    <>
      <h2>Atualizar Item - {item && item.name}</h2>
      <ItemForm itemToUpdate={item} />
    </>
  )
}