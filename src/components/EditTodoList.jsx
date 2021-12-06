import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DatePicker from "react-datepicker";
import { getTodoItem, editTodoItem } from '../store/todos'
import { Link } from 'react-router-dom'
import users from '../data/users';



function EditTodoList ( { match, history } ) {
    const { title: searchTitle } = match.params;
    const todoDetails = useSelector( state => state.todoDetails );
    const { todo } = todoDetails;

    const todoList = useSelector( state => state.todoList )
    const { success } = todoList;

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [deadLine, setDeadLine] = useState( new Date() )
    const [startDate, setStartDate] = useState( new Date() );
    const [priority, setPriorioty] = useState()
    const [status, setStatus] = useState();
    const [user, setUser] = useState()


    useEffect( () => {
        if ( success ) {
            history.push( '/' )
        }
    }, [success] )

    useEffect( () => {
        if ( !todo ) {
            history.push( '/' )
        } else {
            setTitle( todo.title )
            setDescription( todo.description )
            setDeadLine( todo.deadLine && new Date( todo.deadLine ) )
            setStartDate( todo.startDate && new Date( todo.startDate ) )
            setPriorioty( todo.priority )
            setStatus( todo.status )
            setUser( Number( todo.user ) )
        }
    }, [] )

    const dispatch = useDispatch();
    useEffect( () => {
        if ( searchTitle ) {
            dispatch( getTodoItem( searchTitle ) )
        }
    }, [] )

    const submithandler = ( e ) => {
        e.preventDefault();
        dispatch( editTodoItem( searchTitle, {
            title,
            description,
            deadLine,
            startDate,
            priority,
            status,
            user
        } ) )
    }

    return (
        <React.Fragment>
            {todo && (
                <div className='container'>
                    <div className='row d-flex justify-content-center container'>
                        <div className='col-md-10'>
                            <div className='card-hover-shadow-2x mb-3 card'>
                                <div className='card-header-tab card-header'>
                                    <div className='col-md-4'>
                                        <div className='card-header-title font-size-lg text-capitalize font-weight-normal'>
                                            <h5>Edit Task</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className='form-area container' style={{ marginTop: '20px' }}>
                                    <div className='row'>
                                        <div className=' col-sm-12'>
                                            <div className='form-group'>
                                                <label htmlFor='title'>Title</label>
                                                <input type='text' className='form-control' id='title'
                                                    defaultValue={todo.title && todo.title}
                                                    onChange={e => setTitle( e.target.value )}
                                                    value={title}
                                                />
                                            </div>
                                        </div>

                                        <div className=' col-sm-12'>
                                            <div className='form-group'>
                                                <label htmlFor='description'>description</label>
                                                <textarea type='text' className='form-control' id='description' rows='4'
                                                    defaultValue={todo.description && todo.description}
                                                    value={description}
                                                    onChange={e => setDescription( e.target.value )}

                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className=' col-sm-6'>
                                            <div className='form-group'>
                                                <label htmlFor='start_date'>Start Date</label>
                                                <DatePicker className='form-control' id='start_date'
                                                    selected={startDate}
                                                    onChange={date => setStartDate( date )}
                                                />
                                            </div>
                                        </div>

                                        <div className=' col-sm-6'>
                                            <div className='form-group'>
                                                <label htmlFor='dead_line'>Dead Line</label>
                                                <DatePicker className='form-control' id='dead_line'
                                                    selected={deadLine}
                                                    onChange={date => setDeadLine( date )}
                                                />
                                            </div>
                                        </div>

                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label htmlFor='priority'>Priority</label>
                                                <select class="custom-select" id='priority'
                                                    defaultValue={todo.priority && todo.priority}
                                                    value={priority}
                                                    onChange={e => setPriorioty( e.target.value )}
                                                >
                                                    <option selected disabled>Select Status</option>
                                                    <option value="high">High</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="low">Low</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label htmlFor='priority'>Status</label>
                                                <select class="custom-select" id='priority'
                                                    defaultValue={todo.status && todo.status}
                                                    value={status}
                                                    onChange={e => setStatus( e.target.value )}
                                                    disabled={todo.status === 'done'}
                                                >
                                                    <option selected>Select Status</option>
                                                    <option value="todo">ToDo</option>
                                                    <option value="inprogress">In Progress</option>
                                                    <option value="done">Done</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className='col-md-12'>
                                            <div className='form-group'>
                                                <label htmlFor='priority'>User</label>
                                                <select class="custom-select" id='priority' onChange={e => setUser( e.target.value )} value={user}>
                                                    <option selected disabled>select User</option>
                                                    {users.map( ( user, userIdx ) => (
                                                        <option key={userIdx} value={user.id}>{user.name}</option>
                                                    ) )}

                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className='d-block text-right card-footer'>
                                    <Link to='/' className='mr-2 btn btn-link btn-sm'>Cancel</Link>
                                    <button className='btn btn-primary' onClick={submithandler}>update</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>

    )
}

export default EditTodoList
