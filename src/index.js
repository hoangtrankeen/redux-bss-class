// simple example, no react-redux
import React from "react";
import ReactDOM from "react-dom";
import { createStore  } from "redux";
import './App.css';
import {VISIBILITY_FILTERS} from './constant'
import {rootReducer} from './reducers'
import {handleAddTodo, handleDelete, toggleTodo} from "./actions/todo";
import {setFilter} from "./actions/filter";
import {Provider, connect} from 'react-redux'

let store = createStore(rootReducer);

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: this.props.todo,
            filter: this.props.filter,
            input: ''
        };

        console.log(this.state)
    }


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
                                      onClick={() => this.props.toggleTodo(item.id)}
                                >{item.name}</span>
                                <span className="action-delete"
                                      onClick={() => {this.props.handleDelete(item.id)}}>
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
                                this.props.setFilter(currentFilter);
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
                        <button className="mt-2 btn btn-primary btn-block" onClick={() => this.props.handleAddTodo(this.state.input)}>Add Todo</button>
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

const mapStateToProps = (state) => {
   return {
       todo: state.todo,
       filter: state.filter
   }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleAddTodo: (item) => {handleAddTodo(item, dispatch)},
        handleDelete: (item) => {handleDelete(item, dispatch)},
        toggleTodo: (item) => {toggleTodo(item, dispatch)},
        setFilter: (item) => {setFilter(item, dispatch)}
    }
}

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Todo)


// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

const rootElement = document.getElementById("root");
ReactDOM.render(<Provider store={store}><App /></Provider>, rootElement);