import { Uncategorized_Budget_Id, useBudget } from '../contexts/budgetsContext'
import BudgetCard from './BudgetCard'

export default function UncategorizedBudgetCard(props) {
    const {getBudgetExpenses} = useBudget()
    const amount = getBudgetExpenses(Uncategorized_Budget_Id).reduce((total, expense) =>
        total + expense.amount, 0)
        if(amount===0) return null
    return (
        <BudgetCard amount={amount} name="Uncategorized" gray {...props} />
    )
}
