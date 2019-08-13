// simple example, no react-redux
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import './App.css';

var defaultState = [];

function todo(state = defaultState, action) {
    switch(action.type){
        case "ADD":
            return [...state, action.payload];
        case "DELETE":
            return state.filter((item) => {
                return item !== action.payload
            });
        default:
            return state;

    }
    // when the store is created this function is called and inital state is set
}

var store = createStore(todo);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: store.getState(),
            input: ''
        };

        // subscribe to store updates
        // this is how you are notified and could update your UI after state changes
        store.subscribe(() => {
            console.log(store.getState())
            this.setState({
                todo: store.getState()
            });
        });
    }

    //Action Creator
    handleAddTodo = () => {
        store.dispatch(this.addTodoAction(this.state.input));
        this.setState({
            input: ''
        })
    }

    handleDelete = (item) => {
        store.dispatch(this.deleteTodoAction(item));
    }

    //Action
    addTodoAction = (item) => {
        return {
            type: "ADD",
            payload: item
        }
    }
    //Action delete
    deleteTodoAction = (item) => {
        return {
            type: "DELETE",
            payload: item
        }
    }

    //

    listTodos = () => {
        return (
            <ul className="list-group">
                {
                    this.state.todo.map((item, key) => {
                        return (
                            <li  className="list-group-item"
                                 key={key}
                                 onClick={() => {this.handleDelete(item)}}>{item}</li>
                        )
                    })
                }
            </ul>
        )
    }

    render() {
        return (
            <div className="container">
               <div className="row">
                   <div className=" col-md-6">
                       <button className="btn btn-primary" onClick={this.handleAddTodo}>Add Todo</button>
                       <input className="form-control" value={this.state.input} onChange={(e) => {this.setState({input: e.target.value})}} />
                   </div>
                   <div className="col-md-6">
                       <h2>Lists of todos</h2>
                       {this.listTodos()}
                   </div>
               </div>
            </div>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
