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

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{assignment.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body2">{assignment.description}</Typography>
        <Accordion sx={{ marginTop: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Tasks</Typography>
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
              <Button onClick={handleAddTask}>Add</Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default AssignmentCard;
