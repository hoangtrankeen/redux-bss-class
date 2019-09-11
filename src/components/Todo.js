import React from "react";
import '../App.css';
import {fetchTodoList} from "../actions/todo";
import {connect} from 'react-redux'
import Spinner from "../components/Spinner";


class Todo extends React.Component {

    //When component mounted, dispatch action to call api
    componentDidMount() {
        //Component that connect to redux, can dispatch action from anywhere
        //by using this.props.dispatch
        const dispatch = this.props.dispatch;
        dispatch(fetchTodoList())
    }

    //Display todoList data (show spinner if data is empty)
    listingTodos = () => {
        if(!this.props.isFetching &&  this.props.todoList.length > 0) {
            return (
                <ul className="list-group">
                    {
                        this.props.todoList.map((item, key) => {
                            let completed = item.completed ? 'Complete' : 'Incomplete';

                            return (
                                <li  className="list-group-item"
                                     key={key}>
                                <span className={completed}
                                >{item.title}</span>
                                    <span className="action-delete">
                                    <i className="far fa-times-circle"/></span>
                                </li>
                            )
                        })
                    }
                </ul>
            )
        }
        return <Spinner/>
    }


    render() {
        return (
            <div className="container mt-5 mlr-5 ">
                <div className="row">
                    <div className=" col-md-6">
                        <input className="form-control"  />
                        <button className="mt-2 btn btn-primary btn-block">Add Todo</button>
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
       isFetching: state.todo.isFetching,
   }
}

//Connect redux
export default Todo = connect(
    mapStateToProps,
)(Todo)