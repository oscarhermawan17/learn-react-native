import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"

export default function App() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const changeTitleHandler = (value) => {
    setTitle(value)
  }

  const changeDescriptionHandler = (value) => {
    setDescription(value)
  }

  const submitHandler = () => {
    console.log({ title, description })
  }

  const cancelHandler = () => {
    setTitle("")
    setDescription("")
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.topContent}>
        <Text>Kosong</Text>
        <TextInput
          onChangeText={changeTitleHandler}
          value={title}
          style={styles.inputText}
          placeholder="Title"
        />
        <TextInput
          onChangeText={changeDescriptionHandler}
          value={description}
          style={styles.inputText}
          placeholder="Description"
        />

        <View style={styles.buttonsContainer}>
          <Pressable onPress={cancelHandler}>
            <View style={[styles.button, { backgroundColor: "gray" }]}>
              <Text>Cancel</Text>
            </View>
          </Pressable>
          <Pressable onPress={submitHandler}>
            <View style={[styles.button, { backgroundColor: "green" }]}>
              <Text>Submit</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.midContent}>
        <Text>Mid</Text>
      </View>
      <View style={styles.botContent}>
        <Text>Bottom</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  topContent: {
    flex: 1,
    backgroundColor: "red",
    padding: 12,
  },
  inputText: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 10,
    padding: 8,
  },
  midContent: {
    flex: 1,
    backgroundColor: "green",
  },
  botContent: {
    flex: 1,
    backgroundColor: "blue",
  },
})
