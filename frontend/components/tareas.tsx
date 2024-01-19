import React, { useState } from 'react';
import {Button, ButtonGroup,Input} from "@nextui-org/react";
import styles from '../styles/styleop.module.css'
function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className={styles.tabla}>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={styles.elementos}>
            {task}
            <Button color="danger" size='sm' onClick={() => deleteTask(index)}>Eliminar</Button>
          </li>
        ))}
      </ul>
      <div className={styles.add}>
        <Input
          type="text"
          placeholder="Nueva tarea"
          value={newTask}
          onChange={handleInputChange}
        />
        <Button color="success" onClick={addTask}>Agregar</Button>
      </div>
    </div>
  );
}

export default TodoList;
