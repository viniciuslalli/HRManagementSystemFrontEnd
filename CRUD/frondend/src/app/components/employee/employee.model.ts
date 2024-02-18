export interface Employee {
    id?: number 
    name: string 
    surname: string
    salary: number | null
    gender: string
    address: string // put Addres Object 
    email: string
    phoneNumber: string
    nationality: string
    dateOfBirth: string
    roleId?: number
    departmentId?: number

}