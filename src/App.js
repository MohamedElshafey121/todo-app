//react
import React from "react";
//style
import "./style.css";
//third-party
import {BrowserRouter as Router,Route} from 'react-router-dom'
import ToDoScreen from './components/ToDoScreen'
import AddToDoScreen from "./components/AddToDoScreen";
import EditTodoList from "./components/EditTodoList";


function App () {
 
  return (
    <Router>
      <React.Fragment>
        <Route path='/' component={ToDoScreen} exact />
        <Route path='/add' component={AddToDoScreen} exact/>
        <Route path='/task/:title' component={EditTodoList} exact/>
      </React.Fragment>
    </Router>
    );
}


export default App;
