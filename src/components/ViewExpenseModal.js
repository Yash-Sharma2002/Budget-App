import { Stack, Modal, Button } from "react-bootstrap";
import { useBudget } from "../contexts/budgetsContext";
import { Uncategorized_Budget_Id } from "../contexts/budgetsContext";
import { CurrencyConvertor } from "../utills";


export default function ViewExpenseModal({ budgetId, handleclose }) {
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudget()
    const expenses = getBudgetExpenses(budgetId)
    const budget = Uncategorized_Budget_Id === budgetId ? { name: "Uncategorized", id: Uncategorized_Budget_Id, } :
        budgets.find(b => b.id === budgetId)
    return (
        <Modal show={budgetId != null} onHide={handleclose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horiziontal" gap="2">
                        <div>Expenses - {budget?.name}</div>
                        {
                            budgetId !== Uncategorized_Budget_Id && (
                                <Button onClick={() => {
                                    deleteBudget(budget)
                                    handleclose()
                                }} variant="outline-danger">Delete</Button>
                            )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical" gap="3">
                    {expenses.map(expense => (
                        <Stack direction="horizontal" gap="2" key={expense.id}>
                            <div className="me-auto fs-4">{expense.description}</div>
                            <div className="fs-5">
                                {CurrencyConvertor.format(expense.amount)}
                            </div>
                            <Button
                                onClick={() => deleteExpense(expense)}
                                size="sm"
                                variant="outline-danger"
                            >
                                &times;
                            </Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    )
}
