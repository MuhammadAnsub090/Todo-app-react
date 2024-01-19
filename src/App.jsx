import React, { useState, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
} from '@mui/material';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const inputRef = useRef(null);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => [...prevTasks, { id: Date.now(), text: newTask }]);
      setNewTask('');
      inputRef.current.focus();
    }
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTask(taskToEdit);
    setNewTask(taskToEdit.text);
    inputRef.current.focus();
  };

  const handleSaveTask = () => {
    if (editingTask && newTask.trim() !== '') {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id ? { ...task, text: newTask } : task
        )
      );
      setEditingTask(null);
      setNewTask('');
      inputRef.current.focus();
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setEditingTask(null);
    setNewTask('');
    inputRef.current.focus();
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', marginTop: 5 }}>
      <Typography
        variant="h6"
        sx={{
          marginBottom: 2,
          backgroundColor: '#000',
          color: 'white',
          textAlign: 'center',
        }}
      >
        Todo App
      </Typography>

      <TextField
        label="New Task"
        variant="outlined"
        fullWidth
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        inputRef={inputRef}
        onKeyDown={(e) => e.key === 'Enter' && (editingTask ? handleSaveTask() : handleAddTask())}
      />
      <Button
        variant="contained"
        onClick={editingTask ? handleSaveTask : handleAddTask}
        sx={{ marginTop: 2 }}
      >
        {editingTask ? 'Save Task' : 'Add Task'}
      </Button>

      {tasks.length > 0 ? (
        <List sx={{ marginTop: 2 }}>
          {tasks.map((task) => (
            <ListItem key={task.id} disablePadding>
              {editingTask && editingTask.id === task.id ? (
                <TextField
                  fullWidth
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  sx={{ color: 'white' }}
                />
              ) : (
                <ListItemText primary={task.text} sx={{ color: 'white' }} />
              )}
              <ListItemSecondaryAction>
                {editingTask && editingTask.id === task.id ? (
                  <IconButton onClick={handleSaveTask} sx={{ color: 'white' }}>
                    &#10004;
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handleEditTask(task.id)} sx={{ color: 'white' }}>
                    &#x1F58A;
                  </IconButton>
                )}
                <IconButton onClick={() => handleDeleteTask(task.id)} sx={{ color: 'white' }}>
                  &#x1F5D1;
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" sx={{ marginTop: 2, color: '#fff' }}>No tasks added yet.</Typography>
      )}
    </Box>
  );
};

export default TodoApp;
