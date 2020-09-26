
export type User = {
  address: {
    streetAddress: string,
    city: string,
    state: string,
    zip: string
  },
  description: string,
  email: string,
  firstName: string,
  id: number,
  lastName: string,
  phone: string
}


export type orderType = "asc" | "desc"