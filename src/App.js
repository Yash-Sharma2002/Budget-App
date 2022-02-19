import React, { useState } from 'react'
import { Stack, Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import BudgetCard from './components/BudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import ViewExpenseModal from './components/ViewExpenseModal';
import { Uncategorized_Budget_Id, useBudget } from './contexts/budgetsContext';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState(false)
  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }
  const { budgets, getBudgetExpenses } = useBudget()
  return (
    <>
      <Container className='my-4'>
        <Stack direction="horizontal" gap="2" className="mb-4 d-flex">
          <h1 className='me-auto'>Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budgets</Button>
          <Button variant="outline-success" onClick={openAddExpenseModal}>Add Expenses</Button>
        </Stack>
        <div style={{
          display: 'grid',
          gridTemplateColumns: "repeat(auto-fill,minmax(422px,1fr))",
          gap: '1rem',
          alignItems: 'flex-start',
        }} >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) =>
              total + expense.amount, 0)
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                gray
                max={budget.max}
                openAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpenseClick={() => setViewExpensesModalBudgetId(budget.id)} />
            )
          })
          }
          <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal}
            onViewExpenseClick={() =>
              setViewExpensesModalBudgetId(Uncategorized_Budget_Id)
            } />
          <TotalBudgetCard />

        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleclose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleclose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpenseModal
        budgetId={viewExpensesModalBudgetId}
        handleclose={() => setViewExpensesModalBudgetId()} />
    </>
  );
}

export default App;
