export interface User {
    id: string,
    name: string | null,
    email: string,
    password: string,
    phone: string,
    token: string | null
}