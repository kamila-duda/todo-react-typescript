import React, {  useState } from "react";
import "./App.css";
import {Container} from "@material-ui/core";
import TasksInput from "./components/TasksInput";
import ContainedButtons from "./components/ContainedButtons";
import {Todo} from "./types";

function App() {

  
  const [hideDone, setHideDone] = useState(false);
  const [tasks, setTasks] = useState<Todo[]>([
    {
      id: 1,
      text: "Nauczyć się TypeScripta",
      done: false,
    },
    {
      id: 2,
      text: "Napisać jeszcze raz todo listę",
      done: false,
    },
  ]);

  

  const toggleDone = (checkTaskId: number) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === checkTaskId) {
          return { ...task, done: !task.done };
        }
        return task;
      })
    );
  };

  

  const setAllDone = () => {
    setTasks(tasks =>
      tasks.map(task => ({
        ...task,
        done: true
      }))
    )
  }

  
 

  return (
    <Container fixed>
      <h1>Lista zadań</h1>
      <TasksInput setTasks={setTasks} tasks={tasks}/>
     
      <div>
      {tasks.length > 0 && (
        <ContainedButtons tasks={tasks} setAllDone={setAllDone} setHideDone={setHideDone} hideDone={hideDone}/>        
      )}
    </div>
      <ul>
        {tasks.map((task) => (
          <li className={hideDone && task.done ? "taskListItemHide" : "taskListItem"} key={task.id}>
            <button className="taskToggleDone__button" onClick={() => toggleDone(task.id)}>{task.done ? "✔" : ""}</button>
            <p className={task.done ? "taskContent--linethrough" : "taskContent"}>{task.text}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default App;
