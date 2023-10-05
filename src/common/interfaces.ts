export interface ItemIfc {
  id: number
  name: string
  qtd: number
  price: number
  category: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface DefaultItemIfc {
  name: string
  qtd: number
  price: number
  category: string
  description: string
}