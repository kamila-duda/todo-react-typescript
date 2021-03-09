import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Todo } from "../types";

interface ContainedButtonsProps {
  tasks: Todo[];
  setHideDone: (value: boolean | ((value: boolean) => boolean)) => void;
  setAllDone: () => void;
  hideDone: boolean;
}

const ContainedButtons = ({
  tasks,
  setHideDone,
  setAllDone,
  hideDone,
}: ContainedButtonsProps) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        "& > *": {
          margin: theme.spacing(1),
        },
      },
    })
  );
  const classes = useStyles();

  const toggleHideDone = () => {
    setHideDone((hideDone) => !hideDone);
  };

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        disabled={tasks.every(({ done }) => !done)}
        onClick={() => toggleHideDone()}
      >
        {hideDone ? "Pokaż ukończone" : "Ukryj ukończone"}
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={tasks.every(({ done }) => done)}
        onClick={() => setAllDone()}
      >
        Ukończ wszystkie
      </Button>
    </div>
  );
};

export default ContainedButtons;
