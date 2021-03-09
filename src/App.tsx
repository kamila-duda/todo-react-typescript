import React, {  useState } from "react";
import "./App.css";
import {Grid} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
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
  };

  const removeTask = (id:number) => {
    setTasks(tasks => tasks.filter(task => task.id !== id))
  }

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      width: "90%",
      margin: "50px auto 0",
      border: "1px solid #fff",
      borderRadius: "25px",
      boxShadow: "0px 2px 12px #000",
      backgroundColor: "#ffffff7a",
      
    },
    centerText: {
      textAlign: "center",
    },
    center: {
      padding: theme.spacing(2),
    },
    buttonsGroup: {
      display: "flex",
      justifyContent: "center",
    }
  }),
);
const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.container}>
      <Grid item xs={12}>
      <h1 className={classes.centerText}>Lista zadań</h1>
      </Grid>
      <Grid className={classes.center} item xs={12}>
      <TasksInput setTasks={setTasks} tasks={tasks}/>
      </Grid>
      <Grid className={classes.buttonsGroup} item xs={12}>
      {tasks.length > 0 && (
        <ContainedButtons tasks={tasks} setAllDone={setAllDone} setHideDone={setHideDone} hideDone={hideDone}/>        
      )}
    </Grid>
    <Grid className={classes.center} item xs={12}>
    <ul className="taskList">
        {tasks.map((task) => (
          <li className={hideDone && task.done ? "taskListItemHide" : "taskListItem"} key={task.id}>
            <button className="taskToggleDone__button" onClick={() => toggleDone(task.id)}>{task.done ? "✔" : ""}</button>
            <p className={task.done ? "taskContent taskContent--linethrough" : "taskContent"}>{task.text}</p><DeleteIcon style={{ cursor: "pointer" }} color="secondary" fontSize="large" onClick={() => removeTask(task.id)} />
          </li>
        ))}
      </ul>
    </Grid>
      
      </Grid>
      </div>
  );
}

export default App;
