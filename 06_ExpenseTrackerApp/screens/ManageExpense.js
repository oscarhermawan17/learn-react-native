import { useContext, useLayoutEffect } from "react"
import { StyleSheet, View } from "react-native"

import Button from "../UI/Button"
import IconButton from "../UI/IconButton"
import { GlobalStyles } from "../constants/styles"
import { ExpensesContext } from "../store/expenses-context"

export default function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext)

  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    })
  }, [navigation, isEditing])

  const deleteExpenseHandler = () => {
    expensesCtx.deleteExpense(editedExpenseId)
    navigation.goBack()
  }

  const cancelHandler = () => {
    navigation.goBack()
  }

  const confirmHandler = () => {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, {
        description: "Updated",
        amount: 29.99,
        date: new Date("2024-11-23"),
      })
    } else {
      expensesCtx.addExpense({
        description: "Text",
        amount: 19.99,
        date: new Date("2024-11-23"),
      })
    }
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    margin: 16,
    paddingTop: 8,
    borderWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
})
