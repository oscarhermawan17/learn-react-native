import { createContext, useReducer } from "react"

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2024-12-20"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.99,
    date: new Date("2024-1-05"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2024-12-03"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2024-12-19"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: new Date("2024-12-23"),
  },
  {
    id: "e6",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2024-12-19"),
  },
  {
    id: "e7",
    description: "A pair of trousers",
    amount: 89.99,
    date: new Date("2024-1-05"),
  },
  {
    id: "e8",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2024-12-01"),
  },
  {
    id: "e9",
    description: "A book",
    amount: 14.99,
    date: new Date("2024-12-19"),
  },
  {
    id: "e10",
    description: "Another book",
    amount: 18.59,
    date: new Date("2024-12-18"),
  },
]

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, aomunt, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, aomunt, date }) => {},
})

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString()
      return [{ ...action.payload, id: id }, ...state]
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
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES)

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData })
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
