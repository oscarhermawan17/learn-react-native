import { createContext, useReducer } from "react"

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, aomunt, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, aomunt, date }) => {},
})

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state]
    case "SET":
      const inverted = action.payload.reverse()
      return inverted
    case "UPDATE":
      const findIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      )
      const updatableExpense = state[findIndex]

      const updatedItem = { ...updatableExpense, ...action.payload.data }
      const updatedExpenses = [...state]
      updatedExpenses[findIndex] = updatedItem

      return updatedExpenses
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload)
    default:
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, [])

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData })
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses })
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id })
  }

  function updateExpense(id, expenseData) {
    dispatch({
      type: "UPDATE",
      payload: {
        id,
        data: expenseData,
      },
    })
  }

  const value = {
    expenses: expensesState,
    addExpense,
    setExpenses,
    deleteExpense,
    updateExpense,
  }

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}

export default ExpensesContextProvider
