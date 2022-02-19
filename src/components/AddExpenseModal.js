import { useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useBudget } from "../contexts/budgetsContext";
import { Uncategorized_Budget_Id } from "../contexts/budgetsContext";


export default function AddExpenseModal({ show, handleclose, defaultBudgetId }) {
    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    const { addExpense, budgets } = useBudget()
    function handelSubmit(e) {
        e.preventDefault()
        addExpense(
            {
                description: descriptionRef.current.value,
                amount: parseFloat(amountRef.current.value),
                budgetId: budgetIdRef.current.value
            })
        handleclose()
    }
    return (
        <Modal show={show} onHide={handleclose}>
            <Form onSubmit={handelSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="description" className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control ref={descriptionRef} type="text" required min={0} />
                    </Form.Group>
                    <Form.Group controlId="amount" className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control ref={amountRef} type="number" required min={0} step={0.1} />
                    </Form.Group>
                    <Form.Group controlId="budgetId" className="mb-3">
                        <Form.Label>Budget</Form.Label>
                        <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef} type="number" required>
                            <option id={Uncategorized_Budget_Id}>Uncategorized</option>
                            {
                                budgets.map((budget) =>
                                    <option key={budget.id} value={budget.id}>{budget.name}</option>
                                )
                            }
                        </Form.Select>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit" >Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}
