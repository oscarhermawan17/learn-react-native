import { useState } from "react"
import { Button, FlatList, StyleSheet, View } from "react-native"
import { StatusBar } from "expo-status-bar"

import GoalItem from "./components/GoalItem"
import GoalInput from "./components/GoalInput"

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [courseGoals, setCourseGoals] = useState([])

  const startAddGoalHandler = () => {
    setModalIsVisible(true)
  }

  const endAddGoalHandler = () => {
    setModalIsVisible(false)
  }

  const addGoalHandler = (enteredGoalText) => {
    setCourseGoals((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        text: enteredGoalText,
      },
    ])
    endAddGoalHandler()
  }

  const deleteGoalHandler = (id) => {
    setCourseGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== id)
    )
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#5e0acc"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={modalIsVisible}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsList}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  onDeleteItem={deleteGoalHandler}
                  id={itemData.item.id}
                />
              )
            }}
            // in this case, we use "id" instead of "key" (default),
            // THEN we need keyExtractor props to tell FlatList our PK.
            keyExtractor={(item, index) => item.id}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
  },
  goalsList: {
    flex: 5,
  },
})
