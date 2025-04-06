export type ProductCategoryType = {
  id: string
  name: string
  company_id: string
  company?: {
    name: string
  }
}

export type ProductCategoryCreateUpdateType = {
  name: string
  company_id: string
  user_id: string
}
