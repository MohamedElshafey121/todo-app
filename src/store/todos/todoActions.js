import {
    ADD_TODO_ITEM,
    REMOVE_TODO_ITEM,
    GET_TODO_ITEM,
    RESET_OPERATION,
    SET_TODO_DONE,
    EDIT_TODO_ITEM,
    SET_TODO_IN_PROGRESS,
    SORT_LIST,
    SORT_BY_PRIORITY
} from './todoActionTypes'

function addTodoItem ( todo ) {
    return ( dispatch, getState ) => {
        dispatch({
        type: ADD_TODO_ITEM,
        payload:todo
        } )
        
        localStorage.setItem( 'todoListItems', JSON.stringify( getState().todoList.todos ) );
    }
}

function editTodoItem ( oldTitle,todo ) {
    return ( dispatch, getState ) => {
        dispatch( {
            type: EDIT_TODO_ITEM,
            payload: todo,
            oldTitle:oldTitle
        } );
        
        localStorage.setItem( 'todoListItems', JSON.stringify( getState().todoList.todos ) );
    }
}


function removeToDoItem ( title ) {
    return ( dispatch, getState ) => {
        dispatch({
        type: REMOVE_TODO_ITEM,
        payload:title
        } )

        localStorage.setItem( 'todoListItems', JSON.stringify( getState().todoList.todos ) );
    }
};


function getTodoItem ( title ) {
    return ( dispatch, getState ) => {
        const existTodoItem = getState().todoList.todos.find( todo => todo.title.toLowerCase().trim() === title.toLowerCase().trim());
        
        if ( existTodoItem ) {
            dispatch( {
                type: GET_TODO_ITEM,
                payload: existTodoItem
            } );
        } else {
             dispatch( {
                type: GET_TODO_ITEM,
                payload: null
            } );
        }
    }
};

function resetAddUpdateTodo () {
    return{type:RESET_OPERATION}
}

function changeToDoStatus ( title,status ) {
    return ( dispatch, getState ) => {
        if ( status.toLowerCase().trim() === 'done' ) {
            dispatch( {
                type: SET_TODO_DONE,
                payload:title
            })
        }else if ( status.toLowerCase().trim() === 'inprogress' ) {
            dispatch( {
                type: SET_TODO_IN_PROGRESS,
                payload:title
            })
        }

        localStorage.setItem( 'todoListItems', JSON.stringify( getState().todoList.todos ) );
    }
}

function sortTodoList ( sortField ) {
    return ( dispatch,getState )=> {
        dispatch( {
            type: SORT_LIST,
            payload:sortField
        } )

        localStorage.setItem( 'todoListItems', JSON.stringify( getState().todoList.todos ) );
    }
}

function sortTodoListByPriority (  ) {
    return ( dispatch,getState )=> {
        dispatch( {
            type: SORT_BY_PRIORITY,
        } )

        localStorage.setItem( 'todoListItems', JSON.stringify( getState().todoList.todos ) );
    }
}

export { addTodoItem, removeToDoItem, getTodoItem, resetAddUpdateTodo,changeToDoStatus,editTodoItem,sortTodoList,sortTodoListByPriority };