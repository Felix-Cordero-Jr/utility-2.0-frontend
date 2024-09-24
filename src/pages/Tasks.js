import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Checkbox, IconButton, Grid } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ description: '', dueDate: '' });
  const [editIndex, setEditIndex] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Add or edit task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedTasks = tasks.map((task, index) => index === editIndex ? newTask : task);
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { ...newTask, completed: false }]);
    }
    setNewTask({ description: '', dueDate: '' });
  };

  // Toggle task completion
  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, idx) =>
      idx === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Edit task
  const editTask = (index) => {
    setNewTask(tasks[index]);
    setEditIndex(index);
  };

  // Delete task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, idx) => idx !== index));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Task Manager</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Task Description"
          name="description"
          value={newTask.description}
          onChange={handleChange}
          required
        />
        <TextField
          type="date"
          label="Due Date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          {editIndex !== null ? 'Edit Task' : 'Add Task'}
        </Button>
      </form>

      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {tasks.map((task, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {task.description} ({task.dueDate})
                </Typography>
                <Typography variant="body2" color={task.completed ? "textSecondary" : "textPrimary"}>
                  Status: {task.completed ? 'Completed' : 'Pending'}
                </Typography>
                <Checkbox
                  checked={task.completed}
                  onChange={() => toggleComplete(index)}
                  color="primary"
                />
                <IconButton onClick={() => editTask(index)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => deleteTask(index)}>
                  <Delete />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Tasks;
