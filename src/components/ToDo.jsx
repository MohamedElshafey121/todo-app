import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { changeToDoStatus } from '../store/todos'
import { useDispatch } from 'react-redux'
import userData from '../utils/user'


function ToDo ( { todo, removeTodo, todoIdx } ) {
    const dispatch = useDispatch();
    const cahngeStatusHandler = ( title, status ) => {
        dispatch( changeToDoStatus( title, status ) )
    }


    const priorityStyle = ( priority ) => (
        {
            'high': 'badge-success',
            'medium': 'badge-primary',
            'low': 'badge-warning',
        }[priority]
    );

    const priorityStyleDiv = ( priority ) => (
        {
            'high': 'bg-success',
            'medium': 'bg-primary',
            'low': 'bg-warning',
        }[priority]
    );

    return (
        <li className='list-group-item'>
            <div className={`todo-indicator ${ priorityStyleDiv( todo.priority ) }`}></div>
            <div className='widget-content p-0'>
                <div className='widget-content-wrapper'>
                    <div className='widget-content-left mr-2'>
                        <div className='custom-checkbox custom-control'>
                            <input
                                title='Mark as done'
                                className='custom-control-input'
                                id={`exampleCustomCheckbox${ todoIdx }`}
                                type='checkbox'
                                onClick={() => cahngeStatusHandler( todo.title, 'done' )}
                                disabled={todo.status === 'done' && true}
                                checked={todo.status === 'done' && true}
                            />
                            <label
                                title='Mark as done'
                                className='custom-control-label'
                                htmlFor={`exampleCustomCheckbox${ todoIdx }`}
                            >
                                &nbsp;
                            </label>
                        </div>
                    </div>
                    <div className='widget-content-left'>
                        <div className='widget-heading'>
                            {todo.title}
                            {todo.status === 'inprogress' && ( <div className="badge ml-2 badge-secondary">
                                {todo.status}
                            </div> )}
                        </div>
                        <div className='widget-subheading'>
                            {todo.user && ( <i>By {userData( todo.user )}</i> )}
                            <i>
                                {todo.priority && ( <div className={`badge ml-2 ${ priorityStyle( todo.priority ) }`}>
                                    {todo.priority} periority
                                </div> )}
                            </i>
                        </div>
                    </div>
                    <div className='widget-content-right'>

                        <Link to={`/task/${ todo.title }`}
                            title='Edit'
                            className={`border-0 btn-transition btn btn-outline-success `}>

                            <i className='fa fa-edit'></i>
                        </Link>
                        <button className='border-0 btn-transition btn btn-outline-danger' onClick={() => removeTodo( todo.title )}>

                            <i className='fa fa-trash'></i>
                        </button>
                    </div>
                </div>
            </div>
        </li>

    )
}
export default ToDo
