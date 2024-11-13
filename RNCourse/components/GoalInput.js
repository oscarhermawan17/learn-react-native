import { useState } from "react"
import { Button, StyleSheet, TextInput, View } from "react-native"

export default function GoalInput(props) {
  const [enteredGoalText, setEnteredGoalText] = useState("")

  const goalInputHandler = (enteredText) => {
    setEnteredGoalText(enteredText)
  }

  const addGoalHandler = () => {
    props.onAddGoal(enteredGoalText)
    setEnteredGoalText("")
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        onChangeText={goalInputHandler}
        placeholder="Your course goal"
        value={enteredGoalText}
      />
      <Button title="Add Goal" onPress={addGoalHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    // backgroundColor: "red",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
    width: "50%",
    padding: 8,
  },
})
