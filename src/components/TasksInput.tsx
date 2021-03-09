import React, { useRef, useState } from "react";
import { TextField, Button, makeStyles } from "@material-ui/core";
import { Todo } from "../types";

interface TasksInputProps {
  tasks: Todo[];
  setTasks: (value: Todo[] | ((value: Todo[]) => Todo[])) => void;
}

const TasksInput = ({ setTasks, tasks }: TasksInputProps) => {
  const [taskContent, setNewTask] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

  const useStyles = makeStyles({
    root: {
      background: "#fff",
      marginRight: "10px",
    },
  });
  const classes = useStyles();

  return (
    <form onSubmit={onFormSubmit}>
      <TextField
        classes={{
          root: classes.root,
        }}
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
  );
};

export default TasksInput;
