import { isEmpty } from "lodash";
import React, { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const addTask = (e) => {
    e.preventDefault();
    if (isEmpty(task)) {
      console.log("Task empty");
      return;
    }

    console.log("OK");
    setTask("");
  };

  return (
    <div className="container mt-5">
      <h1>Tasks</h1>
      <hr></hr>

      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Tasks List</h4>

          <ul className="list-group">
            <li className="list-group-item">
              <span className="lead">Task Name</span>
              <button className="btn btn-danger btn-sm float-right mx-2">
                Delete
              </button>
              <button className="btn btn-warning btn-sm float-right">
                Edit
              </button>
            </li>
          </ul>
        </div>

        <div className="col-4">
          <h4 className="text-center">Form</h4>

          <form onSubmit={addTask}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter task..."
              onChange={(text) => setTask(text.target.value)}
              value={task}
            />

            <button type="submit" className="btn btn-dark btn-block">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
