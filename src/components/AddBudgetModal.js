import { useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useBudget } from "../contexts/budgetsContext";


export default function AddBudgetModal({ show, handleclose }) {
    const nameRef = useRef()
    const maxRef = useRef()
    const {addBudget} = useBudget()
    function handelSubmit(e) {
        e.preventDefault()
        addBudget(
            {
                name: nameRef.current.value,
                max: parseFloat(maxRef.current.value)
            })
            handleclose()
    }
    return (
        <Modal show={show} onHide={handleclose}>
            <Form onSubmit={handelSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="name" className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={nameRef} type="text" required min={0} />
                    </Form.Group>
                    <Form.Group controlId="max-spending" className="mb-3">
                        <Form.Label>Maximum Spending</Form.Label>
                        <Form.Control ref={maxRef} type="number" required min={0} step={0.1} />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit" >Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}
