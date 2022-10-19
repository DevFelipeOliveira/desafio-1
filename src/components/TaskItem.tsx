import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { Task } from "./TaskList";
import { EditTaskArgs } from "../pages/Home/Home";

interface TasksItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}

export default function TaskItem({
  task,
  editTask,
  removeTask,
  toggleTaskDone,
}: TasksItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskNewTitleValue(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask({ taskId: task.id, taskNewTitle: taskNewTitleValue });
    setIsEditing(false); //
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={() => toggleTaskDone(task.id)}
        //TODO - use onPress (toggle task) prop
      >
        <View
          style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          //TODO - use style prop
        >
          {task.done && (
            <AntDesign name="checkcircleo" size={24} color="black" />
            // <Icon
            //   name="check"
            //   size={12}
            //   color="#FFF"
            // />
          )}
        </View>

        {/* <Text
          style={task.done ? styles.taskTextDone : styles.taskText}
          //TODO - use style prop
        >
          {task.title}
        </Text> */}

        <TextInput
          value={taskNewTitleValue}
          onChangeText={setTaskNewTitleValue}
          editable={isEditing}
          onSubmitEditing={handleSubmitEditing}
          style={task.done ? styles.taskTextDone : styles.taskText}
          ref={textInputRef}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{ paddingHorizontal: 24 }}
        onPress={() => removeTask(task.id)}
        //TODO - use onPress (remove task) prop
      >
        <EvilIcons name="trash" size={24} color="black" />
      </TouchableOpacity> */}
      <View>
        {isEditing ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
            //TODO - use onPress (remove task) prop
          >
            <EvilIcons name="close" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
            //TODO - use onPress (remove task) prop
          >
            <EvilIcons name="cancel" size={24} color="black" />
          </TouchableOpacity>
        )}
        <View />
        <TouchableOpacity
          style={{ paddingHorizontal: 24 }}
          onPress={() => removeTask(task.id)}
          //TODO - use onPress (remove task) prop
        >
          <EvilIcons name="trash" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
