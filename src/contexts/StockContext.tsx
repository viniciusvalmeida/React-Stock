import { ReactNode, createContext, useState } from "react";
import { ItemIfc, DefaultItemIfc } from "../common/interfaces";

interface StockContextProviderProps {
  children: ReactNode
}

interface StockContextIfc {
  items: ItemIfc[]
  addItem: (newItem: DefaultItemIfc) => void
  getItem: (id: number) => ItemIfc | undefined
  updateItem: (id: number, newAttr: DefaultItemIfc) => void
  deleteItem: (id: number) => void
}

export const StockContext = createContext({} as StockContextIfc)

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

  const addItem = (newItem: DefaultItemIfc) => {
    const id = Math.floor(Math.random() * 1000000)
    const createdAt = new Date()
    const updatedAt = new Date()
    const item: ItemIfc = { id, createdAt, updatedAt, ...newItem}

    setItems( currentState => {
      const newState = [ ...currentState, item ]
      localStorage.setItem( 'stock-items', JSON.stringify(newState) )
      return newState
    } )
  }

  const getItem = (id: number) => items.find(item => item.id === id)

  const updateItem = (id: number, newAttr: DefaultItemIfc) => {
    const updatedAt = new Date()
    
    setItems( currentState => {
      const newState = currentState.map( item => {
        if (item.id === id) {
          return { ...item, ...newAttr, updatedAt }
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