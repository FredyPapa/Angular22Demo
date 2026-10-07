import { Category } from "../../categories/model/category"

export interface Product{
    id?: number
    title: string
    price: number
    description: string
    category?: Category
    categoryId?: number
    images?: string[]
}