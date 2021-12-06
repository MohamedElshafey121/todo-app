import { combineReducers } from "redux";
import {todoReducer,getOneTodoReducer} from './todos'

export default combineReducers( {
    todoList: todoReducer,
    todoDetails:getOneTodoReducer
});
