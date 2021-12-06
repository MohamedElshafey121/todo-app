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


function comapreObjs( field ) {

    if ( field === 'startDate' ) {
        return function compare( obj1, obj2 ) {
             return new Date(obj2.startDate) - new Date(obj1.startDate);
        }
    }

    return function compare( obj1, obj2 ) {
        if ( obj1[ field ] < obj2[ field ] ) {
            return -1;
        }
        if ( obj1[ field ] > obj2[ field ] ) {
            return 1;
        }
        return 0;
    }

};

function comparePriority( obj1, obj2 ) {
    if ( obj1.priority === 'high' ) {
        return -1;
    } else {
        if ( obj1.priority === 'low' && obj2.priority === 'medium' ) {
            return 1;
        } else if ( obj2.priority === 'low' && obj1.priority === 'medium' ) {
            return -1;
        }

        return 0;
    }

};

function todoReducer( state = {
    todos: []
}, action ) {
    switch ( action.type ) {
        case ADD_TODO_ITEM:
            const item = action.payload;


            const existTodoItem = state.todos.find( todo => todo.title.toLowerCase() === item.title.toLowerCase() );
            if ( existTodoItem ) {
                alert( 'Item already exist' )
                return state;
            }

            return {
                ...state,
                todos: [ ...state.todos, item ],
                    success: true
            }

            case REMOVE_TODO_ITEM:
                return {
                    ...state,
                    todos: state.todos.filter(
                        ( el ) => el.title !== action.payload
                    )
                }
                case RESET_OPERATION:
                    return {
                        ...state,
                        success: false
                    }

                    case SET_TODO_DONE:
                        const title = action.payload;
                        return {
                            ...state,
                            todos: state.todos.map(
                                ( el ) => {
                                    if ( el.title.toLowerCase().trim() === title.toLowerCase().trim() ) {
                                        return {
                                            ...el,
                                            status: 'done'
                                        };
                                    }
                                    return el;
                                }
                            )
                        }

                        case EDIT_TODO_ITEM:
                            const todo = action.payload;
                            const oldTitle = action.oldTitle;
                            return {
                                ...state,
                                todos: state.todos.map( el => (
                                        el.title.toLowerCase().trim() === oldTitle.toLowerCase().trim() ? todo : el
                                    ) ),
                                    success: true
                            }

                            case SORT_LIST:
                                const sortField = action.payload;
                                return {
                                    ...state,
                                    todos: state.todos.sort( comapreObjs( sortField ) )
                                }

                                case SORT_BY_PRIORITY:
                                    return {
                                        ...state,
                                        todos: state.todos.sort( comparePriority )
                                    }


                                    default:
                                        return state
    }
}

function getOneTodoReducer( state = {
    todo: null
}, action ) {
    if ( GET_TODO_ITEM ) {
        return {
            todo: action.payload
        }
    }
    return state;
}
// function oneToDo ( state = {}, action ) {
//     return(state,getStat)
// }

export {
    todoReducer,
    getOneTodoReducer
};