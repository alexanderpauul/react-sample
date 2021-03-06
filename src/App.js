import React, { useState, useEffect } from "react";
import { isEmpty, size } from "lodash";
import shortid from "shortid";
import {
  getCollection,
  addDocument,
  updateDocument,
  deleteDocument,
} from "./actions";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await getCollection("tasks");
      if (result.statusResponse) {
        setTasks(result.data);
      }
    })();
  }, []);

  const ValidateForm = () => {
    let isValid = true;
    setError(null);
    if (isEmpty(task)) {
      setError("Debes ingresar una tarea.");
      isValid = false;
    }

    return isValid;
  };

  const addTask = async (e) => {
    e.preventDefault();

    if (!ValidateForm()) {
      return;
    }

    const result = await addDocument("tasks", { name: task });
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }

    setTasks([...tasks, { id: result.data.id, name: task }]);
    setTask("");
  };

  const editTask = (parmTask) => {
    setTask(parmTask.name);
    setEditMode(true);
    setId(parmTask.id);
  };

  const saveTask = async (e) => {
    e.preventDefault();

    if (!ValidateForm()) {
      return;
    }

    const result = await updateDocument("tasks", id, { name: task });
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }

    const editedTasks = tasks.map((item) =>
      item.id === id ? { id, name: task } : item
    );

    setTasks(editedTasks);
    setEditMode(false);
    setTask("");
    setId("");
  };

  const deleteTask = async (id) => {
    const result = await deleteDocument("tasks", id);
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }

    const filteredTask = tasks.filter((task) => task.id !== id);
    setTasks(filteredTask);
  };

  return (
    <div className="container mt-5">
      <h1>Tasks</h1>
      <hr></hr>

      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Tasks List</h4>

          {size(tasks) == 0 ? (
            <h5 className="text-center">There no task...</h5>
          ) : (
            <ul className="list-group">
              {tasks.map((task) => (
                <li className="list-group-item" key={task.id}>
                  <span className="lead">{task.name}</span>
                  <button
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-right"
                    onClick={() => editTask(task)}
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-4">
          <h4 className="text-center">{editMode ? "Edit task" : "Add Task"}</h4>

          <form onSubmit={editMode ? saveTask : addTask}>
            {error && <span className="text-danger">{error}</span>}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter task..."
              onChange={(text) => setTask(text.target.value)}
              value={task}
            />

            <button
              type="submit"
              className={
                editMode
                  ? "btn btn-warning btn-block"
                  : "btn btn-dark btn-block"
              }
            >
              {editMode ? "Edit" : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
