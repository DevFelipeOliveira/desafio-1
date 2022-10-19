import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../../components/Header';
import { Task, TasksList } from '../../components/TaskList';
import { TodoInput } from '../../components/TodoInput';

export type EditTaskArgs = {
    taskId: number,
    taskNewTitle: string,
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle);
    if(taskWithSameTitle) {
        return Alert.alert('Task já cadastrada',"Você não pode cadastrar essa task")
    }

    const newTask = { id: new Date().getTime(), title: newTaskTitle, done: false };
    setTasks(oldTasks => [...oldTasks, newTask]);
    //TODO - add new task
  }

  function handleToggleTaskDone(id: number) {
          //TODO - toggle task done if exists
    const updatedTasks = tasks.map(task => ({...task}))
    const foundItem = updatedTasks.find(item => item.id === id);
    if(!foundItem) 
        return

    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
    console.log(tasks)
    }
    
    function handleRemoveTask(id: number) {
        //TODO - remove task from state
        Alert.alert('Remover item','Tem certeza?',[
            {
                style: 'cancel',
                text: 'Não',
            },
            {
                style: 'destructive',
                text: 'Sim',
                onPress:()=>{
                    setTasks(oldTasks => oldTasks.filter(tasks => tasks.id !== id));
                }
            }
        ])
  }

  function handleEditTask({taskId,taskNewTitle}: EditTaskArgs){
    const updatedTasks = tasks.map(task => ({...task}))
    const taskToUpdated = updatedTasks.find(task => task.id === taskId);
    if(!taskToUpdated) 
        return

        taskToUpdated.title = taskNewTitle;
        setTasks(updatedTasks);
    }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})