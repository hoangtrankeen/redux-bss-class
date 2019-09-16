import React from "react";
import '../App.css';
import {fetchTodoList, addTodoItem, toggleTodoItem, deleteTodo} from "../actions/todo";
import {connect} from 'react-redux'
import Spinner from "../components/Spinner";
import todo from "../reducers/todo";


class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.inputTodo = '';
    }

    //When component mounted, dispatch action to call api
    componentDidMount() {
        //Component that connect to redux, can dispatch action from anywhere
        //by using this.props.dispatch
        const dispatch = this.props.dispatch;
        dispatch(fetchTodoList())
    }

    //Display todoList data (show spinner if data is empty)
    listingTodos = () => {
        if(this.props.todoList.length > 0) {
            return (
                <ul className="list-group">
                    {
                        this.props.todoList.map((item, key) => {
                            let completed = item.completed ? 'Complete' : 'Incomplete';

                            return (
                                <li  className="list-group-item"
                                     key={key}>
                                    <span>{item.title}</span>
                                    <div className="toolbar-action">
                                        <span  className={completed}
                                               onClick={() => this.handleToggle(!item.completed , item.id )}>

                                            {!item.completed ? <span className="badge badge-warning">Pending</span> :
                                                <span className="badge badge-success">Done</span>}
                                        </span>
                                        <span
                                        onClick={() => this.handleDelete(item.id)}
                                        ><i className="fas fa-trash-alt"/></span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            )
        }
        return <Spinner/>
    }
    //DeleteTodo
    handleDelete = (todoId) => {
        this.props.dispatch(deleteTodo(todoId))
    }

    //toggleItem
    handleToggle = (isCompleted, todoId) => {
        this.props.dispatch(toggleTodoItem(isCompleted, todoId))
    }

    //Add todo item
    handleAddTodo = () => {
        this.props.dispatch(addTodoItem(this.inputTodo.value))
        this.inputTodo.value = '';
    }

    shouldShowLoading = () => {
        if (this.props.isLoading ) {
            this.addBodyClass('is-loading')
            return <Spinner/>
        }
        this.removeBodyClass('is-loading')

    }

    addBodyClass = className => document.body.classList.add(className);
    removeBodyClass = className => document.body.classList.remove(className);


    render() {
        return (
            <div className="container mt-5 mlr-5 ">
                {this.shouldShowLoading()}
                <div className="row">
                    <div className=" col-md-6">
                        <input className="form-control" ref={target => this.inputTodo = target} />
                        <button className="mt-2 btn btn-primary btn-block"
                                onClick={this.handleAddTodo}>Add Todo</button>
                    </div>
                    <div className="col-md-6">
                        {/*Show the data*/}
                        <h2>List of todos</h2>

                        {this.listingTodos()}
                    </div>
                </div>
            </div>
        );
    }
}

//Select data from state
//It is called every time the store state changes.
//It returns an object of data this component needs,
// for example: component can access todoList state by using this.props.todoList

const mapStateToProps = (state) => {
    return {
        todoList: state.todo.todoList,
        isLoading: state.todo.isLoading,
    }
}

//Connect redux
export default Todo = connect(
    mapStateToProps,
)(Todo)