export interface Contract  {
   id?: number 
   employeeId: number | null
   salary: Salary
   typeContract: string
   hoursAmountMonth: number | null
   startDateContract: string
   endDateContract: string

}

export interface Salary {
    salaryAmountMonth: number | null
    salaryAmountYear: number | null
    salaryDate: string
}