import { useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"

import GoalItem from "./components/GoalItem"
import GoalInput from "./components/GoalInput"

export default function App() {
  const [courseGoals, setCourseGoals] = useState([])

  const addGoalHandler = (enteredGoalText) => {
    setCourseGoals((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        text: enteredGoalText,
      },
    ])
  }

  const deleteGoalHandler = (id) => {
    setCourseGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== id)
    )
  }

  return (
    <View style={styles.appContainer}>
      {/* <View style={styles.goalsList}>
        <ScrollView alwaysBounceVertical={false}>
          {courseGoals.map((goal) => (
            <View style={styles.goalItem} key={goal}>
              <Text style={styles.goalText}>{goal}</Text>
            </View>
          ))}
        </ScrollView>
      </View> */}
      <GoalInput onAddGoal={addGoalHandler} />
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
  )
}

const styles = StyleSheet.create({
  appContainer: {
    padding: 50,
    paddingHorizontal: 16,
    flex: 1,
  },
  goalsList: {
    // backgroundColor: "blue",
    flex: 5,
  },
})
