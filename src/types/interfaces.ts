export interface Item {
  id: number
  name: string
  email: string
  role: string
}

export interface Person {
  id: number
  name: string
  email: string
  age: number
  city: string
  cpf?: string
  phone?: string
  address?: Address
}

export interface Address {
  cep: string
  logradouro: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}
