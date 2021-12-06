//third-party
import { createStore, applyMiddleware } from "redux";
import{composeWithDevTools} from 'redux-devtools-extension'
import thunk from "redux-thunk";

//application
import rootReducer from "./rootReducer";

const todosFromLocalStorage = localStorage.getItem( 'todoListItems' )
    ? JSON.parse( localStorage.getItem( 'todoListItems' ) )
    :[]

const initialState = {
    todoList: { todos: todosFromLocalStorage} 
}

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware( thunk )
    )
);

export default store;