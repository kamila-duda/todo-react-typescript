import React, { useRef, useState } from "react";
import "./App.css";
import {Container, TextField, Button} from "@material-ui/core";
import ContainedButtons from "./components/ContainedButtons";
import {Todo} from "./types";

function App() {

  const [taskContent, setNewTask] = useState("");
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

  const inputRef = useRef<HTMLInputElement>(null);

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

  const addNewTask = (content: string) => {
    setTasks((tasks) => [
      ...tasks,
      {
        id: tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1,
        text: content,
        done: false,
      },
    ]);
  };

  const setAllDone = () => {
    setTasks(tasks =>
      tasks.map(task => ({
        ...task,
        done: true
      }))
    )
  }

  const onFormSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
    if (taskContent.trim() === "") {
      return;
    }
    addNewTask(taskContent.trim());
    setNewTask("");
  };

  return (
    <Container fixed>
      <h1>Lista zadań</h1>
      <form onSubmit={onFormSubmit}>
        <TextField
          id="outlined-basic"
          label="Your task"
          variant="outlined"
          ref={inputRef}
          value={taskContent}
          onChange={({ target }) => setNewTask(target.value)}
        />
        <Button size="large" variant="contained" color="secondary" type="submit">
          Dodaj zadanie
        </Button>
      </form>
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
