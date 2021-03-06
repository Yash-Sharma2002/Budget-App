import React, { useContext} from "react"
import { v4 as uuidV4 } from "uuid"
import useLocalStorage from "../hooks/useLocalStorage"

const BudgetsContext = React.createContext()
export function useBudget() {
    return useContext(BudgetsContext)

}

export const Uncategorized_Budget_Id = "Uncategorized"

export const BudgetsProvider = ({ children }) => {

    const [budgets, setBudgets] = useLocalStorage("budgets",[])
    const [expenses, setExpenses] = useLocalStorage("expenses",[])
    function getBudget(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }
    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId)
      }
    function addBudget({ name, max }) {
        setBudgets(prevBudgets => {
            if(prevBudgets.find(budget=>budget.name === name)){
                return prevBudgets
            }
            return [...prevBudgets, { id: uuidV4(), name, max }]
        })
    }
    function addExpense({description,amount,budgetId}) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(),description,amount,budgetId }]
        })
     }
    function deleteBudget({id}) {
        setBudgets(prevBudgets=>{
            return prevBudgets.filter(budget=>budget.id !== id)
        })
     }
    function deleteExpense({id}) {
        setExpenses(prevExpenses=>{
            return prevExpenses.filter(Expenses=>Expenses.id !== id)
        })
     }
    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudget,
            getBudgetExpenses,
            addBudget,
            addExpense,
            deleteBudget,
            deleteExpense
        }}>
            {children}
        </BudgetsContext.Provider>
    ) 
}