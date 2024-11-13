import React from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

class MainApp extends React.Component {
  state = {
    todoList: [],
    inputValue: '',
    error: null,
  }

  componentDidMount() {
    const storedList = localStorage.getItem('todoList')
    if (storedList) {
      this.setState({todoList: JSON.parse(storedList)})
    }
  }

  handleInputChange = event => {
    this.setState({inputValue: event.target.value})
  }

  addTodoItem = () => {
    const {inputValue} = this.state

    if (!inputValue.trim()) {
      this.setState({error: 'Enter valid text'})
      return
    }

    const newTodo = {
      text: inputValue,
      id: uuidv4(),
      isChecked: false,
    }

    this.setState(
      prevState => {
        const {todoList} = prevState
        return {
          todoList: [...todoList, newTodo],
          inputValue: '',
          error: null,
        }
      },
      () => {
        const {todoList} = this.state
        localStorage.setItem('todoList', JSON.stringify(todoList))
      },
    )
  }

  toggleTodoItemStatus = id => {
    this.setState(
      prevState => {
        const {todoList} = prevState
        const updatedList = todoList.map(todo =>
          todo.id === id ? {...todo, isChecked: !todo.isChecked} : todo,
        )
        return {todoList: updatedList}
      },
      () => {
        const {todoList} = this.state
        localStorage.setItem('todoList', JSON.stringify(todoList))
      },
    )
  }

  deleteTodoItem = id => {
    this.setState(
      prevState => {
        const {todoList} = prevState
        const updatedList = todoList.filter(todo => todo.id !== id)
        return {todoList: updatedList}
      },
      () => {
        const {todoList} = this.state
        localStorage.setItem('todoList', JSON.stringify(todoList))
      },
    )
  }

  clearAllTodos = () => {
    this.setState({todoList: []}, () => {
      localStorage.removeItem('todoList')
    })
  }

  render() {
    const {todoList, inputValue, error} = this.state

    return (
      <div className="todos-bg-container">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="todos-heading">Todos</h1>
              <h1 className="create-task-heading">
                Create <span className="create-task-heading-subpart">Task</span>
              </h1>
              <input
                type="text"
                value={inputValue}
                onChange={this.handleInputChange}
                className="todo-user-input"
                placeholder="What needs to be done?"
              />
              <button
                type="button"
                className="button"
                onClick={this.addTodoItem}
              >
                Add
              </button>
              {error && <p className="error-message">{error}</p>}
              <h1 className="todo-items-heading">
                My <span className="todo-items-heading-subpart">Tasks</span>
              </h1>
              <ul className="todo-items-container">
                {todoList.map(todo => (
                  <li
                    key={todo.id}
                    className="todo-item-container d-flex flex-row"
                  >
                    <input
                      type="checkbox"
                      checked={todo.isChecked}
                      onChange={() => this.toggleTodoItemStatus(todo.id)}
                    />
                    <label
                      className={
                        todo.isChecked
                          ? 'checked checkbox-label'
                          : 'checkbox-label'
                      }
                    >
                      {todo.text}
                    </label>
                    <button
                      type="button"
                      className="delete-icon-container"
                      onClick={() => this.deleteTodoItem(todo.id)}
                      aria-label="Delete task"
                    >
                      <i className="fa-solid fa-trash" />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="button"
                onClick={this.clearAllTodos}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MainApp
