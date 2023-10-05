import { useParams, Link } from "react-router-dom";
import DeleteButton from "../components/DeleteButton";
import { useStock } from "../hooks/useStock";

export const ShowItem = () => {
    const { getItem } = useStock();
    const { id } = useParams();

    if (!id) return alert('Id não encontrado!')
    
    const item = getItem(+id)
    
    if (!item) return alert('Item não encontrado')

    return (
        <div className="item">
            <h2>{item.name}</h2>
            <Link to={`/items/${item.id}/update`} className="button is-small">
                Atualizar
            </Link>
            <DeleteButton itemId={item.id} itemName={item.name} />
            <div className="row">
                <span>Categoria: {item.category}</span>
                <span>Quantidade em estoque: {item.qtd}</span>
                <span>Preço: R$ {item.price}</span>
            </div>
            <p>{item.description}</p>
            <div className="row">
                <p>Cadastrado em: {item.createdAt.toDateString()}</p>
                <p>Atualizado em: {item.updatedAt.toDateString()}</p>
            </div>
        </div>
    );
};
