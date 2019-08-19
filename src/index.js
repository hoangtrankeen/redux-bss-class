// simple example, no react-redux
import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers  } from "redux";
import './App.css';
import {VISIBILITY_FILTERS} from './constant'

//TodoReducer

var defaultState = [];

function todo(state = defaultState, action) {
    switch(action.type){
        case "ADD":
            let newItem = {
                id: Math.floor(Math.random() * new Date()),
                name: action.payload,
                complete: false
            };
            return [...state, newItem];
        case "DELETE":
            return state.filter((item) => {
                return item.id !== action.payload
            });
        case "TOGGLE":
            let newState =  [...state];
            let updateTodo = newState.map((item) => {
                return item.id === action.payload ? {
                    id: item.id,
                    name: item.name,
                    complete: !item.complete
                } : item
            })
            console.log(updateTodo)
            return updateTodo
        default:
            return state;
    }
    // when the store is created this function is called and inital state is set
}

// FilterReducer

const initialFilter = VISIBILITY_FILTERS.ALL;

function visibilityFilter(state = initialFilter, action) {
    switch (action.type) {
        case "SET_FILTER":
            return action.payload.filter
        default:
            return state
    }
}

let store = createStore(combineReducers({todo, visibilityFilter}));

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: store.getState().todo,
            filter: store.getState().visibilityFilter,
            input: ''
        };

        let nextId = 0;


        // subscribe to store updates
        // this is how you are notified and could update your UI after state changes
        store.subscribe(() => {
            this.setState({
                todo: store.getState().todo,
                filter: store.getState().visibilityFilter,
            });
        });
    }

    //Action Creator
    handleAddTodo = () => {
        store.dispatch({
            type: "ADD",
            payload: this.state.input
        });
        this.setState({
            input: ''
        })
    }

    handleDelete = (item) => {
        store.dispatch({
            type: "DELETE",
            payload: item
        });
    }

    toggleTodo = (item) => {
        store.dispatch({
            type: "TOGGLE",
            payload: item
        })
    }

    setFilter = filter => {
        store.dispatch({
        type: 'SET_FILTER',
        payload: {filter}
    })};

    filterTodo = (filter) => {
        switch (filter) {
            case VISIBILITY_FILTERS.COMPLETED:
                return this.state.todo.filter(todo => todo.complete);
            case VISIBILITY_FILTERS.INCOMPLETE:
                return this.state.todo.filter(todo => !todo.complete);
            case VISIBILITY_FILTERS.ALL:
                return this.state.todo;
             default:
                return this.state.todo;
        }
    }

    listTodos = () => {
        let todo = this.filterTodo(this.state.filter);
        return (
            <ul className="list-group">
                {
                    todo.map((item, key) => {
                        let completed = item.complete ? 'Complete' : 'Incomplete';

                        return (
                            <li  className="list-group-item"
                                 key={key}>
                                <span className={completed}
                                    onClick={() => this.toggleTodo(item.id)}
                                >{item.name}</span>
                                <span className="action-delete"
                                      onClick={() => {this.handleDelete(item.id)}}>
                                    <i className="far fa-times-circle"/></span>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    renderFilter = () => {
        return <div className="visibility-filters mb-2">
            {Object.keys(VISIBILITY_FILTERS).map(filterKey => {
                let activeButton = VISIBILITY_FILTERS[filterKey] === this.state.filter ?
                    'btn-success' : 'btn-default'
                const currentFilter = VISIBILITY_FILTERS[filterKey];
                return (
                    <button className={`btn btn-default btn-sm mr-5 ${activeButton}`} key={`visibility-filter-${currentFilter}`}
                        onClick={() => {
                            this.setFilter(currentFilter);
                        }}>{currentFilter}</button>
                );
            })}
        </div>
    }

    render() {
        console.log(this.state)
        return (
            <div className="container mt-5 mlr-5 ">
                <div className="row">
                    <div className=" col-md-6">
                        <input className="form-control" value={this.state.input} onChange={(e) => {this.setState({input: e.target.value})}} />
                        <button className="mt-2 btn btn-primary btn-block" onClick={this.handleAddTodo}>Add Todo</button>
                    </div>
                    <div className="col-md-6">
                        <h2>List of todos</h2>
                        {this.renderFilter()}
                        {this.listTodos()}
                    </div>
                </div>
            </div>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
