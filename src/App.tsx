import React, { useRef, useState } from "react";
import "./App.css";
import { Todo } from "./types";
import {Container, TextField, Button} from "@material-ui/core";

function App() {
  const [taskContent, setNewTask] = useState("");
  const [tasks, setTasks] = useState<Todo[]>([
    {
      id: 1,
      text: "Test",
      done: false,
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  const toggleDone = (checkTask: Todo) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === checkTask.id) {
          return { ...task, done: !checkTask.done };
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
        <Button variant="contained" color="secondary" type="submit">
          Dodaj zadanie
        </Button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <button onClick={() => toggleDone(task)}>X</button>
            <p>{task.text}</p>
            <span>{task.done ? "skończone" : "nieskończone"}</span>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default App;
