export type CompanyType = {
  id: string
  name: string
  created_at: string
  sub?: {
    id: string
    name: string
  }[]
}

export type CompanyCreateUpdateType = {
  name: string
  parent_id: string
}
