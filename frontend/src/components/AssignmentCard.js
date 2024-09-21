// AssignmentCard.jsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Box,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";

const AssignmentCard = ({ assignment }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleToggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const incompleteTasks = tasks.filter((task) => !task.completed).length;

  return (
    <Card
      sx={{
        marginBottom: 2,
        marginLeft: 7,
        boxShadow: "0px 4px 20px rgba(254,158,13,0.5)", // Yellow shadow
        "&:hover": {
          boxShadow: "0px 8px 30px rgba(254,158,13,0.7)", // Darker shadow on hover
        },
      }}
    >
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {assignment.title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {assignment.description}
        </Typography>
        <Accordion sx={{ marginTop: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: "#FE9E0D", color: "black" }} // Yellow background for Tasks bar
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Tasks ({incompleteTasks} to-do)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {tasks.map((task) => (
                <ListItem key={task.id} disablePadding>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleToggleTask(task.id)}
                  />
                  <ListItemText primary={task.text} />
                  <IconButton onClick={() => handleDeleteTask(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            <Box sx={{ display: "flex", marginTop: 2 }}>
              <TextField
                fullWidth
                size="small"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
              />
              <Button
                onClick={handleAddTask}
                sx={{
                  backgroundColor: "#FE9E0D",
                  color: "black",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  borderRadius: "50px",
                  marginLeft: "20px",
                  fontSize: "12px",
                }}
              >
                Add
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default AssignmentCard;
