import { ReactNode, createContext, useState } from "react";
import { ItemIfc } from "../common/ItemIfc";

interface StockContextProviderProps {
  children: ReactNode
}

export const StockContext = createContext({})

export const StockContextProvider = ({ children }: StockContextProviderProps ) => {
  const [ items, setItems ] = useState<ItemIfc[]>(() => {
    const storedItems = localStorage.getItem('stock-items')
    
    if (!storedItems) return []
    
    const items: ItemIfc[] = JSON.parse(storedItems)
    
    items.forEach( item => {
      item.createdAt = new Date(item.createdAt)
      item.updatedAt = new Date(item.updatedAt)
    })

    return items
  })

  const addItem = (item: ItemIfc) => {
    setItems( currentState => {
      const newState = [ ...currentState, item ]
      localStorage.setItem( 'stock-items', JSON.stringify(newState) )
      return newState
    } )
  }

  const getItem = (id: number) => items.find(item => item.id === id)

  const updateItem = ({ id, name, qtd, price, category, description }: { id: number, name: string, qtd: number, price: number, category: string, description: string }) => {
    const updatedAt = new Date()

    setItems( currentState => {
      const newState = currentState.map( item => {
        if (item.id === id) {
          return { ...item, name, qtd, price, category, description, updatedAt }
        }
        return item
      })

      localStorage.setItem('stock-items', JSON.stringify(newState))
      return newState
    })
  }

  const deleteItem = (id: number) => {
    setItems( currentState => {
      const newState = currentState.filter( item => item.id !== id)
      localStorage.setItem( 'stock-items', JSON.stringify(newState) )
      return newState
    } )
  }

  return (
    <StockContext.Provider value={{items, addItem, getItem, updateItem, deleteItem}}>
      {children}
    </StockContext.Provider>
  )
}